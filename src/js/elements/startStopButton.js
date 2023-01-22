export const startStopButton = {
    handle: document.getElementById("start-stop"),

    updateToStop() {
        this.handle.className = "stop";
        this.handle.innerText = "Stop";
        this.handle.ariaLabel = "Stop the timer";
    },

    updateToStart() {
        this.handle.className = "start";
        this.handle.innerText = "Start";
        this.handle.ariaLabel = "Start the timer";
    }
}