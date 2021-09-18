export const counter = {
    handle: document.getElementById("counter"),
    value: 1,

    update() {
        if (this.value >= 4) this.handle.innerText = 1;
        else {
            this.value++;
            this.handle.innerText = this.value;
        }
    }
}