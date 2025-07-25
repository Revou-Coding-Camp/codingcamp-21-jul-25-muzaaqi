const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const taskList = document.getElementById("taskList");
const filterSelection = document.getElementById("filterSelection");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let taskData = [];

const loadTask = () => {
  taskList.innerHTML = "";
  const currentFilter = filterSelection.value;
  let filteredTasks = taskData;

  if (currentFilter === "done") {
    filteredTasks = taskData.filter((task) => task.isCompleted);
  } else if (currentFilter === "notdone") {
    filteredTasks = taskData.filter((task) => !task.isCompleted);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<tr class="text-center text-gray-500"><td colspan="4" class="py-4">No task found</td></tr>`;
  } else {
    filteredTasks.forEach((task) => {
      const originalIndex = taskData.indexOf(task);
      taskList.innerHTML += `
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2">${task.task}</td>
        <td class="px-4 py-2">${task.date}</td>
        <td class="px-4 py-2 text-center">
          <input type="checkbox" ${
            task.isCompleted ? "checked" : ""
          } onchange="toggleTaskStatus(${originalIndex})" class="w-4 h-4 text-green-600">
        </td>
        <td class="px-4 py-2 text-center">
          <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs" onclick="deleteTask(${originalIndex})">Delete</button>
        </td>
      </tr>`;
    });
  }
};

const addTask = () => {
  if (taskInput.value.trim() === "" || dateInput.value === "") {
    alert("Task and Date must be filled!");
    return;
  }

  taskData.push({
    task: taskInput.value.trim(),
    date: dateInput.value,
    isCompleted: false,
  });

  taskInput.value = "";
  dateInput.value = "";

  loadTask();
  console.log(taskData);
};

const deleteTask = (index) => {
  if (confirm("Are you sure you want to delete this task?")) {
    taskData.splice(index, 1);
    loadTask();
  }
};

const deleteAllTasks = () => {
  if (taskData.length === 0) {
    alert("No tasks to delete!");
    return;
  } else if (confirm("Are you sure you want to delete all tasks?")) {
    taskData = [];
    loadTask();
  }
};

const toggleTaskStatus = (index) => {
  taskData[index].isCompleted = !taskData[index].isCompleted;
  loadTask();
};

document
  .getElementById("todo-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addTask();
  });

filterSelection.addEventListener("change", loadTask);
deleteAllBtn.addEventListener("click", deleteAllTasks);

loadTask();
