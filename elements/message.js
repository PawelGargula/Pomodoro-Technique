export const message = {
    handle: document.getElementById("message"),

    showMessageAboutBreak(counterValue) {
        if (counterValue < 4) {
            this.handle.innerText = "Time for short break (3-5min)";
        } else {
            this.handle.innerText = "Time for long break (15-30min)";
        }
    },

    reset() {
        this.handle.innerText = "Message about break";
    }
}