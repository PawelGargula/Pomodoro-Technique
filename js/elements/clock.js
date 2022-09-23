export const clock = {
    handle: document.getElementById("clock"),

    updateAriaLabel(minutes, seconds) {
        this.handle.ariaLabel = `${minutes} minutes and ${seconds} seconds remaining`;
    }
}