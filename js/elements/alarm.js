class Alarm extends Audio {
    play3Times() {
        this.play();
        let counter = 1;
        this.onended = function () {
            if (counter < 3) {
                counter++;
                this.play();
            }
        };
    }
}

export const alarm = new Alarm("sound/alarm.flac"); //sound from https://freesound.org/s/22627/