document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const taskCount = document.getElementById('task-count');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // State
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let darkMode = localStorage.getItem('darkMode') === 'true';

    // Initialization
    if (darkMode) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    renderTodos();

    // Event Listeners
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    // Delegate events for dynamic items
    todoList.addEventListener('click', (e) => {
        const item = e.target.closest('.todo-item');
        if (!item) return;

        const id = parseInt(item.dataset.id);

        if (e.target.closest('.delete-btn')) {
            deleteTodo(id, item);
        } else {
            toggleTodo(id);
        }
    });

    clearCompletedBtn.addEventListener('click', clearCompleted);
    themeToggle.addEventListener('click', toggleTheme);

    // Functions
    function renderTodos() {
        todoList.innerHTML = '';

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.id = todo.id;

            li.innerHTML = `
                <div class="todo-content">
                    <div class="checkbox-custom">
                        <i class="fas fa-check"></i>
                    </div>
                    <span class="todo-text">${escapeHtml(todo.text)}</span>
                </div>
                <button class="delete-btn" aria-label="Delete task">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            todoList.appendChild(li);
        });

        updateCount();
    }

    function addTodo() {
        const text = todoInput.value.trim();
        if (text === '') return;

        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
        todoInput.focus();
    }

    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveTodos();
        renderTodos();
    }

    function deleteTodo(id, element) {
        // Add removal animation class
        element.classList.add('removing');

        // Wait for animation to finish before updating state
        element.addEventListener('animationend', () => {
            todos = todos.filter(todo => todo.id !== id);
            saveTodos();
            renderTodos();
        });
    }

    function clearCompleted() {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
    }

    function updateCount() {
        const activeTodos = todos.filter(todo => !todo.completed).length;
        taskCount.textContent = activeTodos;
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        darkMode = !darkMode;
        localStorage.setItem('darkMode', darkMode);

        if (darkMode) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
