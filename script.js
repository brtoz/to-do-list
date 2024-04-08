'use strict';

const headerTime = document.querySelector("[data-header-time]");
const menuTogglers = document.querySelectorAll("[data-menu-toggler]");
const menu = document.querySelector("[data-menu]");
const themeBtns = document.querySelectorAll("[data-theme-btn]");
const modalTogglers = document.querySelectorAll("[data-modal-toggler]");
const welcomeNote = document.querySelector("[data-welcome-note]");
const taskList = document.querySelector("[data-task-list]");
const taskInput = document.querySelector("[data-task-input]");
const modal = document.querySelector("[data-info-modal]");
let taskItem = {};
let taskRemover = {};

const date = new Date();

const taskCompleteSound = new Audio("./task-complete.mp3");

const getWeekDayName = function (dayNumber) {
  switch (dayNumber) {
    case 0:
      return "Pazar";
    case 1:
      return "Pazartesi";
    case 2:
      return "Salı";
    case 3:
      return "Çarşamba";
    case 4:
      return "Perşembe";
    case 5:
      return "Cuma";
    case 6:
      return "Cumartesi";
    default:
      return "Geçerli bir gün değil";
  }
}

const getMonthName = function (monthNumber) {
  switch (monthNumber) {
    case 0:
      return "Ocak";
    case 1:
      return "Şubat";
    case 2:
      return "Mart";
    case 3:
      return "Nisan";
    case 4:
      return "Mayıs";
    case 5:
      return "Haziran";
    case 6:
      return "Temmuz";
    case 7:
      return "Ağustos";
    case 8:
      return "Eylül";
    case 9:
      return "Ekim";
    case 10:
      return "Kasım";
    case 11:
      return "Aralık";
    default:
      return "Geçerli bir ay değil";
  }
}

const weekDayName = getWeekDayName(date.getDay());
const monthName = getMonthName(date.getMonth());
const monthOfDay = date.getDate();

headerTime.textContent = `${weekDayName}, ${monthOfDay} ${monthName} ${date.getFullYear()}`;

const elemToggler = function (elem) { elem.classList.toggle("active"); }

const addEventOnMultiElem = function (elems, event) {
  for (let i = 0; i < elems.length; i++) {
    elems[i].addEventListener("click", event);
  }
}

const taskItemNode = function (taskText) {

  const createTaskItem = document.createElement("li");
  createTaskItem.classList.add("task-item");
  createTaskItem.setAttribute("data-task-item", "");

  createTaskItem.innerHTML = `
  
    <button class="item-icon" data-task-remove="complete">
      <span class="check-icon"></span>
    </button>

    <p class="item-text">${taskText}</p>

    <button class="item-action-btn" aria-label="Remove task" data-task-remove>
      <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
    </button>

  `;

  return createTaskItem;

}

const taskInputValidation = function (taskIsValid) {
  if (taskIsValid) {

    if (taskList.childElementCount > 0) {
      taskList.insertBefore(taskItemNode(taskInput.value), taskItem[0]);
    } else {
      taskList.appendChild(taskItemNode(taskInput.value));
    }

    taskInput.value = "";

    welcomeNote.classList.add("hide");

    taskItem = document.querySelectorAll("[data-task-item]");
    taskRemover = document.querySelectorAll("[data-task-remove]");

  } else {
    console.log("Lütfen geçerli bir görev giriniz!");
  }
}

const removeWelcomeNote = function () {
  if (taskList.childElementCount > 0) {
    welcomeNote.classList.add("hide");
  } else {
    welcomeNote.classList.remove("hide");
  }
}

const removeTask = function () {

  const parentElement = this.parentElement;

  if (this.dataset.taskRemove === "complete") {

    parentElement.classList.add("complete");
    taskCompleteSound.play();

    setTimeout(function () {
      parentElement.remove();
      removeWelcomeNote();
    }, 250);

  } else {
    parentElement.remove();
    removeWelcomeNote();
  }
}

const addTask = function () {

  taskInputValidation(taskInput.value);

  addEventOnMultiElem(taskRemover, removeTask);

}

taskInput.addEventListener("keypress", function (e) {

  switch (e.key) {
    case "Enter":
      addTask();
      break;
  }

});

const toggleMenu = function () { elemToggler(menu); }
addEventOnMultiElem(menuTogglers, toggleMenu);

const toggleModal = function () { elemToggler(modal); }
addEventOnMultiElem(modalTogglers, toggleModal);

window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

const themeChanger = function () {
  const hueValue = this.dataset.hue;

  document.documentElement.style.setProperty("--hue", hueValue);

  for (let i = 0; i < themeBtns.length; i++) {
    if (themeBtns[i].classList.contains("active")) {
      themeBtns[i].classList.remove("active");
    }
  }

  this.classList.add("active");
}

addEventOnMultiElem(themeBtns, themeChanger);