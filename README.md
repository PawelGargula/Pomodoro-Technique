# Pomodoro-Technique

## Demo: 
https://pawelgargula.github.io/Pomodoro-Technique/

## What is it for?

It should increase your work efficiency.

## How does it work (information from Wikipedia)?

"A time management. Method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks."

## What features does this page have?

- Timer which can be set (on timer click) by minutes (1 - 99). Last enetered value is saving in the local storage. You can start, stop (start, stop is a one convertible button) or reset timer. The time elapsed also appears in the page title.

- Above timer there is a counter of finished intervals, it is counting to 4 then it is reset to 1.
  This value is changing after time is end.

- After time is end, below buttons and in the page title it appears message about break depending on value in counter (When 1 - 3 there we have short break and when 4 it means long break for us). Plus we hear the short alarm, which plays 3 times.

- Alarm's .flac file is stored in IndexedDB as 'blob'.

- The header "Pomodoro Technique" is a hyperlink to wikipedia.

- Page is accessible for users using screen readers

- Page enables fast loading (regardless of the network) and offline access thanks of service worker and its storage API - cache
