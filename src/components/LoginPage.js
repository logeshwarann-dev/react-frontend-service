import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { login } from '../services/authService';
import logo from '../assets/logo.png'; // Assuming you have the logo file in assets

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false); // For showing developer modal
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      alert('Login successful!');
      navigate('/tasks'); // Redirect to the dashboard or wherever needed
    } else {
      const errorMessage = await response.text(); // Get error message from response
      alert(`Login failed: ${errorMessage}`);
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="login-container">
      {/* Updated Header Section with logo and title */}
      <header className="login-header">
        <a href="/"><img src={logo} alt="Task Manager Logo" className="logo" /></a>
        <h1>Task Manager</h1>
      </header>
      <div className="overlay">
        <h1 className="login-title">Login to Your Account</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn login-btn">Login</button>
        </form>
      </div>

      {/* Footer with button to show modal */}
      <footer className="footer">
        <div className="footer-links">
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

export default LoginPage;
