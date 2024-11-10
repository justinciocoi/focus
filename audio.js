//VOLUME CONTROL

let isMute = false;
let originalVolume = 1; // Default volume if none is set
let isPlaying = false;


function mute() {
    const audio = document.getElementById('audio');
    if (!isMute) {
        originalVolume = audio.volume; // Save the current volume
        setVolume(0); // Set the volume to 0 to mute
        document.getElementById('volumeControl').value = 0; // Update slider to 0
        document.getElementById('muteImage').src = 'images/unmute.png'; // Update mute icon
    } else {
        setVolume(originalVolume); // Restore the previous volume
     document.getElementById('volumeControl').value = originalVolume; // Update slider to previous volume
        document.getElementById('muteImage').src = 'images/mute.png'; // Update mute icon
    }
    isMute = !isMute; // Toggle mute state
}

function setVolume(volume) {
    const audio = document.getElementById('audio');
    audio.volume = volume;
}

document.getElementById('volumeControl').addEventListener('input', (event) => {
    const newVolume = event.target.value; // Get volume as a fraction
    setVolume(newVolume); // Set the new volume

    if (newVolume > 0 && isMute) {
        // Unmute if slider moved and was previously muted
        isMute = false;
        document.getElementById('muteImage').src = 'images/mute.png'; // Update mute icon
    }
});


// STARTING STOPPING AND CHANGING AUDIO


function changeAudioSource() {
    const audio = document.getElementById("audio");
    const audioSelect = document.getElementById("audioSelect");

    // Update the audio src based on selected value
    audio.src = audioSelect.value;

    audio.play()
}

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

audio.addEventListener('ended', () => {
    audio.currentTime = 0; // Reset to the beginning
    audio.play();           // Start playing again
});


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