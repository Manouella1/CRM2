import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      const message = response.data.message || "Registration successful!";
      alert(message);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Om error är ett AxiosError, kan vi komma åt `response`-data
        alert(error.response?.data?.error || "Registration failed");
      } else {
        // Om det är något annat fel, visa ett generellt meddelande
        alert("An unexpected error occurred");
      }
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="register-container">
      <style>{`
        .register-container {
          max-width: 400px;
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
          color: #28a745;
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

        input[type="text"],
        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="password"]:focus {
          outline: none;
          border-color: #28a745;
          box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
        }

        button[type="submit"] {
          width: 100%;
          padding: 0.75rem;
          background-color: #28a745;
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
          background-color: #218838;
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
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Company Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
