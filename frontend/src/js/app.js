// app.js
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    const currentPage = window.location.pathname.split('/').pop();

    switch (currentPage) {
        case 'login.html':
            setupLogin();
            break;
        case 'tasks.html':
            loadTasks();
            break;
        case 'add-task.html':
            setupAddTask();
            break;
        case 'edit-task.html':
            setupEditTask();
            break;
        default:
            redirectToLogin();
    }
}

function redirectToLogin() {
    if (!isUserAuthenticated()) {
        window.location.href = 'pages/login.html';
    }
}

function isUserAuthenticated() {
    // Implement authentication check logic here
    return false; // Placeholder for actual authentication check
}

function setupLogin() {
    // Implement login setup logic here
}

function loadTasks() {
    // Implement task loading logic here
}

function setupAddTask() {
    const form = document.getElementById('add-task-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const date = document.getElementById('task-date').value;
        const time = document.getElementById('task-time').value;
        const category = document.getElementById('task-category').value;

        // Junta data e hora em uma string só, se necessário
        const dueDate = date && time ? `${date} ${time}` : date;

        addTask(title, description, dueDate, category);

        // Redireciona para a lista de tarefas após salvar
        window.location.href = 'tasks.html';
    });
}

function setupEditTask() {
    // Implement edit task setup logic here
}