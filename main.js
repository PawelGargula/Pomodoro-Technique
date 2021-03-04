class Timer {
    constructor(initialValue, startStopButton, resetButton) {
        this.initialValue = initialValue;
        this.startStopButton = startStopButton;
        this.resetButton = resetButton;
        this.presentValue = initialValue;
        this.counter = 0;
    }

    startStop() {
        if (this.startButtonVisible) {
            this.start();
        }
        else {
            this.stop();
        }
    }

    get startButtonVisible() {
        this.startStopButton.classList.contains("start")
    }

    start() {
        this.startButtonVisible = false;
        replaceClass(this.startStopButton, 'start', 'stop');

    }

    stop() {
        this.startButtonVisible = true;
        replaceClass(this.startStopButton, 'stop', 'start');
    }

    reset() {
        this.presentValue = this.initialValue; 
    }
}

//25 minutes in miliseconds
const timerInitialValue = 25*60*1000;

const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');

const timer = new Timer(timerInitialValue, startStopButton, resetButton);

startStopButton.addEventListener('click', () => timer.startStop());
resetButton.addEventListener('click', () => timer.reset());

function replaceClass(element, fromClass, toClass) {
    element.classList.remove(fromClass);
    element.classList.add(toClass);
}