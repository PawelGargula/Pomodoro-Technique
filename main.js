class CountdownTimer {
    constructor(startStopButton, resetButton) {
        this.startStopButton = startStopButton;
        this.resetButton = resetButton;
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.minutesInitialValue = "25";
        this.secondsInitialValue = "00";
        this.timerUpdater;
        this.counter = 1;
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
        document.getElementById('message').innerText = "Message";
        this.updateStartStopButton('stop');
        //Give a few miliseconds for program so then it can update clockElement correct after first second from start
        let timeEnd = this.presentTime + countMiliseconds(parseInt(this.minutesElement.innerText), parseInt(this.secondsElement.innerText)) + 30; 
        this.timerUpdater = setInterval(() => this.updateTimer(timeEnd), 1000);
    }

    updateStartStopButton(to) {
        this.startStopButton.setAttribute("class", to);
        this.startStopButton.innerText = to.charAt(0).toUpperCase() + to.slice(1);
    }

    get presentTime() {
        return new Date().getTime();
    }

    updateTimer(timeEnd) {
        let distanceToTimeEnd = timeEnd - this.presentTime;
        this.updateClock(distanceToTimeEnd);
        document.title = `${document.getElementById('clock').innerText} - Pomodoro Timer`;

        if (distanceToTimeEnd < 0) {
            this.counter++;
            this.playAlarm();
            this.showMessage();
            this.reset();
            document.getElementById('counter').innerText = `Counter: ${this.counter}`;
        }
    }

    updateClock(distanceToTimeEnd) {
        this.minutesElement.innerText = convertToMinutesForClock(distanceToTimeEnd);
        this.secondsElement.innerText = convertToSecondsForClock(distanceToTimeEnd);
    }

    playAlarm() {
        let alarm = new Audio('sound/alarm.flac'); //sound from https://freesound.org/s/22627/
        alarm.play();
        let count = 1;
        alarm.onended = function() {
            if(count < 3) {
                count++;
                this.play();
            }
        }
    }

    showMessage() {
        if (this.counter > 4) {
            document.getElementById('message').innerText = "Time for long break (15-30min)";
            this.counter = 1;
        }
        else {
            document.getElementById('message').innerText = "Time for short break (3-5min)";
        }
    }

    reset() {
        this.stop();
        this.minutesElement.innerText = this.minutesInitialValue;
        this.secondsElement.innerText = this.secondsInitialValue;
    }

    stop() {
        clearInterval(this.timerUpdater);
        this.updateStartStopButton("start");
        document.title = "Pomodoro Technique";
    }
}

main();

function main() {
    const startStopButton = document.getElementById('start-stop');
    const resetButton = document.getElementById('reset');
    const countdownTimer = new CountdownTimer(startStopButton, resetButton);
    startStopButton.addEventListener('click', () => countdownTimer.startStop());
    resetButton.addEventListener('click', () => countdownTimer.reset());
}

function countMiliseconds(minutes, seconds) {
    let miliseconds = (minutes*60 + seconds)*1000;
    return miliseconds;
}

function convertToMinutesForClock(miliseconds) {
    let minutes = Math.floor((miliseconds % (1000*60*60)) / (1000*60));
    return (minutes < 10) ? `0${minutes}` : minutes;
}

function convertToSecondsForClock(miliseconds) {
    let seconds = Math.floor((miliseconds % (1000*60)) / 1000);
    return (seconds < 10) ? `0${seconds}` : seconds;
}