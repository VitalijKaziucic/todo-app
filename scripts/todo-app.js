"use strict";

const todos = getSavedTodos();

const searchTodo = document.querySelector("#search-text");
const todoForm = document.querySelector("#new-todo");
const todosContainer = document.querySelector("#todos");
const hideCompleted = document.querySelector("#hide-completed");

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);

// Listen for search todo change
searchTodo.addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  if (text) {
    todos.push(newTodo(text));
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.text.value = "";
  }
});

hideCompleted.addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});

todosContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const todoId =
    e.target.parentElement?.dataset.id ||
    e.target.parentElement.parentElement.dataset.id;
  let isChanges = false;
  if (e.target.tagName === "BUTTON") {
    removeTodoById(todoId);
    isChanges = true;
  } else if (e.target.getAttribute("type")) {
    toggleTodo(todoId);
    isChanges = true;
  }
  if (isChanges) {
    saveTodos(todos);
    renderTodos(todos, filters);
  }
});
