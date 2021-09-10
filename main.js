// Have to change methods to be static :D

class Handle {
    constructor(id) {
        this.handle = document.getElementById(id);
    }
}

class Clock {
    static handle = document.getElementById("clock");
}

class Seconds {
    static handle = document.getElementById("seconds");

    static countToMiliseconds() {
        let seconds = parseInt(this.handle.innerText, 10);
        if (isNaN(seconds) || seconds < 0 || seconds > 59) return 0;
        return seconds * 1000;
    }

    static countToClockSeconds(miliseconds) {
        return Math.floor((miliseconds % (1000 * 60)) / 1000);
    }

    static updateValueOnClock(value) {
        this.handle.innerText = value < 10 ? `0${value}` : value;
    }
}

class Minutes {
    static handle = document.getElementById("minutes");

    static countToMiliseconds() {
        let minutes = parseInt(this.handle.innerText, 10);
        if (isNaN(minutes) || minutes < 0 || minutes > 99) minutes = 25;
        return minutes * 1000 * 60;
    }

    static countToClockMinutes(miliseconds) {
        return Math.floor(miliseconds / (1000 * 60));
    }

    static updateValueOnClock(value) {
        this.handle.innerText = value < 10 ? `0${value}` : value;
    }
}

class StartStopButton {
    static handle = document.getElementById("start-stop");

    static updateToStop() {
        this.handle.className = "stop";
        this.handle.innerText = "Stop";
    }

    static updateToStart() {
        this.handle.className = "start";
        this.handle.innerText = "Start";
    }
}

class ResetButton {
    static handle = document.getElementById("reset");
}

class Counter {
    static handle = document.getElementById("counter");
    static value = 1;

    static update() {
        if (this.value >= 4) this.handle.innerText = 1;
        else {
            this.value++;
            this.handle.innerText = this.value;
        }
    }
}

class Message {
    static handle = document.getElementById("message");

    // To do
    static showMessageAboutBreak() {
        if (Counter.value < 4) {
            this.handle.innerText = "Time for short break (3-5min)";
        } else {
            this.handle.innerText = "Time for long break (15-30min)";
        }
    }

    static reset() {
        this.handle.innerText = "Message about break";
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
        };
    }
}

class CountdownTimer {
    constructor() {
        this.alarm = new Alarm("sound/alarm.flac"); //sound from https://freesound.org/s/22627/
        this.minutesFromUser = 25;
        this.timerInterval;
    }

    startOrStop() {
        if (StartStopButton.handle.classList.contains("start")) this.start();
        else this.stop();
    }

    start() {
        StartStopButton.updateToStop();
        Message.reset();
        //Give a few miliseconds for program so then it can update clockElement correct after first second from start
        let timeEnd =
            this.now +
            Minutes.countToMiliseconds() +
            Seconds.countToMiliseconds() +
            30;
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
            Message.showMessageAboutBreak();
            Counter.update();
            this.reset();
        }
    }

    updateClock(miliseconds) {
        let seconds = Seconds.countToClockSeconds(miliseconds);
        Seconds.updateValueOnClock(seconds);
        let minutes = Minutes.countToClockMinutes(miliseconds);
        Minutes.updateValueOnClock(minutes);
    }

    updatePageTitle() {
        document.title = `${Clock.handle.innerText} - Pomodoro Timer`;
    }

    reset() {
        Minutes.updateValueOnClock(this.minutesFromUser);
        Seconds.updateValueOnClock(0);
        this.stop();
        this.updatePageTitle();
    }

    stop() {
        clearInterval(this.timerInterval);
        StartStopButton.updateToStart();
    }

    set() {
        let minutes = prompt("Enter minutes (1-99)", this.minutesFromUser);
        if (minutes === null) return;

        minutes = parseInt(minutes, 10);
        if (isNaN(minutes) || minutes < 1 || minutes > 99)
            alert("Wrong number, must be between 1 and 99");
        else {
            this.minutesFromUser = minutes;
            this.reset();
        }
    }
}

const countdownTimer = new CountdownTimer();

StartStopButton.handle.addEventListener("click", () =>
    countdownTimer.startOrStop()
);

ResetButton.handle.addEventListener("click", () => countdownTimer.reset());

Clock.handle.addEventListener("click", () => countdownTimer.set());
