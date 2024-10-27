import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';
import '../styles/SignUpPage.css';
import logo from '../assets/logo.png'; // Assuming you have a logo image in the assets folder

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await signUp(email, password);

    if (response.ok) {
      alert('Registration successful! Please login.');
      navigate('/login');
    } else {
      const errorMessage = await response.text();
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <a href="/"><img src={logo} alt="Logo" className="logo" /></a>
        <h1>Task Manager</h1>
      </header>

      <div className="overlay">
        <h1 className="signup-title">Create a New Account</h1>
        <form onSubmit={handleSignUp}>
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
          <button type="submit" className="btn signup-btn">Sign Up</button>
        </form>
      </div>

      <footer className="footer">
        <div className="footer-links">
          <button onClick={handleModalToggle}>View Developers</button>
        </div>
      </footer>

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

export default SignUpPage;
