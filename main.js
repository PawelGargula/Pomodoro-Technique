class Timer {
    constructor(initialValue, clock, startStopButton, resetButton) {
        this.initialValue = initialValue;
        this.clock = clock;
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
        return this.startStopButton.classList.contains("start");
    }

    start() {
        replaceClass(this.startStopButton, 'start', 'stop');
        this.startStopButton.innerHTML = "Stop";
    }

    stop() {
        replaceClass(this.startStopButton, 'stop', 'start');
        this.startStopButton.innerHTML = "Start";
    }

    reset() {
        replaceClass(this.startStopButton, 'stop', 'start');
        this.startStopButton.innerHTML = "Start";
        this.clock.innerHTML = convertMiliseconds(this.initialValue);
    }
}

//25 minutes in miliseconds
const timerInitialValue = 25*60*1000;

const clock = document.getElementById('clock');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');

const timer = new Timer(timerInitialValue, clock, startStopButton, resetButton);

startStopButton.addEventListener('click', () => timer.startStop());
resetButton.addEventListener('click', () => timer.reset());

console.log(convertMiliseconds(timerInitialValue));

function convertMiliseconds(miliseconds) {
    let minutes = Math.floor((miliseconds % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

function replaceClass(element, fromClass, toClass) {
    element.classList.remove(fromClass);
    element.classList.add(toClass);
}