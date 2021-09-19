export const minutes = {
    handle: document.getElementById("minutes"),

    countToMiliseconds() {
        let minutes = parseInt(this.handle.innerText, 10);
        if (isNaN(minutes) || minutes < 0 || minutes > 99) minutes = 25;
        return minutes * 1000 * 60;
    },

    countToClockMinutes(miliseconds) {
        return Math.floor(miliseconds / (1000 * 60));
    },

    update(value) {
        this.handle.innerText = value < 10 ? `0${value}` : value;
    }
}