class Timer {
    constructor(initialValue, clock, startStopButton, resetButton, counterElement) {
        this.initialValue = initialValue;
        this.clock = clock;
        this.startStopButton = startStopButton;
        this.resetButton = resetButton;
        this.counterElement = counterElement;
        this.presentValue = initialValue;
        this.counter = 0;
        this.clockUpdater;
    }
    
    startStop() {
        if (this.startStopButton.classList.contains("start")) {
            this.start();
        }
        else {
            this.stop();
        }
    }

    start() {
        replaceClass(this.startStopButton, 'start', 'stop');
        this.startStopButton.innerHTML = "Stop";
        this.clockUpdater = setInterval(() => this.updateClock(), 1000);
    }

    updateClock() {
        this.presentValue = this.presentValue - 1000;
        this.clock.innerHTML = convertMiliseconds(this.presentValue);
            
        if (this.presentValue < 1) {
            this.stop();
            this.counter++;
            this.counterElement.innerHTML = "Counter: " + this.counter;
            this.presentValue = this.initialValue;
        }
    }

    stop() {
        clearInterval(this.clockUpdater);
        replaceClass(this.startStopButton, 'stop', 'start');
        this.startStopButton.innerHTML = "Start";
    }

    reset() {
        this.stop();
        this.presentValue = this.initialValue;
        this.clock.innerHTML = convertMiliseconds(this.initialValue);
    }
}

//25 minutes in miliseconds
const timerInitialValue = 25*60*1000;

const clock = document.getElementById('clock');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const counterElement = document.getElementById('counter');

const timer = new Timer(timerInitialValue, clock, startStopButton, resetButton, counterElement);

startStopButton.addEventListener('click', () => timer.startStop());
resetButton.addEventListener('click', () => timer.reset());

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