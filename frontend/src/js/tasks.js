// tasks.js

let tasks = [];

// Buscar tarefas
async function fetchTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    if (response.ok) {
        tasks = await response.json();
        renderTasks();
    }
}

// Adicionar tarefa
async function addTask(title, description, dueDate, category) {
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate, category })
    });
    if (response.ok) {
        await fetchTasks();
    }
}

// Editar tarefa no backend
async function editTask(id, updatedTask) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
    });
    if (response.ok) {
        await fetchTasks();
    }
}

// Excluir tarefa
async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        await fetchTasks();
    }
}

// Função para filtrar tarefas (opcional, pode ser adaptada)
function filterTasks(filter) {
    let filtered = tasks;
    if (filter.status) {
        filtered = filtered.filter(task => task.status === filter.status);
    }
    if (filter.name) {
        filtered = filtered.filter(task => task.title.includes(filter.name));
    }
    return filtered;
}

// Função para renderizar tarefas na tela
function renderTasks(filterStatus = "") {
    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = '';

    // Agrupar tarefas por data
    const grouped = {};
    tasks.forEach(task => {
        if (filterStatus && task.status !== filterStatus) return;
        const date = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Sem data";
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(task);
    });

    Object.keys(grouped).sort().forEach(date => {
        const dateHeader = document.createElement('li');
        dateHeader.className = 'task-date-header';
        dateHeader.textContent = date;
        lista.appendChild(dateHeader);

        grouped[date].forEach(task => {
            const item = document.createElement('li');
            item.className = 'task-item' + (task.status === 'completed' ? ' completed' : '');

            // Ícone de check
            const check = document.createElement('span');
            check.className = 'check-icon';
            check.innerHTML = task.status === 'completed' ? '✔️' : '⬜';
            check.style.cursor = 'pointer';
            check.onclick = () => toggleTaskStatus(task);

            // Container para título e descrição
            const textContainer = document.createElement('div');
            textContainer.className = 'task-text-container';

            const title = document.createElement('span');
            title.textContent = task.title;
            title.className = 'task-title';

            const descCat = document.createElement('span');
            descCat.textContent = `${task.description || ''} - ${task.category || ''}`;
            descCat.className = 'task-desc-cat';

            textContainer.appendChild(title);
            textContainer.appendChild(descCat);

            // Container para os botões
            const btnContainer = document.createElement('div');
            btnContainer.className = 'task-btn-container';

            const editBtn = document.createElement('button');
            editBtn.textContent = '✏️';
            editBtn.title = 'Editar';
            editBtn.className = 'edit-btn';
            editBtn.onclick = () => window.location.href = `edit-task.html?id=${task.id}`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '🗑️';
            removeBtn.title = 'Remover';
            removeBtn.className = 'remove-btn';
            removeBtn.onclick = () => {
                if (confirm('Deseja remover esta tarefa?')) {
                    deleteTask(task.id);
                }
            };

            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(removeBtn);

            item.appendChild(check); // Adiciona o botão de check
            item.appendChild(textContainer);
            item.appendChild(btnContainer);

            lista.appendChild(item);
        });
    });
}

// Alternar status da tarefa
async function toggleTaskStatus(task) {
    const updated = { ...task, status: task.status === 'completed' ? 'pending' : 'completed' };
    await editTask(task.id, updated);
}

// Filtros por botão
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTasks(btn.dataset.status);
    };
});

// Carregar tarefas ao abrir a página
window.onload = fetchTasks;