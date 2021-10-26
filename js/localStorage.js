export let lStorage = {
    minutesKey: "minutes",

    getMinutes() {
        if (!isStorageSupported())
            return 25;

        let minutes = localStorage.getItem(this.minutesKey);
        return minutes === null ? 25 : Number(minutes);
    },

    setMinutes(value) {
        if (!isStorageSupported())
            return;

        localStorage.setItem(this.minutesKey, value);
    }
}

function isStorageSupported() {
    try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
        return true;
    } catch (err) {
        return false;
    }
}