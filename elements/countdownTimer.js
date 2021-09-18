import { alarm } from "./alarm.js";
import { message } from "./message.js";
import { counter } from "./counter.js";
import { startStopButton } from "./startStopButton.js";
import { seconds } from "./seconds.js";
import { minutes } from "./minutes.js";
import { clock } from "./clock.js";

export const countdownTimer = {
    minutesFromUser: 25,
    timerInterval: null,

    startOrStop() {
        // Warunek do zmiany
        if (startStopButton.handle.classList.contains("start")) this.start();
        else this.stop();
    },

    start() {
        startStopButton.updateToStop();
        message.reset();
        //Give a few miliseconds for program so then it can update clockElement correct after first second from start
        let timeEnd =
            this.now +
            minutes.countToMiliseconds() +
            seconds.countToMiliseconds() +
            30;
        this.timerInterval = setInterval(() => this.update(timeEnd), 1000);
    },

    get now() {
        return new Date().getTime();
    },

    update(timeEnd) {
        let distanceToTimeEnd = timeEnd - this.now;
        this.updateClock(distanceToTimeEnd);
        this.updatePageTitle();

        if (distanceToTimeEnd < 1) {
            alarm.play3Times();
            message.showMessageAboutBreak(counter.value);
            counter.update();
            this.reset();
        }
    },

    updateClock(miliseconds) {
        let sec = seconds.countToClockSeconds(miliseconds);
        seconds.updateValueOnClock(sec);
        let min = minutes.countToClockMinutes(miliseconds);
        minutes.updateValueOnClock(min);
    },

    updatePageTitle() {
        document.title = `${clock.handle.innerText} - Pomodoro Timer`;
    },

    reset() {
        minutes.updateValueOnClock(this.minutesFromUser);
        seconds.updateValueOnClock(0);
        this.stop();
        this.updatePageTitle();
    },

    stop() {
        clearInterval(this.timerInterval);
        startStopButton.updateToStart();
    },

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