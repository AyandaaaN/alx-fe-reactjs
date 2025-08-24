import { useState } from 'react';
import AddTodoForm from './AddTodoForm.jsx';

const initialTodos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Write tests', completed: true },
  { id: 3, text: 'Ship it', completed: false }
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <AddTodoForm onAdd={addTodo} />

      <ul role="list" style={{ marginTop: 16, display: 'grid', gap: 8, paddingLeft: 18 }}>
        {todos.map((t) => (
          <li key={t.id} role="listitem" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="checkbox"
              aria-label={`toggle-${t.text}`}
              checked={t.completed}
              onChange={() => toggleTodo(t.id)}
            />
            <span
              aria-label={`todo-text-${t.text}`}
              onClick={() => toggleTodo(t.id)}
              style={{ cursor: 'pointer', textDecoration: t.completed ? 'line-through' : 'none' }}
            >
              {t.text}
            </span>
            <button
              aria-label={`delete-${t.text}`}
              onClick={() => deleteTodo(t.id)}
              style={{ marginLeft: 'auto' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
