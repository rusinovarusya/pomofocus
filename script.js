const periodLength = 25;
const timer = document.querySelector(".timer");
const button = document.querySelector(".button");
const btnFinish =  document.querySelector(".btn-finish");

let interval;

function startTimer() {
  const minutesAndSeconds = timer.textContent.split(":");
  let distance = Number(minutesAndSeconds[0] * 60) + Number(minutesAndSeconds[1]) || "0";
  console.log(distance);
  
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


button.addEventListener("click", startTimer);

btnFinish.addEventListener("click", stopTimer);
