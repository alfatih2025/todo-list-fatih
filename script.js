const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const taskList = document.getElementById("task-list");
const tabs = document.querySelectorAll(".tab");
const search = document.getElementById("search");
let tasks = [];
let currentFilter = "all";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = {
    text: taskInput.value,
    date: dateInput.value,
    completed: false
  };
  tasks.push(task);
  renderTasks();
  form.reset();
});
function renderTasks() {
  taskList.innerHTML = "";
  const filtered = tasks.filter(t => {
    if (currentFilter === "pending") return !t.completed;
    if (currentFilter === "completed") return t.completed;
    return true;
  }).filter(t => t.text.toLowerCase().includes(search.value.toLowerCase()));

  filtered.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = t.completed ? "completed" : "";
    li.innerHTML = `
      <div>
        <span>${t.text}</span>
        <small>📅 ${t.date}</small>
      </div>
      <div class="actions">
        <input type="checkbox" ${t.completed ? "checked" : ""}>
        <button>🗑</button>
      </div>
    `;
    li.querySelector("input").addEventListener("change", () => {
      t.completed = !t.completed;
      renderTasks();
    });
    li.querySelector("button").addEventListener("click", () => {
      tasks.splice(i, 1);
      renderTasks();
    });
    taskList.appendChild(li);
  });
}
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilter = tab.dataset.filter;
    renderTasks();
  });
});
search.addEventListener("input", renderTasks);
const clearAll = document.getElementById("clear-all");
clearAll.addEventListener("click", () => {
  if (confirm("Apakah kamu yakin ingin menghapus semua tugas?")) {
    tasks = [];
    renderTasks();
  }
});