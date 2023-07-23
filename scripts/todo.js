"use strict";
import { saveToStorage, getFromStorage } from "../scripts/storage.js";
import { User, parseUser, Task } from "../models/User.js";
import { currentUserStorage, checkCurrentUser, currentUser } from "./common.js";

// ----------------- Global variables -----------------
const todoArrFromStorage = JSON.parse(getFromStorage("TODO_ARRAY")) || [];
const todoArr =
  todoArrFromStorage.length > 0
    ? todoArrFromStorage.map(
        (data) => new Task(data.task, data.owner, data.isDone)
      )
    : [];
const btnAdd = document.querySelector("#btn-add");
const inputTask = document.querySelector("#input-task");
const todoListContainer = document.querySelector("#todo-list");

/* ----------------- Check if user is logged in -----------------
- If user is not logged in => undefined and not render data
+ If user is logged in => define as instance of User class
*/
checkCurrentUser();

// ----------------- Global function -----------------
function renderTodoList(el) {
  const html =
    el.owner === currentUser.username
      ? `<li data-task-name='${el.task}' class='todo-item ${
          el.isDone === true ? "checked" : ""
        }'>${el.task}<span class="close">x</span>`
      : "";
  todoListContainer.innerHTML += html;
}
// Initial render
todoArr.forEach(renderTodoList);

// Toggle completed task
function toggleCompletion(taskName) {
  const task = todoArr.find((el) => el.task === taskName);
  task.isDone = task.isDone === true ? false : true;
}

// Delete task
function deleteTask(task) {
  const elementToDeleteIndex = todoArr.findIndex((el) => el.task === task);
  todoArr.splice(elementToDeleteIndex, 1);
}

// Refresh todo list
function refresh() {
  todoListContainer.innerHTML = "";
  todoArr
    .filter((el) => el.owner === currentUser.username)
    .forEach(renderTodoList);
}
// Save to storage
function save() {
  saveToStorage("TODO_ARRAY", JSON.stringify(todoArr));
}

// ----------------- Event handler -----------------

btnAdd.addEventListener("click", function () {
  if (!currentUser) {
    alert("Please log in first to add Todo list");
    window.location.href = "../index.html";
  } else {
    if (inputTask.value === "") {
      alert("Please fill in the Todo content");
    } else {
      const data = {
        task: inputTask.value,
        owner: currentUser.username,
        isDone: false,
      };
      const task = new Task(data.task, data.owner, data.isDone);
      todoArr.push(task);
      save();
      inputTask.value = "";
      refresh();
    }
  }
});

document
  .querySelector("#todo-list")
  .addEventListener("click", function (event) {
    if (!event.target.classList.contains("close")) {
      // When clicked other than delete button: Toggle checked
      toggleCompletion(event.target.dataset.taskName);
      save();
      refresh();
    } else {
      // When clicked delete button: Delete task
      const taskToDelete = event.target.parentElement.dataset.taskName;
      deleteTask(taskToDelete);
      save();
      refresh();
    }
  });
