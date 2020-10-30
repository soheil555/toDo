//Selectors
let todoInput = document.querySelector(".todo-input");
let todoBtn = document.querySelector(".todo-btn");
let todoList = document.querySelector(".todo-list");

//Event Listeners

todoBtn.addEventListener("click", addTodo);

//Functions

function addTodo(event) {
  event.preventDefault();

  //create todo div
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create todo li
  let todoLi = document.createElement("li");
  todoLi.classList.add("todo-item");
  todoLi.innerText = todoInput.value;

  //create completed btn
  let completedBtn = document.createElement("button");
  completedBtn.classList.add("complete-btn");
  completedBtn.innerHTML = "<i class='fas fa-check'></i>";

  //create trash btn
  let trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-btn");
  trashBtn.innerHTML = "<i class='fas fa-trash'></i>";

  //append to todo div
  todoDiv.appendChild(todoLi);
  todoDiv.appendChild(completedBtn);
  todoDiv.appendChild(trashBtn);

  todoList.appendChild(todoDiv);
}
