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

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

// Simulação de papéis de usuário
let currentUserRole = 'PO'; // Altere para 'SM' ou 'Dev' para testar

// Simulação de tarefas
let productBacklog = [
  { id: 1, title: "Funcionalidade X", status: "backlog" },
  { id: 2, title: "Melhoria Y", status: "backlog" }
];
let sprintBacklog = [
  { id: 3, title: "Bug Z", status: "sprint" }
];
let doneTasks = [
  { id: 4, title: "Tarefa concluída", status: "done" }
];

// Renderização das listas
function renderScrumBoard() {
  // Product Backlog
  const pbList = document.getElementById('product-backlog-list');
  pbList.innerHTML = '';
  productBacklog.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    // Só PO pode mover para Sprint
    if (currentUserRole === 'PO') {
      const btn = document.createElement('button');
      btn.textContent = 'Mover para Sprint';
      btn.onclick = () => moveToSprint(task.id);
      li.appendChild(btn);
    }
    pbList.appendChild(li);
  });

  // Sprint Backlog
  const sbList = document.getElementById('sprint-backlog-list');
  sbList.innerHTML = '';
  sprintBacklog.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    // Só Dev pode marcar como concluída
    if (currentUserRole === 'Dev') {
      const btn = document.createElement('button');
      btn.textContent = 'Concluir';
      btn.onclick = () => moveToDone(task.id);
      li.appendChild(btn);
    }
    sbList.appendChild(li);
  });

  // Done
  const dList = document.getElementById('done-list');
  dList.innerHTML = '';
  doneTasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    dList.appendChild(li);
  });

  // Exibe papel do usuário
  document.getElementById('user-role').textContent = `Papel: ${currentUserRole}`;
}

function moveToSprint(taskId) {
  const idx = productBacklog.findIndex(t => t.id === taskId);
  if (idx > -1) {
    sprintBacklog.push({ ...productBacklog[idx], status: "sprint" });
    productBacklog.splice(idx, 1);
    renderScrumBoard();
  }
}

function moveToDone(taskId) {
  const idx = sprintBacklog.findIndex(t => t.id === taskId);
  if (idx > -1) {
    doneTasks.push({ ...sprintBacklog[idx], status: "done" });
    sprintBacklog.splice(idx, 1);
    renderScrumBoard();
  }
}

function showAddTaskForm() {
  const title = prompt("Título da tarefa:");
  if (title) {
    const newId = Math.max(0, ...productBacklog.map(t => t.id), ...sprintBacklog.map(t => t.id), ...doneTasks.map(t => t.id)) + 1;
    productBacklog.push({ id: newId, title, status: "backlog" });
    renderScrumBoard();
    renderAddButtons();
  }
}

// Atualize o renderAddButtons para chamar showAddTaskForm
function renderAddButtons() {
  const addTaskBtnContainer = document.getElementById('add-task-btn-container');
  if (currentUserRole === 'PO' || currentUserRole === 'SM') {
    addTaskBtnContainer.innerHTML = '<button onclick="showAddTaskForm()">Adicionar Tarefa</button>';
  } else {
    addTaskBtnContainer.innerHTML = '';
  }

  const addSprintBtnContainer = document.getElementById('add-sprint-btn-container');
  if (currentUserRole === 'PO' || currentUserRole === 'SM') {
    addSprintBtnContainer.innerHTML = '<button onclick="alert(\'Adicionar Sprint (implementar)\')">Adicionar Sprint</button>';
  } else {
    addSprintBtnContainer.innerHTML = '';
  }
}

// Chame renderScrumBoard ao carregar a página principal
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('scrum-board')) {
    renderScrumBoard();
  }
});