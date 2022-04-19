export const counter = {
    handle: document.getElementById("counter"),

    update() {
        if (this.value >= 4)
            this.handle.innerText = "Counter: 1";
        else
            this.handle.innerText = `Counter: ${this.value + 1}`;
    },

    get value() {
        let value = this.handle.innerText.replace("Counter: ", "");
        value = parseInt(value, 10);
        if (isNaN(value) || value < 1 || minutes > 4)
            return 1;
        return value;
    }
}