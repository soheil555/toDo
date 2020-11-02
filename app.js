//Selectors
let todoInput = document.querySelector(".todo-input");
let todoBtn = document.querySelector(".todo-btn");
let todoList = document.querySelector(".todo-list");
let typeSelect = document.querySelector(".filter-todo");
//Event Listeners

document.addEventListener("DOMContentLoaded", getTodosFromLocalStorage);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", trashCompleteTodo);
typeSelect.addEventListener("click", changeType);

//Functions

function addTodo(event) {
  event.preventDefault();

  if (todoInput.value === "" || todoInput.value === null) {
    return;
  }

  //create todo div
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create todo li
  let todoLi = document.createElement("li");
  todoLi.classList.add("todo-item");
  todoLi.innerText = todoInput.value;

  addTodoToLocalStorage(todoInput.value);

  //create completed btn
  let completedBtn = document.createElement("button");
  completedBtn.classList.add("complete-btn");
  completedBtn.innerHTML = "<i class='fas fa-check'></i>";

  //create trash btn
  let trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-btn");
  trashBtn.innerHTML = "<i class='fas fa-trash'></i>";

  todoInput.value = "";

  //append to todo div
  todoDiv.appendChild(todoLi);
  todoDiv.appendChild(completedBtn);
  todoDiv.appendChild(trashBtn);

  todoList.appendChild(todoDiv);
}

function trashCompleteTodo(event) {
  let target = event.target;
  let todo = target.parentElement;
  if (target.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
  } else if (target.classList[0] === "trash-btn") {
    todo.classList.add("fall");
    deleteTodoFromLocalStorage(todo);
    todo.addEventListener("transitionend", function() {
      todo.remove();
    });
  }
}

function changeType(event) {
  let target = event.target;
  let type = target.value;

  let todos = todoList.childNodes;

  todos.forEach(function(todo) {
    switch (type) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function getTodosFromLocalStorage() {
  let todos = localStorage.getItem("todos");
  if (todos === null) {
    todos = [];
  } else {
    todos = JSON.parse(todos);
  }

  todos.forEach(function(todo) {
    //create todo div
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create todo li
    let todoLi = document.createElement("li");
    todoLi.classList.add("todo-item");
    todoLi.innerText = todo;

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
  });
}

function addTodoToLocalStorage(todo) {
  let todos = localStorage.getItem("todos");
  if (todos === null) {
    todos = [];
  } else {
    todos = JSON.parse(todos);
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoFromLocalStorage(todo) {
  let todos = localStorage.getItem("todos");
  if (todos === null) {
    todos = [];
  } else {
    todos = JSON.parse(todos);
  }

  let todoText = todo.childNodes[0].innerText;

  let todoIndex = todos.indexOf(todoText);

  todos.splice(todoIndex, 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
