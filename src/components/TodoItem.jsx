import React, { useState } from "react";

const TodoItem = ({ todo, toggleComplete, editTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [newDueDate, setNewDueDate] = useState(todo.dueDate);
  const [newPriority, setNewPriority] = useState(todo.priority);

  const handleSave = () => {
    editTodo(todo.id, newText, newDueDate, newPriority);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
          <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
            <option value="high">🔥 High</option>
            <option value="medium">⚡ Medium</option>
            <option value="low">⏳ Low</option>
          </select>
          <button onClick={handleSave} title="Save changes">Save</button>
        </>
      ) : (
        <>
          <span onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? "✅" : "⭕"} {todo.text} ({todo.priority}) - {todo.dueDate}
          </span>
          <button onClick={() => setIsEditing(true)} title="Edit task">✏️</button>
          <button onClick={() => deleteTodo(todo.id)} title="Delete task">🗑</button>
          {!todo.completed && (
            <button onClick={() => toggleComplete(todo.id)} title="Mark as completed">✔️ Complete</button>
          )}
        </>
      )}
    </li>
  );
};

export default TodoItem;
