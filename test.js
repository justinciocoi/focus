let countdown;
let isTimer;

let isFocusPhase;
let isPaused;

//what functions does the timer need to actually work?

//it needs to get user inputs
function getFocusTime() {
    const focusField = document.getElementById('focusTime').value;

    return focusField;
}

function getRestTime() {
    const restField = document.getElementById('restTime').value;

    return restField;
}

//it needs to decrement the timer
    //if timer reaches 0, switch phase and restart timer

function decrementTimer(currentTime) {
    currentTime--;
}

function updateDisplayedTime(currentTime) {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;

    document.getElementById('timer').innerText = `${minutes}:${seconds}`;
} 

//it needs to initialize
function initializeTimer() {
    focusInput = getFocusTime();
    restInput = getRestTime();

    isFocusPhase = true;
    
}

/* the play timer function will thus have the following properties:
    - it will initialize the timer
    - then it will start a setInterval loop to execute the following functions each second */