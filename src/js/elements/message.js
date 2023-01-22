export const message = {
    handle: document.getElementById("message"),
    writingNow: false,
    erasingNow: false,
    animationSpeed: 90,
    hiddenMessageHandle: document.querySelector("#hidden-message"),

    show(counterValue) {
        if (counterValue < 4) {
            const messageAboutShortBreak = "Time for short break (3 to 5min)";
            this.write(messageAboutShortBreak);
        }
        else {
            const messageAboutLongBreak = "Time for long break (15 to 30min)";
            this.write(messageAboutLongBreak);
        }
    },

    write(text) {
        document.title = text;
        this.hiddenMessageHandle.innerText = text;
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
        this.hiddenMessageHandle.innerText = "";
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