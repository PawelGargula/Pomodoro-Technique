export const minutes = {
    handle: document.getElementById("minutes"),

    countToMiliseconds() {
        return this.value * 1000 * 60;
    },

    get value() {
        let value = parseInt(this.handle.innerText, 10);
        if (isNaN(value) || value < 0 || value > 99)
            return value = 25;
        return value;
    },

    countToClockMinutes(miliseconds) {
        return Math.floor(miliseconds / (1000 * 60));
    },

    update(value) {
        this.handle.innerText = value.toString().padStart(2, "0");
    }
}