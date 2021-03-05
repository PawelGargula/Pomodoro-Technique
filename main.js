class Timer {
    constructor(initialValue, clock, startStopButton, resetButton, counterElement, message) {
        this.initialValue = initialValue;
        this.clock = clock;
        this.startStopButton = startStopButton;
        this.resetButton = resetButton;
        this.counterElement = counterElement;
        this.message = message;
        this.presentValue = initialValue;
        this.counter = 1;
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
        this.message.innerHTML = "Message";
        replaceClass(this.startStopButton, 'start', 'stop');
        this.startStopButton.innerHTML = "Stop";
        this.clockUpdater = setInterval(() => this.updateClock(), 1000);
        this.counterElement.innerHTML = "Counter: " + this.counter;
    }

    updateClock() {
        this.presentValue = this.presentValue - 1000;
        this.clock.innerHTML = convert(this.presentValue);
            
        if (this.presentValue === 0) {
            this.presentValue = this.initialValue;
            this.playAlarm();
            this.stop();
            this.counter++;
            this.showMessage();
        }
    }

    playAlarm() {
        let audio = new Audio('sound/alarm.flac'); /* sound from https://freesound.org/s/22627/ */
        audio.play();
        let times = 1;
        let x = setInterval(() => {
            audio.play();
            times++;
            if (times === 3) {
                clearInterval(x);
            }
        }, 1500);
    }

    stop() {
        clearInterval(this.clockUpdater);
        replaceClass(this.startStopButton, 'stop', 'start');
        this.startStopButton.innerHTML = "Start";
    }

    showMessage() {
        if (this.counter > 4) {
            this.message.innerHTML = "Time for long break (15-30min)";
            this.counter = 1;
        }
        else {
            this.message.innerHTML = "Time for short break (3-5min)";
        }
    }

    reset() {
        this.stop();
        this.presentValue = this.initialValue;
        this.clock.innerHTML = convert(this.initialValue);
    }
}

//25 minutes in miliseconds
const timerInitialValue = 25*60*1000;

const clock = document.getElementById('clock');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const counterElement = document.getElementById('counter');
const message = document.getElementById('message');

const timer = new Timer(timerInitialValue, clock, startStopButton, resetButton, counterElement, message);

startStopButton.addEventListener('click', () => timer.startStop());
resetButton.addEventListener('click', () => timer.reset());

function convert(miliseconds) {
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