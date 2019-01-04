// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listener
loadEventListeners();

// Load all event listener
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear all task event
  clearBtn.addEventListener('click', clearTask);
  // Filter task
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from Local Storage
function getTasks() {
  taskList.innerHTML = '';
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // create text node and append it to li
    li.appendChild(document.createTextNode(task));
    // create a element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // eslint-disable-next-line quotes
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    // append link to li
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }
  // Create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  // create text node and append it to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create a element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  // eslint-disable-next-line quotes
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  // append link to li
  li.appendChild(link);

  taskList.appendChild(li);
  storeToLocalStorage(taskInput.value);
  taskInput.value = '';
  e.preventDefault();
}

function storeToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure ?')) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(tasks.indexOf(task.previousSibling.textContent), 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask() {
  if (confirm('Are you sure to delete all tasks ?')) {
    // Keyword: innerHTML vs removeChild
    // taskList.innerHTML = '';

    // faster
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    clearLocalStorage();
  }
}

function clearLocalStorage() {
  localStorage.removeItem('tasks');
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) == -1) {
      task.style.display = 'none';
    } else {
      task.style.display = 'block';
    }
  });
}