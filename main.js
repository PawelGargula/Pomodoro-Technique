class Timer {
    constructor(minutesInitialValue, secondsInitialValue, minutesElement, secondsElement, startStopButton, resetButton, counterElement, messageElement) {
        this.minutesInitialValue = minutesInitialValue;
        this.secondsInitialValue = secondsInitialValue;
        this.minutesElement = minutesElement;
        this.secondsElement = secondsElement;
        this.startStopButton = startStopButton;
        this.resetButton = resetButton;
        this.counterElement = counterElement;
        this.messageElement = messageElement;
        this.counter = 1;
        this.timerUpdater;
        this.presentTime;
        this.timeEnd;
        this.distanceToTimeEnd;
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
        this.messageElement.innerHTML = "Message";
        this.updateStartStopButton('start', 'stop');
        this.calculateWhenTimeEnd();
        this.timerUpdater = setInterval(() => this.updateTimer(), 1000);
    }

    updateStartStopButton(from, to) {
        replaceClass(this.startStopButton, from, to)
        this.startStopButton.innerHTML = to.charAt(0).toUpperCase() + to.slice(1);
    }

    calculateWhenTimeEnd() {
        this.presentTime = new Date().getTime();
        this.timeEnd = this.presentTime + toMiliseconds(parseInt(this.minutesElement.innerText), parseInt(this.secondsElement.innerText)) + 30; //Give a few miliseconds for program so then it can update clock correct after first second from start
    }

    updateTimer() {
        this.calculeteDistanceToTimeEnd();
        this.updateClock()

        if (this.distanceToTimeEnd < 0) {
            this.counter++;
            this.playAlarm();
            this.showMessage();
            this.reset();
            this.counterElement.innerHTML = "Counter: " + this.counter;
        }
    }

    calculeteDistanceToTimeEnd() {
        this.presentTime = new Date().getTime();
        this.distanceToTimeEnd = this.timeEnd - this.presentTime;
    }

    updateClock() {
        this.minutesElement.innerHTML = toMinutes(this.distanceToTimeEnd);
        this.secondsElement.innerHTML = toSeconds(this.distanceToTimeEnd);
    }

    playAlarm() {
        let audio = new Audio('sound/alarm.flac'); //sound from https://freesound.org/s/22627/
        audio.play();
        let playedTimes = 1;
        let x = setInterval(() => {
            audio.play();
            playedTimes++;
            if (playedTimes === 3) {
                clearInterval(x);
            }
        }, 1500);
    }

    showMessage() {
        if (this.counter > 4) {
            this.messageElement.innerHTML = "Time for long break (15-30min)";
            this.counter = 1;
        }
        else {
            this.messageElement.innerHTML = "Time for short break (3-5min)";
        }
    }

    reset() {
        this.stop();
        this.minutesElement.innerHTML = this.minutesInitialValue;
        this.secondsElement.innerHTML = this.secondsInitialValue;
    }

    stop() {
        clearInterval(this.timerUpdater);
        this.updateStartStopButton('stop', 'start');
    }
}

const minutesInitialValue = "25";
const secondsInitialValue = "00";
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const counterElement = document.getElementById('counter');
const messageElement = document.getElementById('message');

const timer = new Timer(minutesInitialValue, secondsInitialValue, minutesElement, secondsElement, startStopButton, resetButton, counterElement, messageElement);

startStopButton.addEventListener('click', () => timer.startStop());
resetButton.addEventListener('click', () => timer.reset());

function toMiliseconds(minutes, seconds) {
    let miliseconds = (minutes*60 + seconds)*1000;
    return miliseconds;
}

function toSeconds(miliseconds) {
    let seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return seconds;
}

function toMinutes(miliseconds) {
    let minutes = Math.floor((miliseconds % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return minutes;
}

function replaceClass(element, fromClass, toClass) {
    element.classList.remove(fromClass);
    element.classList.add(toClass);
}