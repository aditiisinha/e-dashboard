import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const [auth, setAuth] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setAuth(null);
    navigate('/signup');
  };

  useEffect(() => {
    const handleAuthChange = () => {
      const user = localStorage.getItem('user');
      setAuth(user ? JSON.parse(user) : null);
    };

    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  return (
    <div className="nav-container">
      <img src={require('./ecommerce.png')} alt="logo" className="logo" />
      {
        auth ? 
          <ul className="nav-ul">
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Products</Link></li>
            <li><Link to="/update">Update Products</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link onClick={logout} to="/signup">Logout ({auth.name})</Link></li>
          </ul>
         : 
          <ul className="nav-ul nav-right">
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        
      }
    </div>
  );
};

export default Nav;