"use strict";

// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save todos to localStorage

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Render application todos based on filters

const renderTodos = (todos, filters) => {
  let filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });
  const incompleteTodos = filteredTodos.reduce(
    (acc, item) => acc + !item.completed,
    0
  );
  const todosContainer = document.querySelector("#todos");
  todosContainer.innerHTML = "";

  if (filteredTodos.length > 0) {
    const summary = generateSummaryDOM(incompleteTodos);
    todosContainer.appendChild(summary);

    filteredTodos.forEach((todo) => {
      const todoEl = generateTodoDOM(todo);
      todosContainer.appendChild(todoEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No to-dos to show";
    emptyMessage.classList.add("empty-message");
    todosContainer.appendChild(emptyMessage);
  }
};

// Get the DOM elements for an individual note

const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");

  // Setup todo id
  todoEl.dataset.id = todo.id;

  // Setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;

  // Setup the todo text
  todoText.textContent = todo.text;
  const removeButton = document.createElement("button");
  removeButton.classList.add("button", "button--text");
  // Setup the remove button
  removeButton.textContent = "remove";

  [checkbox, todoText].forEach((el) => containerEl.appendChild(el));
  todoEl.appendChild(containerEl);
  todoEl.appendChild(removeButton);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");
  const plural = incompleteTodos.length === 1 ? "" : "s";
  summary.textContent = `You have ${incompleteTodos} todo${plural} left`;
  return summary;
};

// Remove todo from the list
const removeTodoById = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  console.log(todo);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const newTodo = (text) => {
  return {
    id: self.crypto.randomUUID(),
    text,
    completed: false,
  };
};
