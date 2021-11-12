export const message = {
    handle: document.getElementById("message"),
    writingNow: false,
    erasingNow: false,
    animationSpeed: 90,

    show(counterValue) {
        if (counterValue < 4)
            this.write("Time for short break (3-5min)");
        else
            this.write("Time for long break (15-30min)");
    },

    write(text) {
        this.handle.innerHTML = "";
        this.writingNow = true;
        [...text].forEach((letter, index) => {
            setTimeout(() => {
                this.handle.innerHTML += letter;
                if (this.handle.innerHTML === text)
                    this.writingNow = false;
            }, index * this.animationSpeed)
        });
    },

    erase() {
        if (!this.erasingNow && this.handle.innerHTML !== "") {
            this.erasingNow = true;
            let eraser = setInterval(() => {
                if (!this.writingNow)
                    this.handle.innerHTML = this.handle.innerHTML.slice(0, -1);
                if (this.handle.innerHTML === "") {
                    clearInterval(eraser);
                    this.erasingNow = false;
                }
            }, this.animationSpeed);
        }
    }
}