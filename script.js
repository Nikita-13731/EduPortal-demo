// Smooth scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Secure To‑Do List with localStorage
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

function sanitize(input) {
  const temp = document.createElement('div');
  temp.textContent = input;
  return temp.innerHTML;
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  list.innerHTML = '';
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function addTaskToDOM(text, completed = false) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${sanitize(text)}</span>
    <button onclick="removeTask(this)">❌</button>
  `;
  if (completed) li.classList.add('completed');
  li.addEventListener('click', () => toggleComplete(li));
  list.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  list.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').innerText,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const task = input.value.trim();
  if (!task) return alert('Please enter a valid task!');
  addTaskToDOM(task);
  saveTasks();
  input.value = '';
}

function removeTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

function toggleComplete(li) {
  li.classList.toggle('completed');
  saveTasks();
}

addBtn.addEventListener('click', addTask);
window.addEventListener('load', loadTasks);
