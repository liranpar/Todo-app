"use strict";

const STORAGE_KEY = "todosDB";
var gTodos;
var gFilterBy = "ALL";

_createTodos();

function getTodosForDisplay() {
  if (gFilterBy === "ALL") return gTodos;

  return gTodos.filter(
    (todo) =>
      (todo.isDone && gFilterBy === "DONE") ||
      (!todo.isDone && gFilterBy === "ACTIVE")
  );
}

function removeTodo(todoId) {
  const idx = gTodos.findIndex((todo) => todo.id === todoId);
  gTodos.splice(idx, 1);
  _saveTodosToStorage();
}

function toggleTodo(todoId) {
  var todo = gTodos.find((todo) => todo.id === todoId);
  todo.isDone = !todo.isDone;
  _saveTodosToStorage();
}

function addTodo(txt, impoTxt) {
  const todo = _createTodo(txt, impoTxt);
  gTodos.unshift(todo);
  _saveTodosToStorage();
}

function getTodosCount() {
  return gTodos.length;
}

function getActiveTodosCount() {
  const activeTodos = gTodos.filter((todo) => !todo.isDone);
  return activeTodos.length;
}

function setFilter(filterBy) {
  gFilterBy = filterBy;
}

function setSort(sortBy) {
  switch (sortBy) {
    case "TIME":
      gTodos.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      break;
    case "IMPORTANCE":
      gTodos.sort((a, b) => b.importance - a.importance);
      break;
    case "TEXT":
      gTodos.sort((a, b) => {
        var txt1 = a.txt.toUpperCase();
        var txt2 = b.txt.toUpperCase();
        return txt2 > txt1 ? -1 : 1;
      });
      break;
  }
}

function _createTodos() {
  gTodos = loadFromStorage(STORAGE_KEY);
  if (!gTodos || !gTodos.length) gTodos = [];
}

function _createTodo(txt, impoTxt = "1") {
  const todo = {
    id: _makeId(),
    txt: txt,
    isDone: false,
    createdAt: gatCurrentDate(),
    importance: impoTxt,
  };
  return todo;
}

function _makeId(length = 5) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function _saveTodosToStorage() {
  saveToStorage(STORAGE_KEY, gTodos);
}

function gatCurrentDate() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
  var minutes =
    date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  return `${day}/${month} ${hour}:${minutes}`;
}

function getImportance() {}
