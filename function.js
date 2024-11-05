let countdown;
let isTimer = false;

function startTimer() {
    const focusField = document.getElementById("focusTime");
    const restField = document.getElementById("restTime");

    

    if(!isTimer){
        let isFocusPhase = true;  // Track if it's the focus or rest period
        const focusTime = focusField.value * 60; // Convert minutes to seconds
        const restTime = restField.value * 60;   // Convert minutes to seconds
        let currentTime = focusTime;  // Start with the focus time

        document.getElementById('timerButton').innerText = "Stop Timer";
        // Clear any previous intervals
        clearInterval(countdown);

        const countdownCircle=document.getElementById('circle2')
        const duration = currentTime;

        // Set up the interval to update every second
        countdown = setInterval(() => {
            // Calculate minutes and seconds
            let minutes = Math.floor(currentTime / 60);
            let seconds = currentTime % 60;

            const percentage = (currentTime / duration) * 360;
            countdownCircle.style.background = `conic-gradient(rgb(156, 180, 255) ${percentage}deg, #ddd ${percentage}deg)`;

            // Format with leading zero if necessary
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            // Display the current timer
            document.getElementById("timer").innerText = `${minutes}:${seconds}`;


            // Check if the current phase time has ended
            if (currentTime <= 0) {
                // Switch phases: focus to rest or rest to focus
                isFocusPhase = !isFocusPhase;

                // Reset the timer for the next phase
                currentTime = isFocusPhase ? focusTime : restTime;

                // Display "OVER" message briefly before switching
                if(isFocusPhase) {
                    document.getElementById("timer").innerText = "Time for rest";
                }
                else{
                    document.getElementById("timer").innerText = "Time to focus";

                }
                setTimeout(() => {
                    document.getElementById("timer").innerText = `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`;
                }, 1000); // Brief 1-second pause to show "OVER" message
            } else {
                // Decrement time remaining in the current phase
                currentTime--;
                
            }
            updateLocalStorageTimer(currentTime);
            updateCircle(percentage);
        }, 1000); // Update every second
    }
    else{
        clearInterval(countdown);
        document.getElementById('timerButton').innerText = "Start Timer";
        document.getElementById('timer').innerText = "00:00";
    }
    isTimer = !isTimer;
    
}

let isPlaying = false;

audio.addEventListener('ended', () => {
    audio.currentTime = 0; // Reset to the beginning
    audio.play();           // Start playing again
});

function playAudio() {
    const audio = document.getElementById('audio');
    if(!isPlaying){
        audio.play();
        
    }
    else{
        audio.pause();
        
    }
    isPlaying = !isPlaying
}

function stopAudio() {
    const audio = document.getElementById('audio');
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    const pauseButton = document.getElementById('pauseButton');
    pauseButton.id = 'triangle-button'
}

function setVolume(volume) {
    audio.volume = volume;
}

function createRaindrops() {
    const rainContainer = document.querySelector('.rain-container');
    const raindropCount = 100; // Number of raindrops to generate

    for (let i = 0; i < raindropCount; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        
        // Set random horizontal position
        raindrop.style.left = `${Math.random() * 100}vw`;

        // Set initial fall duration and delay
        const fallDuration = Math.random() * 0.5 + 1.5; // Initial speed (between 2s and 4s)
        const fallDelay = Math.random() * -4; // Random delay for staggered effect
        raindrop.style.animationDuration = `${fallDuration}s`;
        raindrop.style.animationDelay = `${fallDelay}s`;

        // Add raindrop to the container
        rainContainer.appendChild(raindrop);
    }
}

// Call function to create raindrops initially
createRaindrops();

function changeAudioSource() {
    const audio = document.getElementById("audio");
    const audioSelect = document.getElementById("audioSelect");

    // Update the audio src based on selected value
    audio.src = audioSelect.value;

    audio.play()
}

function openPopup() {
    const popupUrl = "popup.html"; // URL of the page or part you want to display in the pop-up
    const popupWidth = 400; // Width of the pop-up window
    const popupHeight = 300; // Height of the pop-up window

    // Calculate the position of the window (optional)
    const left = (screen.width / 2) - (popupWidth / 2);
    const top = (screen.height / 2) - (popupHeight / 2);

    // Open the new window with specified features
    window.open(
        popupUrl,
        "popupWindow",
        `width=${popupWidth},height=${popupHeight},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=no,resizable=no,status=no`
    );
}

// Assuming `currentTime` is the current timer value in seconds, and `index.html` controls the timer.

// This function is called in index.html's timer to update the localStorage value
function updateLocalStorageTimer(currentTime) {
    localStorage.setItem("sharedTimer", currentTime);
}

// This function is called in popup.html to fetch the timer from localStorage
function syncTimerFromLocalStorage() {
    const sharedTimer = localStorage.getItem("sharedTimer");

    if (sharedTimer !== null) {
        document.getElementById("timer").innerText = formatTime(sharedTimer);
    }
}

// Helper function to format time in MM:SS format
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function updateCircle(percentage) {
    localStorage.setItem("sharedCirclePercentage", percentage);
}

function syncCircle() {
    const percentage = localStorage.getItem("sharedCirclePercentage");

    if(percentage !== null) {
        const countdownCircle=document.getElementById('circle2')
        countdownCircle.style.background = `conic-gradient(rgb(156, 180, 255) ${percentage}deg, #ddd ${percentage}deg)`;

    }
}

let isMute = false;
let originalVolume;
function mute(volume) {
    if(!isMute){
        originalVolume = volume;
        setVolume(0);
        document.getElementById('volumeControl').value = 0;
        document.getElementById('muteImage').src = 'images/unmute.png';
    }
    else{
        setVolume(originalVolume);
        document.getElementById('volumeControl').value = originalVolume;
        document.getElementById('muteImage').src = 'images/mute.png';
    }
    isMute = !isMute
}