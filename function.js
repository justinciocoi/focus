let countdown;

function startTimer() {
    const focusField = document.getElementById("focusTime");
    const restField = document.getElementById("restTime");


    let isFocusPhase = true;  // Track if it's the focus or rest period
    const focusTime = focusField.value * 60; // Convert minutes to seconds
    const restTime = restField.value * 60;   // Convert minutes to seconds
    let currentTime = focusTime;  // Start with the focus time

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
        countdownCircle.style.background = `conic-gradient(rgb(126, 103, 136) ${percentage}deg, #ddd ${percentage}deg)`;

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
    }, 1000); // Update every second
}

let isPlaying = false;

audio.addEventListener('ended', () => {
    audio.currentTime = 0; // Reset to the beginning
    audio.play();           // Start playing again
});

function playAudio() {
    const audio = document.getElementById('audio');
    audio.play();
}

function pauseAudio() {
    const audio = document.getElementById('audio');
    audio.pause();
}

function stopAudio() {
    const audio = document.getElementById('audio');
    audio.pause();
    audio.currentTime = 0;
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
        const fallDuration = Math.random() * 2 + 2; // Initial speed (between 2s and 4s)
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

