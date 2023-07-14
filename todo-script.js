const tasksList = document.querySelector(".tasks-list");
const inputNewTask = document.querySelector(".input-new-task");


function handleKeydownEnter(event) {
  if (event.key === "Enter") {
    if (inputNewTask.value === "") {
      alert("fill in");
    } else {
      createNewTask(event);
    }
  }
}

function createNewTask() {
  const text = inputNewTask.value;
  const id = new Date().getTime();

  tasksList.insertAdjacentHTML("beforeend", 
  `<div class="task-item">
    <input type="checkbox" name="pomodoro-${document.querySelector(".pomodoro-num")}" id="${id}">
    <label for="${id}">${text}</label>
  </div>`);

  inputNewTask.value = "";
}

inputNewTask.addEventListener("keydown", handleKeydownEnter);
