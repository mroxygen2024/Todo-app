import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./styles.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  // Load from local storage on app start
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const savedCompletedTodos = JSON.parse(localStorage.getItem("completedTodos")) || [];
    setTodos(savedTodos);
    setCompletedTodos(savedCompletedTodos);

    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (savedDarkMode !== null) setDarkMode(savedDarkMode);
  }, []);

  // Save to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [todos, completedTodos]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Add a new todo
  const addTodo = (text, dueDate, priority) => {
    const newTodo = {
      text,
      completed: false,
      dueDate,
      priority,
      id: Date.now(),
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle completion
  const toggleComplete = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setCompletedTodos([...completedTodos, todo]);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit todo
  const editTodo = (id, newText, newDueDate, newPriority) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, dueDate: newDueDate, priority: newPriority }
          : todo
      )
    );
  };

  // Delete todo with confirmation
  const deleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  // Filtered todo list
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className={`todo-container ${darkMode ? "dark" : ""}`}>
      <h1>Todo List</h1>
      
      {/* Filters */}
      <div className="filters">
        <button onClick={() => setFilter("all")} title="Show all tasks">All</button>
        <button onClick={() => setFilter("completed")} title="Show completed tasks">Completed</button>
        <button onClick={() => setFilter("pending")} title="Show pending tasks">Pending</button>
      </div>

      {/* Todo Form */}
      <TodoForm addTodo={addTodo} />

      {/* Dark Mode Toggle */}
      <div className="toggle-mode" onClick={() => setDarkMode(!darkMode)} title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        {darkMode ? "🌙" : "☀️"}
      </div>

      {/* Pending Tasks Section */}
      <h2>Pending Tasks</h2>
      <TodoList
        todos={filteredTodos.filter((todo) => !todo.completed)}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />

      {/* Completed Tasks Section */}
      {completedTodos.length > 0 && (
        <div className={`completed-section ${completedTodos.length > 0 ? "active" : ""}`}>
          <h2>Completed Tasks</h2>
          <TodoList
            todos={completedTodos}
            toggleComplete={() => {}}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        </div>
      )}
    </div>
  );
};

export default TodoApp;
