import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const collectData = async () => {
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      let response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        let result = await response.json();
        console.warn(result);

        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(result));

        setSuccess("User registered successfully");
        setError("");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        
        // Navigate to home page after sign up
        navigate('/');
      } else {
        let errorMessage = `Server response was not OK: ${response.status}`;
        if (response.status === 400) {
          errorMessage = "Validation error, please check your input";
        }
        setError(errorMessage);
        setSuccess("");
      }
    } catch (error) {
      console.error('Error occurred during fetch:', error);
      setError("An error occurred while trying to register");
      setSuccess("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    collectData();
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="register">
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        <br />
        <label>Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        <br />
        <label>Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        <br />
        <label>Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUp;
