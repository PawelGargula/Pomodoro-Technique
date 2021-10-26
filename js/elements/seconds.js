export const seconds = {
    handle: document.getElementById("seconds"),

    countToMiliseconds() {
        return this.value * 1000;
    },

    get value() {
        let value = parseInt(this.handle.innerText, 10);
        if (isNaN(value) || value < 0 || value > 59) 
            return 0;
        return value;
    },

    countToClockSeconds(miliseconds) {
        return Math.floor((miliseconds % (1000 * 60)) / 1000);
    },

    update(value) {
        this.handle.innerText = value < 10 ? `0${value}` : value;
    }
}