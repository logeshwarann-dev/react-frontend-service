import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import logo from '../assets/logo.png';

function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <a href="/"><img src={logo} alt="Task Manager Logo" className="logo" /></a>
        <h1>Task Manager</h1>
      </header>
      <div className="overlay">
        <h1 className="home-title">Welcome to Task Manager</h1>
        <p className="home-subtitle">Manage your tasks efficiently and stay productive!</p>
        <div className="auth-buttons">
          <Link to="/login">
            <button className="btn login-btn">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn signup-btn">Sign Up</button>
          </Link>
        </div>
      </div>

      {/* Footer with button to show modal */}
      <footer className="footer">
        <div className="footer-links">
          <a href="https://github.com/logeshwarann-dev/TaskMgrApp" target="_blank" rel="noopener noreferrer">GitHub</a>
          <button onClick={handleModalToggle}>View Developers</button>
        </div>

      </footer>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalToggle}>&times;</span>
            <h2>Developer Team</h2>
            <ul className="dev-list">
              <li>Abhishek Prasad [2023MT03130]</li>
              <li>Achala Rao [2023MT03162]</li>
              <li>B Pavan Kalyan [2023MT03175]</li>
              <li>Logeshwaran N [2023MT03135]</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
