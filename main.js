class Handle {
    constructor(id) {
        this.handle = document.getElementById(id);
    }
}

class Clock extends Handle { }

class OnClockValueUpdater extends Handle {
    updateValueOnClock(value) {
        this.handle.innerText = (value < 10) ? `0${value}` : value;
    }
}

class Seconds extends OnClockValueUpdater {
    countToMiliseconds() {
        let seconds = parseInt(this.handle.innerText, 10);
        if (isNaN(seconds) || seconds < 0 || seconds > 59)
            return 0;
        return seconds * 1000;
    }

    countToClockSeconds(miliseconds) {
        return Math.floor((miliseconds % (1000 * 60)) / 1000);
    }
}

class Minutes extends OnClockValueUpdater {
    countToMiliseconds() {
        let minutes = parseInt(this.handle.innerText, 10);
        if (isNaN(minutes) || minutes < 0 || minutes > 99)
            minutes = 25;
        return minutes * 1000 * 60;
    }

    countToClockMinutes(miliseconds) {
        return Math.floor(miliseconds / (1000 * 60));
    }
}

class StartStopButton extends Handle {
    updateToStop() {
        this.handle.className = 'stop';
        this.handle.innerText = 'Stop';
    }

    updateToStart() {
        this.handle.className = 'start';
        this.handle.innerText = 'Start';
    }
}

class ResetButton extends Handle { }

class Counter extends Handle {
    constructor(id) {
        super(id);
        this.counter = 1;
    }

    update() {
        if (this.counter >= 4)
            this.handle.innerText = 1;
        else {
            this.counter++;
            this.handle.innerText = this.counter;
        }
    }
}

class Message extends Handle {
    constructor(id) {
        super(id);
        this.counter = 1;
    }

    showMessageAboutBreak() {
        if (this.counter < 4) {
            this.counter++;
            this.handle.innerText = 'Time for short break (3-5min)';
        } else {
            this.counter = 1;
            this.handle.innerText = 'Time for long break (15-30min)';
        }
    }

    reset() {
        this.handle.innerText = 'Message';
    }
}

class Alarm extends Audio {
    play3Times() {
        this.play();
        let counter = 1;
        this.onended = function () {
            if (counter < 3) {
                counter++;
                this.play();
            }
        }
    }
}

class CountdownTimer {
    constructor(startStopButton, clock) {
        this.startStopButton = startStopButton;
        this.clock = clock;
        this.seconds = new Seconds('seconds');
        this.minutes = new Minutes('minutes');
        this.counter = new Counter('counter');
        this.message = new Message('message');
        this.alarm = new Alarm('sound/alarm.flac'); //sound from https://freesound.org/s/22627/
        this.minutesFromUser = 25;
        this.timerInterval;
    }

    startOrStop() {
        if (startStopButton.handle.classList.contains('start'))
            this.start();
        else
            this.stop();
    }

    start() {
        this.startStopButton.updateToStop();
        this.message.reset();
        //Give a few miliseconds for program so then it can update clockElement correct after first second from start
        let timeEnd = this.now + this.minutes.countToMiliseconds() + this.seconds.countToMiliseconds() + 30;
        this.timerInterval = setInterval(() => this.update(timeEnd), 1000);
    }

    get now() {
        return new Date().getTime();
    }

    update(miliseconds) {
        let distanceToTimeEnd = miliseconds - this.now;
        this.updateClock(distanceToTimeEnd);
        this.updatePageTitle();

        if (distanceToTimeEnd < 1) {
            this.alarm.play3Times();
            this.message.showMessageAboutBreak();
            this.counter.update();
            this.reset();
        }
    }

    updateClock(miliseconds) {
        let seconds = this.seconds.countToClockSeconds(miliseconds);
        this.seconds.updateValueOnClock(seconds);
        let minutes = this.minutes.countToClockMinutes(miliseconds);
        this.minutes.updateValueOnClock(minutes);
    }

    updatePageTitle() {
        document.title = `${clock.handle.innerText} - Pomodoro Timer`;
    }

    reset() {
        this.minutes.updateValueOnClock(this.minutesFromUser);
        this.seconds.updateValueOnClock(0);
        this.stop();
        this.updatePageTitle();
    }

    stop() {
        clearInterval(this.timerInterval);
        this.startStopButton.updateToStart();
    }

    set() {
        let minutes = prompt("Enter minutes (1-99)", this.minutesFromUser);
        if (minutes === null) 
            return;
            
        minutes = parseInt(minutes, 10);
        if (isNaN(minutes) || minutes < 1 || minutes > 99)
            alert("Wrong number, must be between 1 and 99");
        else {
            this.minutesFromUser = minutes;
            this.reset();
        }
    }
}

const startStopButton = new StartStopButton('start-stop');
const clock = new Clock('clock');
const countdownTimer = new CountdownTimer(startStopButton, clock);
const resetButton = new ResetButton('reset');

startStopButton.handle.addEventListener('click', () => countdownTimer.startOrStop());

resetButton.handle.addEventListener('click', () => countdownTimer.reset());

clock.handle.addEventListener('click', () => countdownTimer.set());