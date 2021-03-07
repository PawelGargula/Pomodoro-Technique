class Timer {
    constructor(minutes, seconds, startStopButton, resetButton, counterElement, message) {
        this.minutesElement = minutesElement;
        this.secondsElement = secondsElement;
        this.startStopButton = startStopButton;
        this.resetButton = resetButton;
        this.counterElement = counterElement;
        this.message = message;
        this.counter = 1;
        this.clockUpdater;
        this.presentTime;
        this.endTime;
        this.distanceToEnd;
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
        this.presentTime = new Date().getTime();
        this.endTime = this.presentTime + toMiliseconds(parseInt(this.minutesElement.innerText), parseInt(this.secondsElement.innerText));
        this.clockUpdater = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        this.presentTime = new Date().getTime();
        this.distanceToEnd = this.endTime - this.presentTime;
        this.minutesElement.innerHTML = toMinutes(this.distanceToEnd);
        this.secondsElement.innerHTML = toSeconds(this.distanceToEnd);
        
        if (this.distanceToEnd < 0) {
            this.counter++;
            this.playAlarm();
            this.reset();
            this.showMessage();
            this.counterElement.innerHTML = "Counter: " + this.counter;
        }
    }

    playAlarm() {
        let audio = new Audio('sound/alarm.flac'); //sound from https://freesound.org/s/22627/
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
        this.minutesElement.innerHTML = "25";
        this.secondsElement.innerHTML = "00";
    }
}

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const counterElement = document.getElementById('counter');
const message = document.getElementById('message');

const timer = new Timer(minutesElement, secondsElement, startStopButton, resetButton, counterElement, message);

startStopButton.addEventListener('click', () => timer.startStop());
resetButton.addEventListener('click', () => timer.reset());

function toMiliseconds(minutes, seconds) {
    let miliseconds = (minutes*60 + seconds)*1000;
    return miliseconds;
}

function toMinutes(miliseconds) {
    let minutes = Math.floor((miliseconds % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return minutes;
}

function toSeconds(miliseconds) {
    let seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return seconds;
}

function replaceClass(element, fromClass, toClass) {
    element.classList.remove(fromClass);
    element.classList.add(toClass);
}