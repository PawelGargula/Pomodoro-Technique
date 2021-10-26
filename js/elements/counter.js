export const counter = {
    handle: document.getElementById("counter"),

    update() {
        if (this.value >= 4)
            this.handle.innerText = 1;
        else
            this.handle.innerText = this.value + 1;
    },

    get value() {
        let value = parseInt(this.handle.innerText, 10);
        if (isNaN(value) || value < 1 || minutes > 4)
            return 1;
        return value;
    }
}