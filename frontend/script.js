const apiUrl = "http://localhost:5000/api/tasks";

async function fetchTasks() {
  const res = await fetch(apiUrl);
  const tasks = await res.json();
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const title = document.createElement("span");
    title.innerText = task.title;
    title.onclick = () => toggleComplete(task._id);

    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.onclick = () => deleteTask(task._id);

    li.appendChild(title);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value;
  if (!title) return alert("Task cannot be empty");

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  input.value = "";
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
  fetchTasks();
}

async function toggleComplete(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
  });
  fetchTasks();
}

fetchTasks();