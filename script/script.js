let input = document.querySelector(`.input [type="text"]`);
let add = document.querySelector(`input[type="submit"]`);
let tasks = document.querySelector(".tasks");
let alltasks = [];

if (localStorage.getItem("tasks")) {
  alltasks = JSON.parse(localStorage.getItem("tasks"));
}
getdatafromlocal();

add.onclick = () => {
  if (input.value !== "") {
    addtasktoarray(input.value);
    input.value = "";
  }
};
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    add.click();
  }
});

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    removetaskbyID(e.target.parentElement.getAttribute("data-id"));
  }
});
function removetaskbyID(taskID) {
  alltasks = alltasks.filter((task) => task.id != taskID);
  addatatolocal(alltasks);
}
function addtasktoarray(tasktext) {
  const task = {
    title: tasktext,
    id: Date.now(),
    completed: false,
  };
  alltasks.push(task);
  addtasktotasks(alltasks);
  addatatolocal(alltasks);
}
function addtasktotasks(alltasks) {
  tasks.innerHTML = "";
  alltasks.forEach((task) => {
    let newdiv = document.createElement("div");
    newdiv.className = "task col-9 pe-0";
    newdiv.setAttribute("data-id", task.id);
    newdiv.textContent = task.title;
    newdiv.title = task.title;
    let span = document.createElement("span");
    span.className = "del col-3 text-center";
    span.textContent = "Delete";
    span.title = "Delete";
    newdiv.appendChild(span);
    tasks.appendChild(newdiv);
  });
}
function addatatolocal(alltasks) {
  localStorage.setItem("tasks", JSON.stringify(alltasks));
}
function getdatafromlocal() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addtasktotasks(tasks);
  }
}
