class Handle {
    constructor(id) {
        this.handle = document.getElementById(id);
    }
}

class Clock extends Handle {}

class Seconds extends Handle {
    
    updateOnClock(value) {
        this.handle.innerText = (value < 10) ? `0${value}` : value;
    }
    
    countToMiliseconds() {
        let seconds = parseInt(this.handle.innerText, 10);
        if (isNaN(seconds) || seconds < 0 || seconds > 59) {
            seconds = 0;
        } 
        return seconds * 1000;
    }
    
    countToClockSeconds(miliseconds) {
        return Math.floor((miliseconds % (1000*60)) / 1000);
    }
}

class Minutes extends Handle {

    updateOnClock(value) {
        this.handle.innerText = (value < 10) ? `0${value}` : value;
    }
    
    countToMiliseconds() {
        let minutes = parseInt(this.handle.innerText, 10);
        if (isNaN(minutes) || minutes < 0 || minutes > 99) {
            minutes = 25;
        } 
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

class ResetButton extends Handle {}

class Counter extends Handle {
    constructor(id) {
        super(id);
        this.counter = 1;
    }

    update() {
        if (this.counter >= 4) {
            this.handle.innerText = 1;
        } else {
            this.counter++;
            this.handle.innerText = this.counter;
        }
    }
}

class Message extends Handle{
    constructor(id) {
        super(id);
        this.counter = 1;
    }

    showMessageAboutBreak() {
        if (this.counter < 4 ) {
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

class Alarm {
    constructor(path) {
        this.alarm = new Audio(path);
    }

    play3Times() {
        this.alarm.play();
        let counter = 1;
        this.alarm.onended = function() {
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

    set(minutes) {
        this.minutesFromUser = minutes;
        this.reset();
    }

    startOrStop() {
        if (startStopButton.handle.classList.contains('start')) {
            this.startStopButton.updateToStop();
            this.message.reset();
            this.start();
        } else {
            this.startStopButton.updateToStart();
            this.stop();
        }
    }

    start() {
        //Give a few miliseconds for program so then it can update clockElement correct after first second from start
        let timeEnd = this.now + this.minutes.countToMiliseconds() + this.seconds.countToMiliseconds() + 30;
        this.timerInterval = setInterval(() => this.update(timeEnd), 1000);
    }

    get now() {
        return new Date().getTime();
    }

    update(timeEnd) {
        let distanceToTimeEnd = timeEnd - this.now;
        this.updateClock(distanceToTimeEnd);
        this.updatePageTitle();

        if (distanceToTimeEnd < 0) {
            this.alarm.play3Times();
            this.message.showMessageAboutBreak();
            this.counter.update();
            this.reset();
        }
    }

    updatePageTitle() {
        document.title = `${clock.handle.innerText} - Pomodoro Timer`;
    }

    updateClock(distanceToTimeEnd) {
        let seconds = this.seconds.countToClockSeconds(distanceToTimeEnd);
        this.seconds.updateOnClock(seconds);
        let minutes = this.minutes.countToClockMinutes(distanceToTimeEnd);
        this.minutes.updateOnClock(minutes);
    }

    reset() {
        this.minutes.updateOnClock(this.minutesFromUser);
        this.seconds.updateOnClock(0);
        this.stop();
        this.updatePageTitle();
    }

    stop() {
        clearInterval(this.timerInterval);
        this.startStopButton.updateToStart();
    }

}

const startStopButton = new StartStopButton('start-stop');
const clock = new Clock('clock');
const countdownTimer = new CountdownTimer(startStopButton, clock);
const resetButton = new ResetButton('reset');

startStopButton.handle.addEventListener('click', () => countdownTimer.startOrStop());

resetButton.handle.addEventListener('click', () => countdownTimer.reset());

clock.handle.addEventListener('click', () => {
    let minutes = prompt("Enter minutes (1-99)", "25");
    minutes = parseInt(minutes, 10);
    if (isNaN(minutes) || minutes < 1 || minutes > 99) {
        console.log("Niepoprawne dane")
    } else {
        countdownTimer.set(minutes);
    }
});