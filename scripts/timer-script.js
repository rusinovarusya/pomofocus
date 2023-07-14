const durations = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15
}

const taglines = {
  pomodoro: "Time to focus!",
  shortBreak: "Time for a break!",
  longBreak: "Time for a break!"
}


const timer = document.querySelector(".timer");
const button = document.querySelector(".button");
const pomodoroNum = document.querySelector(".pomodoro-num");
const tagline = document.querySelector(".tagline");
const timerTypeInputAll = document.querySelectorAll("input[name='timer-type']");
const pageWrapper = document.querySelector(".page-wrapper");

let interval;


function startTimer() {
  const minutesAndSeconds = timer.textContent.split(":");
  let remains = Number(minutesAndSeconds[0] * 60) + Number(minutesAndSeconds[1]) || 0;

  button.classList.add("play");
  button.textContent = "Pause";

  interval = setInterval(() => {
    if (remains < 1) {
      finishTimer();
      switchToNextMode();
    } else {
      --remains;
      let minutes = Math.floor(remains / 60);
      let seconds = remains % 60;
      timer.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
  }, 1000);
}


function pauseTimer() {
  clearInterval(interval);

  button.classList.remove("play");
  button.textContent = "Continue";
}


function continueTimer() {
  startTimer();

  button.classList.add("play");
  button.textContent = "Pause";
}


function finishTimer() {
  pauseTimer();

  button.classList.remove("play");
  button.textContent = "Start";
}


function handleClick() {
  if (button.classList.contains("play")) {
    pauseTimer();
    button.classList.remove("play");
  } else {
    continueTimer();
    button.classList.add("play");
  }
}



function setMode(mode) {
  if (mode === "pomodoro") {
    increasePomodoroNum();
  }
  sessionStorage.setItem("mode", mode);
  timer.textContent = `${durations[mode]}:00`;
  tagline.textContent = taglines[mode];

  pageWrapper.classList.remove(pageWrapper.classList[pageWrapper.classList.length - 1]);
  pageWrapper.classList.add(mode);
}


function switchToParticularMode(event) {
  const mode = event.target.value;
  finishTimer();
  setMode(mode);
}


function switchToNextMode() {
  const currentMode = sessionStorage.getItem("mode") || "pomodoro";
  const num = Number(sessionStorage.getItem("num"));
  let nextMode;
  if (currentMode === "shortBreak" || currentMode === "longBreak") {
    nextMode = "pomodoro";
  } else {
    if (num % 4 === 0) {
      nextMode = "longBreak";
    } else {
      nextMode = "shortBreak";
    }
  }
  setMode(nextMode);
  makeTimerTypeItemChecked(nextMode);
  startTimer();
}


function makeTimerTypeItemChecked(mode) {
  timerTypeInputAll.forEach(timerTypeItem => {
    if (timerTypeItem.value === mode) {
      timerTypeItem.checked = true;
    } else {
      timerTypeItem.checked = false;
    }
  });
}


function init() {
  sessionStorage.setItem("mode", "pomodoro");
  sessionStorage.setItem("num", 1);
}


function increasePomodoroNum() {
  const currentNum = sessionStorage.getItem("num");
  const num = Number(currentNum) + 1;
  sessionStorage.setItem("num", num);
  pomodoroNum.textContent = num;
}



button.addEventListener("click", handleClick);
timerTypeInputAll.forEach(timerType => timerType.addEventListener("click", switchToParticularMode));

init();
