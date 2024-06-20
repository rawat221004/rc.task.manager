document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const sortDueDateBtn = document.getElementById('sortDueDate');
    const sortPriorityBtn = document.getElementById('sortPriority');
    const filterPendingBtn = document.getElementById('filterPending');
    const filterCompletedBtn = document.getElementById('filterCompleted');

    let tasks = [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;
        const priority = document.getElementById('priority').value;
        const taskId = new Date().getTime().toString();
        const task = { id: taskId, description, dueDate, priority, status: 'Pending' };
        tasks.push(task);
        renderTasks(tasks);
        taskForm.reset();
    });

    function renderTasks(taskArray) {
        taskList.innerHTML = '';
        taskArray.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.description} - ${task.dueDate} - ${task.priority} - ${task.status}</span>
                <button onclick="updateTask('${task.id}')">Edit</button>
                <button onclick="deleteTask('${task.id}')">Delete</button>
                <button onclick="toggleStatus('${task.id}')">${task.status === 'Pending' ? 'Complete' : 'Undo'}</button>
            `;
            taskList.appendChild(li);
        });
    }

    window.updateTask = (id) => {
        const task = tasks.find(t => t.id === id);
        document.getElementById('description').value = task.description;
        document.getElementById('dueDate').value = task.dueDate;
        document.getElementById('priority').value = task.priority;
        deleteTask(id);
    }

    window.deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks(tasks);
    }

    window.toggleStatus = (id) => {
        const task = tasks.find(t => t.id === id);
        task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
        renderTasks(tasks);
    }

    sortDueDateBtn.addEventListener('click', () => {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        renderTasks(tasks);
    });

    sortPriorityBtn.addEventListener('click', () => {
        const priorityMap = { 'Low': 1, 'Medium': 2, 'High': 3 };
        tasks.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
        renderTasks(tasks);
    });

    filterPendingBtn.addEventListener('click', () => {
        const pendingTasks = tasks.filter(task => task.status === 'Pending');
        renderTasks(pendingTasks);
    });

    filterCompletedBtn.addEventListener('click', () => {
        const completedTasks = tasks.filter(task => task.status === 'Completed');
        renderTasks(completedTasks);
    });
});
