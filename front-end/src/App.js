import React from 'react';
import './App.css';
import Nav from './Nav';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      const user = localStorage.getItem('user');
      setUser(user ? JSON.parse(user) : null);
    };

    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  return (
    <div>
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={user ? <Navigate to="/products" /> : <Login />} />
            <Route path="/products" element={<h3>Product Listing Component</h3>} />
            <Route path="/add" element={user ? <AddProduct /> : <Navigate to="/" />} />
            <Route path="/update" element={user ? <h3>Update Product Component</h3> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <h3>User Profile</h3> : <Navigate to="/" />} />
            <Route path="/logout" element={<h3>Logout Product Component</h3>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
