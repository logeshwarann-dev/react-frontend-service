import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import TasksPage from './components/TasksPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* Protect /tasks route with PrivateRoute */}
        <Route path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
