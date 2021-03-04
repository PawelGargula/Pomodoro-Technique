class Timer {
    constructor(timerValue, startStopButton, resetButton) {
        this.timerValue = timerValue;
        this.startStopButton = startStopButton;
        this.resetButton = resetButton;
    }

    startStopTimer() {
        ;
    }

    resetTimer() {
        ; 
    }
}

//25 minutes in miliseconds
const timerValue = 25*60*1000;

const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');

const timer = new Timer(timerValue, startStopButton, resetButton);

startStopButton.addEventListener('click', () => timer.startStop());
resetButton.addEventListener('click', () => timer.reset());