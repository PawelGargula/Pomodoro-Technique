import { countdownTimer } from "./js/countdownTimer.js";
import { startStopButton } from "./js/elements/startStopButton.js";
import { resetButton } from "./js/elements/resetButton.js";
import { clock } from "./js/elements/clock.js";
import { minutes } from "./js/elements/minutes.js";

minutes.update(countdownTimer.minutesFromUser);
clock.updateAriaLabel(countdownTimer.minutesFromUser, 0);

startStopButton.handle.addEventListener("click", () =>
    countdownTimer.startOrStop()
);

resetButton.handle.addEventListener("click", () => countdownTimer.reset());

clock.handle.addEventListener("click", () => countdownTimer.set());

const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            // path needs to be written relative to the origin, app's root directory
            const registration = await navigator.serviceWorker.register(`${location.href}sw.js`);
            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

registerServiceWorker();