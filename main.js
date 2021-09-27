import { countdownTimer } from "./elements/countdownTimer.js";
import { startStopButton } from "./elements/startStopButton.js";
import { resetButton } from "./elements/resetButton.js";
import { clock } from "./elements/clock.js";
import { minutes } from "./elements/minutes.js";

minutes.update(countdownTimer.minutesFromUser);

startStopButton.handle.addEventListener("click", () =>
    countdownTimer.startOrStop()
);

resetButton.handle.addEventListener("click", () => countdownTimer.reset());

clock.handle.addEventListener("click", () => countdownTimer.set());