const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const taskList = document.getElementById("taskList");

let taskData = [];
const loadTask = () => {
  taskList.innerHTML = "";
  if (taskData.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
  } else {
    taskData.map((task) => {
      taskList.innerHTML += `
      <tr>
        <td>${task.task}</td>
        <td>${task.date}</td>
        <td><input type="checkbox" ${task.isDone ? "checked" : ""} onchange="toggleTaskStatus(${task.index})"></input></td>
        <td><button class="delete-btn" onclick="deleteTask(${task.index})">Delete</button></td>
      </tr>`;
    });
  }
};

const addTask = () => {
  if (taskInput.value === "" || dateInput === "") {
    alert("Task and Date must be filled!");
  } else {
    taskData.push({
      task: taskInput.value,
      date: dateInput.value,
      isDone: false,
    });
    loadTask();
  }
  console.log(taskData)
};

const deleteTask = (index) => {
  taskData.splice(index, 1);
  loadTask();
};

const deleteAllTasks = () => {
  taskData = [];
  loadTask();
};

const filterByStatus = (status) => {
  const filteredTasks = taskData.filter(task => task.isDone === status);
  taskList.innerHTML = "";
  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4">No tasks found</td></tr>`;
  } else {
    filteredTasks.map((task, index) => {
      taskList.innerHTML += `
      <tr>
        <td>${task.task}</td>
        <td>${task.date}</td>
        <td><input type="checkbox" ${task.isDone ? "checked" : ""} onchange="toggleTaskStatus(${index})"></input></td>
        <td><button class="delete-btn" onclick="deleteTask(${index})">Delete</button></td>
      </tr>`;
    });
  }
};

loadTask();
