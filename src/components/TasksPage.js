import React, { useEffect, useState } from 'react';
import '../styles/TasksPage.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Importing the logo image

const TASKS_API_BASE_URL = process.env.REACT_APP_TASKS_SERVICE_URL;

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [selectedTask, setSelectedTask] = useState(null); // For popup

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${TASKS_API_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      } else {
        alert('Failed to load tasks');
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch(`${TASKS_API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      const createdTask = await response.json();
      setTasks([...tasks, createdTask]); // Directly append the new task to the list
      setNewTask({ title: '', description: '' }); // Clear the form fields
    } else {
      alert('Failed to create task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${TASKS_API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setTasks(tasks.filter(task => task.id !== taskId));
    } else {
      alert('Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Assuming you have a login page.
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  return (
    <div className="tasks-container">
      <header className="tasks-header">
        <div className="logo-header">
          <a href="/"><img src={logo} alt="Logo" className="logo" /></a> {/* Adding the logo image */}
          <h1>Task Manager</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <div className="task-creation">
        <div className="overlay">
          <h2 style={{ color: 'white' }}>Create a New Task</h2>
          <form onSubmit={handleCreateTask} className="task-form">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required
            ></textarea>
            <button type="submit" className="create-task-btn">Create Task</button>
          </form>
        </div>
      </div>

      <h2 style={{ color: 'white' }}>Your Tasks</h2>
      {tasks === null || tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task.id} className="task-card" onClick={() => handleCardClick(task)}>
              <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>Delete</button> {/* Moved delete button */}
              <h3>{task.title}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedTask && (
        <div className="task-popup">
          <div className="popup-content">
            <h3>{selectedTask.title}</h3>
            <p>{selectedTask.description}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TasksPage;
