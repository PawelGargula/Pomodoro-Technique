class Timer {
    constructor(minutesInitialValue, secondsInitialValue, clockElement, minutesElement, secondsElement, startStopButton, resetButton, counterElement, messageElement, audio) {
        this.minutesInitialValue = minutesInitialValue;
        this.secondsInitialValue = secondsInitialValue;
        this.clockElement = clockElement;
        this.minutesElement = minutesElement;
        this.secondsElement = secondsElement;
        this.startStopButton = startStopButton;
        this.resetButton = resetButton;
        this.counterElement = counterElement;
        this.messageElement = messageElement;
        this.audio = audio;
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
        this.timeEnd = this.presentTime + toMiliseconds(parseInt(this.minutesElement.innerText), parseInt(this.secondsElement.innerText)) + 30; //Give a few miliseconds for program so then it can update clockElement correct after first second from start
    }

    updateTimer() {
        this.calculeteDistanceToTimeEnd();
        this.updateClock();
        document.title = this.clockElement.innerText + " - Pomodoro Timer";

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
        this.audio.play();
        let playedTimes = 1;
        let x = setInterval(() => {
            this.audio.play();
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
        document.title = "Pomodoro Technique";
    }
}

const minutesInitialValue = "25";
const secondsInitialValue = "00";
const clockElement = document.getElementById('clock');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const counterElement = document.getElementById('counter');
const messageElement = document.getElementById('message');
const audio = new Audio('sound/alarm.flac'); //sound from https://freesound.org/s/22627/

const timer = new Timer(minutesInitialValue, secondsInitialValue, clockElement, minutesElement, secondsElement, startStopButton, resetButton, counterElement, messageElement, audio);

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