"use strict";

function onInit() {
  renderTodos();
}

function onRemoveTodo(ev, todoId) {
  ev.stopPropagation();
  var isSure = confirm("Are you sure?");
  if (!isSure) return;
  removeTodo(todoId);
  renderTodos();
}

function renderTodos() {
  const todos = getTodosForDisplay();
  if (!todos || !todos.length) {
    noTodos();
    return;
  }
  var strHTMLs = todos.map(
    (todo) =>
      `<li class="${todo.isDone ? "done" : ""}" onclick="onToggleTodo('${
        todo.id
      }')"><button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
     <span class="imp${todo.importance}">${todo.importance}</span> | ${
        todo.createdAt
      }  |  ${todo.txt}
        </li>`
  );
  document.querySelector(".todo-list").innerHTML = strHTMLs.join("");
  document.querySelector(".todos-total-count").innerText = getTodosCount();
  document.querySelector(".todos-active-count").innerText =
    getActiveTodosCount();
}

function noTodos() {
  var filterStr =
    gFilterBy === "ALL" ? "" : gFilterBy === "DONE" ? "done" : "actice";
  document.querySelector(
    ".todo-list"
  ).innerHTML = `No ${filterStr} Todos to display 😃`;
}

function onToggleTodo(todoId) {
  toggleTodo(todoId);
  renderTodos();
}

function onAddTodo() {
  const elTxt = document.querySelector("input[name=todoTxt]");
  const elImportance = document.querySelector("input[name=importanceTxt]");
  const txt = elTxt.value;
  const impArr = [1, 2, 3];
  const impoTxt = impArr.includes(+elImportance.value) ? elImportance.value : 1;
  if (!elTxt.value.length || elTxt.value === " ") return;
  addTodo(txt, impoTxt);
  elImportance.value = "";
  elTxt.value = "";
  renderTodos();
}

function onSetFilter(filterBy) {
  setFilter(filterBy);
  renderTodos();
}

function onSortFilter(sortBy) {
  console.log(sortBy);
  setSort(sortBy);
  renderTodos();
}
