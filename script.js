const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <button class="complete-btn" data-index="${index}">
                Complete
            </button>

            <button class="delete-btn" data-index="${index}">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

taskList.addEventListener("click", (e) => {

    const index = e.target.dataset.index;

    if(e.target.classList.contains("complete-btn")) {
        tasks[index].completed = !tasks[index].completed;
    }

    if(e.target.classList.contains("delete-btn")) {
        tasks.splice(index, 1);
    }

    saveTasks();
    renderTasks();
});

document.getElementById("allBtn").addEventListener("click", () => {
    renderTasks("all");
});

document.getElementById("activeBtn").addEventListener("click", () => {
    renderTasks("active");
});

document.getElementById("completedBtn").addEventListener("click", () => {
    renderTasks("completed");
});

renderTasks();