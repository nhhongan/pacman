let selectedLevel = 'easy';

// Script to handle navigation and level selection
document.getElementById('playButton').addEventListener('click', function () {
    const selectedRadio = document.querySelector('input[name="level"]:checked');
    if (selectedRadio) {
        selectedLevel = selectedRadio.value;
    } else {
        selectedLevel = 'easy'; // Default level
    }
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
    // Initialize game with selected level
    console.log('Starting game with level:', selectedLevel);
    // Add game initialization code here
});

document.querySelectorAll('input[name="level"]').forEach(radio => {
    radio.addEventListener('change', function () {
        selectedLevel = this.value;
    });
});

document.getElementById('exitButton').addEventListener('click', function () {
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('landingPage').style.display = 'block';
});