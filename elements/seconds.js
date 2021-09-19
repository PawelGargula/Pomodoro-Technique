export const seconds = {
    handle: document.getElementById("seconds"),

    countToMiliseconds() {
        let seconds = parseInt(this.handle.innerText, 10);
        if (isNaN(seconds) || seconds < 0 || seconds > 59) return 0;
        return seconds * 1000;
    },

    countToClockSeconds(miliseconds) {
        return Math.floor((miliseconds % (1000 * 60)) / 1000);
    },

    update(value) {
        this.handle.innerText = value < 10 ? `0${value}` : value;
    }
}