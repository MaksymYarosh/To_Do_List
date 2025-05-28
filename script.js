// Load tasks from localStorage when page loads
window.onload = function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.done));
};

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (taskText === "") return;

    addTaskToDOM(taskText, false);
    saveTask(taskText, false);

    input.value = "";
}

function addTaskToDOM(text, done) {
    const li = document.createElement("li");
    li.textContent = text;
    if (done) li.classList.add("done");

    li.addEventListener("click", () => {
        li.classList.toggle("done");
        updateTasksInStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        updateTasksInStorage();
    });

    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
}

function saveTask(text, done) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, done });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTasksInStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.firstChild.textContent, done: li.classList.contains("done") });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
