export const startStopButton = {
    handle: document.getElementById("start-stop"),

    updateToStop() {
        this.handle.className = "stop";
        this.handle.innerText = "Stop";
    },

    updateToStart() {
        this.handle.className = "start";
        this.handle.innerText = "Start";
    }
}