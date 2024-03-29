import { alarm } from "./elements/alarm.js";
import { message } from "./elements/message.js";
import { counter } from "./elements/counter.js";
import { startStopButton } from "./elements/startStopButton.js";
import { seconds } from "./elements/seconds.js";
import { minutes } from "./elements/minutes.js";
import { clock } from "./elements/clock.js";
import { lStorage } from "./localStorage.js";

export const countdownTimer = {
    minutesFromUser: lStorage.getMinutes(),
    timerInterval: null,
    stopped: true,

    startOrStop() {
        if (this.stopped) this.start();
        else this.stop();
    },

    start() {
        this.stopped = false;
        startStopButton.updateToStop();
        message.erase();
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
            this.reset();
            alarm.play3Times();
            message.show(counter.value);
            counter.update();
        }
    },

    updateClock(miliseconds) {
        let sec = seconds.countToClockSeconds(miliseconds);
        seconds.update(sec);
        let min = minutes.countToClockMinutes(miliseconds);
        minutes.update(min);
        clock.updateAriaLabel(min, sec);
    },

    updatePageTitle() {
        document.title = `${clock.handle.innerText} - Pomodoro Timer`;
    },

    reset() {
        minutes.update(this.minutesFromUser);
        seconds.update(0);
        clock.updateAriaLabel(this.minutesFromUser, 0);
        this.stop();
        this.updatePageTitle();
    },

    stop() {
        this.stopped = true;
        clearInterval(this.timerInterval);
        startStopButton.updateToStart();
    },

    set() {
        let minutes = prompt("Enter minutes (1 to 99)", this.minutesFromUser);
        if (minutes === null) return;

        minutes = parseInt(minutes, 10);
        if (isNaN(minutes) || minutes < 1 || minutes > 99)
            alert("Wrong number, must be between 1 and 99");
        else {
            this.minutesFromUser = minutes;
            lStorage.setMinutes(minutes);
            this.reset();
        }
    }
}