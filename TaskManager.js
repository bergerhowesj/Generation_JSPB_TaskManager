import { editTasks } from './script.js'
//class constructor
class TaskManager {
  static id = 0
  constructor(
    newTaskName,
    newAssignTo,
    newDueDate,
    newSelectStatus,
    newAddDescription,
  ) {
    this.newTaskName = newTaskName;
    this.newAssignTo = newAssignTo;
    this.newDueDate = newDueDate;
    this.newSelectStatus = newSelectStatus;
    this.newAddDescription = newAddDescription;
    this.id = TaskManager.id
    this.storeData()
  }

  storeData(){ 
    let task = {id: ++TaskManager.id, ...this}
    localStorage.setItem(task.id, JSON.stringify(task));
    console.log(task)
  }

  render(card, divToInsert, task){
    const newDiv = document.createElement("div");
    divToInsert.appendChild(newDiv);
    newDiv.classList.add("card1");
    newDiv.addEventListener("click", () => {
      editTasks(task), window.scrollTo(0, 0);
    });
    newDiv.innerHTML = card;
  }

}
export { TaskManager };