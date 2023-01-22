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