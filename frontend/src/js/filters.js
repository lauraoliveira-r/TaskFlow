function filterTasksByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
}

function filterTasksByName(tasks, name) {
    return tasks.filter(task => task.title.toLowerCase().includes(name.toLowerCase()));
}

function filterTasks(tasks, filters) {
    let filteredTasks = [...tasks];

    if (filters.status) {
        filteredTasks = filterTasksByStatus(filteredTasks, filters.status);
    }

    if (filters.name) {
        filteredTasks = filterTasksByName(filteredTasks, filters.name);
    }

    return filteredTasks;
}
