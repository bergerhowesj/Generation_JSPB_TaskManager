import { TaskManager } from "./TaskManager.js";

window.addEventListener("load", () => {
  populateArray()
  renderRetrievedTasks();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm() ? extractData() : null
    
    // getAllTasks();
  });
});

// the Date and Time Functionality

function clockTick() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, "0");
  let min = String(today.getMinutes()).padStart(2, "0");
  let ss = String(today.getSeconds()).padStart(2, "0");
  let dateSpan = document.getElementById("dateSpan");
  let time = `${hh}:${min}:${ss}`;
  today = `${dd}-${mm}-${yyy}`;
  dateSpan.innerHTML = `<strong>Date:</strong> ${today} |
   <strong>Time:</strong> ${time}`;

  let dateSpanMobile = document.getElementById("dateSpanMobile");
  dateSpanMobile.innerHTML = `<strong>Date:</strong> ${today} |
   <strong>Time:</strong> ${time}`;
}

setInterval(clockTick, 1000);

//All the lets in the house
let taskName = document.getElementById("taskName");
let assignedTo = document.getElementById("assignedTo");
let form = document.getElementById("form");
let setStatus = document.getElementById("setStatus");
let errorElement = document.getElementById("errorMsg");
let description = document.getElementById("description");
var modal = document.getElementById("form");
var btn = document.getElementById("myBtn");
var span = document.getElementById("closebtn");
let dueDate = document.getElementById("dueDate");
let formDelete = document.getElementById("formDelete");
let closebtnedit = document.getElementById("closebtnedit");
let card1 = document.getElementsByClassName("card1");
let toDoItems = [];
let inProgressItems = [];
let reviewItems = [];
let doneItems = [];
let modalBtn = document.getElementById("modalBtn");
let cardsToDo = document.getElementById("cardsToDo");
let cardsinProgress = document.getElementById("cardsinProgress");
let cardsReview = document.getElementById("cardsReview");
let cardsDone = document.getElementById("cardsDone");
let modalOverlay = document.getElementById("modalOverlay");
let mobileAddTaskBtn = document.getElementById("addTaskBtnMobile");
let modalBtnDone = document.getElementById("modalBtnDone");
let taskNameEdit = document.getElementById("taskNameEdit");
let assignedToEdit = document.getElementById("assignedToEdit");
let dueDateEdit = document.getElementById("dueDateEdit");
let descriptionEdit = document.getElementById("descriptionEdit");
let setStatusEdit = document.getElementById("setStatusEdit");
let modalBtnDel = document.getElementById("modalBtnDel");
let uniqueID = document.getElementById('uniqueID');

//Click events
btn.onclick = function () {
  modal.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
};
span.onclick = function () {
  modal.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";
};
closebtnedit.onclick = function () {
  formDelete.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";
};
mobileAddTaskBtn.onclick = function () {
  modal.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
};



//Validating the form fields


function validateForm(){
  let messages = [];
  if (taskName.value === "") {
    messages.push("Task Name is Required");
  }
  if (taskName.value.length < 8) {
    messages.push("Task Name must be longer than 8 characters");
  }
  if (assignedTo.value == "") {
    messages.push("Task must be assigned");
  }
  if (setStatus.value == "") {
    messages.push("Please set a status.");
  }
  if (dueDate.value === "") {
    messages.push("Please set a due date");
  }
  if (description.value.length < 20) {
    messages.push("Please write a description of at least 20 characters");
  }
  if (messages.length > 0) {
    errorElement.innerText = messages.join(". ");
  } else {
    errorElement.innerText = messages;
    return true;
  }
};

//Grey out past dates- making only future dates clickable
dueDate.addEventListener("click", function () {
  let today = new Date();
  let dateToday = String(today.getDate()).padStart(2, "0");
  let monthToday = String(today.getMonth() + 1).padStart(2, "0");
  let yearToday = today.getFullYear();
  let minDate = `${yearToday}-${monthToday}-${dateToday}`;
  dueDate.min = minDate;
});

function resetFormClearModal() {
  form.reset();
  modal.style.display = "none";
  modalOverlay.style.opacity = "1";
  modalOverlay.style.backgroundColor = "transparent";
}

let latestID = [Math.max(localStorage.length)];

// console.log(localStorage.length)
function extractData() {
  let ourNewTask = new TaskManager(
    taskName.value,
    assignedTo.value,
    dueDate.value,
    setStatus.value,
    description.value,
  );
  let card;

  if (setStatus.value === "modalToDo") {
    card = `<div id="${ourNewTask.id}">
            <span><img src="./Resources/redbox.png" alt=""></span>
            <h3 class="cardTitle"> ${ourNewTask.newTaskName} </h3>
            <p class="taskDescriptionText"> ${ourNewTask.newAddDescription} </p>
            <img class= "profileCard" src="./Resources/ProfileUser1.png">
            <hr>
            <p class="dueDateText"><strong>DUE:</strong><span>${ourNewTask.newDueDate}</span></p></div>`;
    toDoItems.push(ourNewTask);
    ourNewTask.render(card, cardsToDo, ourNewTask);
    resetFormClearModal();
    // console.log(toDoItems);
  }
  if (setStatus.value === "modalInProgress") {
    card = `<div id="${ourNewTask.id}">
            <span><img src="./Resources/yellowbox.png" alt=""></span>
            <h3 class="cardTitle"> ${ourNewTask.newTaskName} </h3>
            <p class="taskDescriptionText"> ${ourNewTask.newAddDescription} </p>
            <img class= "profileCard" src="./Resources/ProfileUser1.png">
            <hr>
            <p class="dueDateText"><strong>DUE:</strong><span>${ourNewTask.newDueDate}</span></p></div>`;
    inProgressItems.push(ourNewTask);
    ourNewTask.render(card, cardsinProgress, ourNewTask);
    resetFormClearModal();
  }
  if (setStatus.value === "modalReview") {
    card = `<div id="${ourNewTask.id}">
            <span><img src="./Resources/bluebox.png" alt=""></span>
            <h3 class="cardTitle"> ${ourNewTask.newTaskName} </h3>
            <p class="taskDescriptionText"> ${ourNewTask.newAddDescription} </p>
            <img class= "profileCard" src="./Resources/ProfileUser1.png">
            <hr>
            <p class="dueDateText"><strong>DUE:</strong><span>${ourNewTask.newDueDate}</span></p></div>`;
    reviewItems.push(ourNewTask);
    ourNewTask.render(card, cardsReview, ourNewTask);
    resetFormClearModal();
  }
  if (setStatus.value === "modalDone") {
    card = `<div id="${ourNewTask.id}">
      <span><img src="./Resources/greenbox.png" alt=""></span>
      <h3 class="cardTitle"> ${ourNewTask.newTaskName} </h3>
      <p class="taskDescriptionText"> ${ourNewTask.newAddDescription} </p>
      <img class= "profileCard" src="./Resources/ProfileUser1.png">
      <hr>
      <p class="dueDateText"><strong>DUE:</strong><span>${ourNewTask.newDueDate}</span></p>
      </div>`
    doneItems.push(ourNewTask);
    ourNewTask.render(card, cardsDone, ourNewTask)
    resetFormClearModal();
  }
}

let retrievedArray = [];
// function getAllTasks(){
//   return retrievedArray;
// }
function populateArray(){
for (let i = 0; i < localStorage.length; i++) {
  let x = JSON.parse(localStorage.getItem(localStorage.key(i)));
  retrievedArray.push(x);
  // console.log(retrievedArray)
}}

function editTasks(a) {
  console.log(a.id)
  formDelete.style.display = "block";
  modalOverlay.style.opacity = "0.3";
  modalOverlay.style.backgroundColor = "gray";
  uniqueID.style.display = 'none';
  taskNameEdit.value = a.newTaskName; //get existing here
  assignedToEdit.value = a.newAssignTo; //get existing here
  dueDateEdit.value = a.newDueDate;
  setStatusEdit.value = a.newSelectStatus;
  descriptionEdit.value = a.newAddDescription;
  uniqueID.value = a.id;

  modalBtnDel.addEventListener("click", () => {
    document.getElementById(a.id).style.display = 'none'
    formDelete.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
    TaskManager.deleteTask(a)
  });

  modalEditBtnSubmit.addEventListener("click", () => {
    formDelete.style.display = "none";
    modalOverlay.style.opacity = "1";
    modalOverlay.style.backgroundColor = "transparent";
    a.newTaskName = taskNameEdit.value;
    a.newAssignTo = assignedToEdit.value;
    a.newDueDate = dueDateEdit.value;
    a.newSelectStatus = setStatusEdit.value;
    a.newAddDescription = descriptionEdit.value;
    TaskManager.saveEdit(a)
    location.reload(true)
  });

  modalBtnDone.addEventListener('click', () => {
    a.newSelectStatus = 'modalDone';
    TaskManager.saveEdit(a)
    location.reload(true)
  })

    if (a.newSelectStatus === "modalDone"){
      modalBtnDone.style.display = 'none'
    } else {
      modalBtnDone.style.display = 'block'
    }


}

function renderRetrievedTasks() {

  for (let i = 0; i < retrievedArray.length; i++) {
    // console.log(retrievedArray[i]);
    let x = retrievedArray[i];
    if (x.newSelectStatus === "modalReview") {
      let card = `<div id="${x.id}"><span><img src="./Resources/bluebox.png" alt=""></span>
              <h3> ${x.newTaskName} </h3>
              <p class="taskDescriptionText"> ${x.newAddDescription} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png">
              <hr>
              <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p></div>`;
      const newDiv = document.createElement("div");
      cardsReview.insertAdjacentElement("beforeend", newDiv);
      newDiv.classList.add("card1");

      newDiv.addEventListener("click", () => {
        editTasks(x), window.scrollTo(0, 0);
      });

      newDiv.innerHTML = card;
    } else if (x.newSelectStatus === "modalToDo") {
      let card = `<div id="${x.id}"><span><img src="./Resources/redbox.png" alt=""></span>
              <h3> ${x.newTaskName} </h3>
              <p class="taskDescriptionText"> ${x.newAddDescription} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png">
              <hr>
              <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p> </div>`;
      const newDiv = document.createElement("div");
      cardsToDo.insertAdjacentElement("beforeend", newDiv);
      newDiv.classList.add("card1");
      newDiv.addEventListener("click", () => {
        editTasks(x), window.scrollTo(0, 0);
      });
      newDiv.innerHTML = card;
    } else if (x.newSelectStatus === "modalDone") {
      let card = `<div id="${x.id}"><span><img src="./Resources/greenbox.png" alt=""></span>
              <h3> ${x.newTaskName} </h3>
              <p class="taskDescriptionText"> ${x.newAddDescription} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png">
              <hr>
              <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p></div>`;
      const newDiv = document.createElement("div");
      cardsDone.insertAdjacentElement("beforeend", newDiv);
      newDiv.classList.add("card1");
      newDiv.addEventListener("click", () => {
        editTasks(x), window.scrollTo(0, 0);
      });
      newDiv.innerHTML = card;
    } else if (x.newSelectStatus === "modalInProgress") {
      let card = `<div id="${x.id}"><span><img src="./Resources/yellowbox.png" alt=""></span>
              <h3> ${x.newTaskName} </h3>
              <p class="taskDescriptionText"> ${x.newAddDescription} </p>
              <img class= "profileCard" src="./Resources/ProfileUser1.png">
              <hr>
              <p class="dueDateText"><strong>DUE:</strong><span>${x.newDueDate}</span></p></div>`;
      const newDiv = document.createElement("div");
      cardsinProgress.insertAdjacentElement("beforeend", newDiv);
      newDiv.classList.add("card1");
      newDiv.addEventListener("click", () => {
        editTasks(x), window.scrollTo(0, 0);
      });
      newDiv.innerHTML = card;
    }
  }
}

export { editTasks }
