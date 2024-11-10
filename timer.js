let countdown;
let isTimer = false;
let isFocusPhase = true;  // Track if it's the focus or rest period

let isTimerPaused = false;


function pauseTimer() {
    image = document.getElementById('playPauseImage');
    if(isTimer && !isTimerPaused){
        isTimerPaused = true;
        //turn pause button to play button
        image.src = 'images/play.png';
        image.style.transform = 'translateY(2px) translateX(5px)'
    }
    else {
        isTimerPaused = false;
        image.src = 'images/pause.png';
        image.style.transform = 'translateY(3px)';
    }
}

function startTimer() {
    const focusField = document.getElementById("focusTime");
    const restField = document.getElementById("restTime");

    document.getElementById('playPauseButton').style.display= 'inline';
    

    if(!isTimer){
        isFocusPhase = true;  // Track if it's the focus or rest period
        const focusTime = focusField.value * 60; // Convert minutes to seconds
        const restTime = restField.value * 60;   // Convert minutes to seconds
        const focusInt = parseFloat(focusTime);
        const restInt = parseFloat(restTime);
        let currentTime = focusTime;  // Start with the focus time

        document.getElementById('timerButton').innerText = "Stop Timer";
        // Clear any previous intervals
        clearInterval(countdown);

        const countdownCircle=document.getElementById('circle2')
        const duration = currentTime;

        if(restInt && focusInt && Number.isInteger(restInt) && Number.isInteger(focusInt)){
            // Set up the interval to update every second
        countdown = setInterval(() => {
            // Calculate minutes and seconds
            let minutes = Math.floor(currentTime / 60);
            let seconds = currentTime % 60;

            const percentage = (currentTime / duration) * 360;
            countdownCircle.style.display = `block`;
            if(isFocusPhase)
                countdownCircle.style.background = `conic-gradient(rgb(156, 180, 255) ${percentage}deg, #ddd ${percentage}deg)`;
            else
                countdownCircle.style.background = `conic-gradient(rgb(124, 196, 184) ${percentage}deg, #ddd ${percentage}deg)`;

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
                    playFocusSound();
                    document.getElementById("timer").innerText = "Time for focus";
                    countdownCircle.style.display = `none`;

                }
                else{
                    playRestSound();
                    document.getElementById("timer").innerText = "Time to rest";
                    countdownCircle.style.display = `none`;

                }
                setTimeout(() => {
                    document.getElementById("timer").innerText = `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`;
                }, 1000); // Brief 1-second pause to show "OVER" message
            } else {
                // Decrement time remaining in the current phase
                currentTime--;
                if(isTimerPaused) {
                    cachedTime = currentTime;
                    clearInterval(countdown);
                }
                updateTabTitle();
            }
            updateLocalStorageTimer(currentTime);
            updateCircle(percentage);
        }, 1000); // Update every second
        }
    }
    else{
        //stop and clear
        clearInterval(countdown);
        document.getElementById('timerButton').innerText = "Start Timer";
        document.getElementById('timer').innerText = "00:00";
    }
    isTimer = !isTimer;
    
}


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function openPopup() {
    const popupUrl = "popup.html"; // URL of the page or part you want to display in the pop-up
    const popupWidth = 400; // Width of the pop-up window
    const popupHeight = 350; // Height of the pop-up window

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

function updateLocalStorageTimer(currentTime) {
    localStorage.setItem("sharedTimer", currentTime);
}

function syncTimerFromLocalStorage() {
    const sharedTimer = localStorage.getItem("sharedTimer");

    if (sharedTimer !== null) {
        document.getElementById("timer").innerText = formatTime(sharedTimer);
    }
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



tabTitle = document.getElementById('tabTitle');

function updateTabTitle() {
    timeLeft = document.getElementById('timer').innerText;
    if(isFocusPhase)
        tabTitle.innerText = `${timeLeft} - \u{26A1} Focus`;
    else
        tabTitle.innerText = `${timeLeft} - \u{231B} Rest`;

}

function playFocusSound() {
    audio = document.getElementById('focusSound');
    audio.play();
}

function playRestSound() {
    audio = document.getElementById('restSound');
    audio.play();
}


