import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
declare const alert: (message?: unknown) => void;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {
        data: { token },
      } = await axios.post(":3000/api/login", { email, password });
      localStorage.setItem("token", token);
      // Hantera lyckad inloggning, till exempel lagra token i localStorage
      alert("Login successful!");
      navigate("/customers");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed");
    }
  };
  return (
    <div className="login-container">
      <style>{`
        .login-container {
          max-width: 400px;
          margin-top: 20rem;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-family: Arial, sans-serif;
          color: #333;
          text-align: center;
        }

        h2 {
          font-size: 1.8rem;
          color: #007bff;
          margin-bottom: 1.5rem;
        }

        form div {
          margin-bottom: 1rem;
          text-align: left;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #333;
        }

        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

        input[type="email"]:focus,
        input[type="password"]:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        button[type="submit"] {
          width: 100%;
          padding: 0.75rem;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          margin-top: 1rem;
          transition: background-color 0.3s;
        }

        button[type="submit"]:hover {
          background-color: #0056b3;
        }

        p {
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        a {
          color: #007bff;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don&apos;t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
