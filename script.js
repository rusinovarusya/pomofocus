const periodsLength = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15
}

const timer = document.querySelector(".timer");
const button = document.querySelector(".button");


let interval;

function startTimer() {
  const minutesAndSeconds = timer.textContent.split(":");
  let distance = Number(minutesAndSeconds[0] * 60) + Number(minutesAndSeconds[1]) || "0";
  
  interval = setInterval(() => {
    if (distance < 1) {
      clearInterval(interval);
    } else {
      --distance;
      let minutes = Math.floor(distance / 60);
      let seconds = distance % 60;
      timer.textContent = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }
  }, 1000);
}


function stopTimer() {
  clearInterval(interval);
}


function handleClick() {
  if (button.classList.contains("pause")) {
    button.textContent = "Continue";
    stopTimer();
    button.classList.remove("pause");
  } else {
    button.textContent = "Pause";
    startTimer();
    button.classList.add("pause");
  }
}


button.addEventListener("click", handleClick);
