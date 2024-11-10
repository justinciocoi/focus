let countdown;
let isTimer = false;
let isFocusPhase = true; // Track if it's the focus or rest period
let isTimerPaused = false;
let currentTime; // Store remaining time when paused
let duration; // Fixed duration for each phase

function pauseTimer() {
    const image = document.getElementById('playPauseImage');
    if (isTimer && !isTimerPaused) {
        // Pause the timer
        isTimerPaused = true;
        clearInterval(countdown); // Stop the countdown
        image.src = 'images/play.png';
        image.style.transform = 'translateY(2px) translateX(5px)';
    } else if (isTimer && isTimerPaused) {
        // Resume the timer
        isTimerPaused = false;
        startCountdown(); // Start the countdown again with remaining time
        image.src = 'images/pause.png';
        image.style.transform = 'translateY(3px)';
    }
}

function startTimer() {
    const focusField = document.getElementById("focusTime");
    const restField = document.getElementById("restTime");
    document.getElementById('playPauseButton').style.display = 'inline';

    if (!isTimer) {
        isFocusPhase = true; // Start with focus phase
        const focusTime = focusField.value * 60; // Convert minutes to seconds
        const restTime = restField.value * 60; // Convert minutes to seconds

        if (Number.isInteger(focusTime) && Number.isInteger(restTime) && focusTime > 0 && restTime > 0) {
            currentTime = focusTime; // Set initial time to focus time
            duration = focusTime; // Set duration based on phase (fixed until next phase change)
            document.getElementById('timerButton').innerText = "Stop Timer";
            isTimer = true;
            isTimerPaused = false; // Reset pause state
            startCountdown();
        }
    } else {
        // Stop the timer
        clearInterval(countdown);
        document.getElementById('timerButton').innerText = "Start Timer";
        document.getElementById('timer').innerText = "00:00";
        document.getElementById('playPauseButton').style.display = 'none';
        
        document.getElementById('circle2').style.display = 'none';

        const image = document.getElementById('playPauseImage');
        image.src = 'images/pause.png';
        image.style.transform = 'translateY(3px)';

        isTimer = false;
        isTimerPaused = false;
    }
}

function startCountdown() {
    const countdownCircle = document.getElementById('circle2');
    const focusField = document.getElementById("focusTime");
    const restField = document.getElementById("restTime");
    const focusTime = focusField.value * 60;
    const restTime = restField.value * 60;

    countdown = setInterval(() => {
        if (!isTimerPaused) {
            let minutes = Math.floor(currentTime / 60);
            let seconds = currentTime % 60;
            const percentage = (currentTime / duration) * 360; // Calculate based on initial duration, not reset

            countdownCircle.style.display = `block`;
            countdownCircle.style.background = isFocusPhase
                ? `conic-gradient(rgb(156, 180, 255) ${percentage}deg, #ddd ${percentage}deg)`
                : `conic-gradient(rgb(124, 196, 184) ${percentage}deg, #ddd ${percentage}deg)`;

            // Format with leading zero
            document.getElementById("timer").innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            // Check if phase has ended
            if (currentTime <= 0) {
                isFocusPhase = !isFocusPhase;
                currentTime = isFocusPhase ? focusTime : restTime;
                if(isFocusPhase){
                    playFocusSound();
                }
                else{
                    playRestSound();
                }
                duration = currentTime; // Update duration only at phase switch

                if (isFocusPhase) {
                    playFocusSound();
                    document.getElementById("timer").innerText = "Time for focus";
                    document.getElementById('circle2').style.display = 'none';
                } else {
                    playRestSound();
                    document.getElementById("timer").innerText = "Time to rest";
                    document.getElementById('circle2').style.display = 'none';
                }

                setTimeout(() => {
                    document.getElementById("timer").innerText = formatTime(currentTime);
                }, 1000);
            } else {
                currentTime--; // Decrement time only if not paused
            }
            updateTabTitle();
            updateLocalStorageTimer(currentTime);
            updateCircle(percentage);
        }
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function updateTabTitle() {
    const timeLeft = document.getElementById('timer').innerText;
    tabTitle.innerText = isFocusPhase ? `${timeLeft} - \u{26A1} Focus` : `${timeLeft} - \u{231B} Rest`;
}

function playFocusSound() {
    const audio = document.getElementById('focusSound');
    audio.play();
}

function playRestSound() {
    const audio = document.getElementById('restSound');
    audio.play();
}

function updateLocalStorageTimer(currentTime) {
    localStorage.setItem("sharedTimer", currentTime);
}

function updateCircle(percentage) {
    localStorage.setItem("sharedCirclePercentage", percentage);
}
