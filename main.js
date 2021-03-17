class Handle {
    constructor(id) {
        this.handle = document.getElementById(id);
    }
}

class Clock extends Handle {
    constructor(id) {
        super(id);
    }
}

class Seconds extends Handle {
    constructor(id) {
        super(id);
    }
    
    update(value) {
        this.handle.innerText = (value < 10) ? `0${value}` : value;
    }
    
    countToMiliseconds() {
        return parseInt(this.handle.innerText, 10) * 1000;
    }
    
    countToClockSeconds(miliseconds) {
        return Math.floor((miliseconds % (1000*60)) / 1000);
    }
}

class Minutes extends Seconds {
    constructor(id) {
        super(id);
    }
    
    countToMiliseconds() {
        return super.countToMiliseconds() * 60;
    }
    
    countToClockMinutes(miliseconds) {
        return Math.floor(miliseconds / (1000 * 60));
    }
}

class StartStopButton extends Handle {
    constructor(id) {
        super(id);
    }
    
    updateToStop() {
        this.handle.className = 'stop';
        this.handle.innerText = 'Stop';
    }

    updateToStart() {
        this.handle.className = 'start';
        this.handle.innerText = 'Start';
    }
}

class ResetButton extends Handle {
    constructor(id) {
        super(id);
    }
}

class Counter extends Handle {
    constructor(id) {
        super(id);
    }

    update() {
        if (this.value >= 4) {
            this.handle.innerText = 1;
        } else {
            this.handle.innerText = parseInt(this.handle.innerText, 10) + 1;
        }
    }

    get value() {
        return parseInt(this.handle.innerText, 10);
    }
}

class Message extends Handle {
    constructor(id) {
        super(id);
    }

    update(counter) {
        if (counter >= 4) {
            this.handle.innerText = 'Time for long break (15-30min)';
        } else {
            this.handle.innerText = 'Time for short break (3-5min)';
        }
    }

    reset() {
        this.handle.innerText = "Message";
    }
}

class Alarm {
    constructor(src) {
        this.alarm = new Audio(src);
    }

    play3Times() {
        this.alarm.play();
        let count = 1;
        this.alarm.onended = function() {
            if (count < 3) {
                count++;
                this.play();
            }
        }
    }
}

class CountdownTimer {
    constructor(startStopButton) {
        this.startStopButton = startStopButton;
        this.seconds = new Seconds('seconds');
        this.minutes = new Minutes('minutes');
        this.counter = new Counter('counter');
        this.message = new Message('message');
        this.alarm = new Alarm('sound/alarm.flac'); //sound from https://freesound.org/s/22627/
        this.minutesFromUser = 25;
        this.timerInterval;
    }

    set(minutesFromUser) {
        this.minutesFromUser = minutesFromUser;
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
        updatePageTitle();

        if (distanceToTimeEnd < 0) {
            this.alarm.play3Times();
            this.message.update(this.counter.value);
            this.counter.update();
            this.reset();
        }
    }

    updateClock(distanceToTimeEnd) {
        let seconds = this.seconds.countToClockSeconds(distanceToTimeEnd);
        this.seconds.update(seconds);
        let minutes = this.minutes.countToClockMinutes(distanceToTimeEnd);
        this.minutes.update(minutes);
    }

    reset() {
        this.minutes.update(this.minutesFromUser);
        this.seconds.update(0);
        this.stop();
    }

    stop() {
        clearInterval(this.timerInterval);
        this.startStopButton.updateToStart();
        updatePageTitle();
    }

}

const startStopButton = new StartStopButton('start-stop');
const countdownTimer = new CountdownTimer(startStopButton);
const resetButton = new ResetButton('reset');
const clock = new Clock('clock');

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

function updatePageTitle() {
    document.title = `${clock.handle.innerText} - Pomodoro Timer`;
}