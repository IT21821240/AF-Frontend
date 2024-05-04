import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg from '../assets/background.jpeg'

const Login = () => {
  const { setIsLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (password) => {
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)) {
      setPasswordError("Invalid Password");
    } else if (password.length < 10) {
      setPasswordError("Password should consist at least 10 characters");
    }else {
      setPasswordError("");
    }
  };

  const validateEmail = (email) => {
    if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      validateEmail(value);
    } else if (name === 'password') {
      validatePassword(value);
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://af-assignment-2-backend.onrender.com/api/create/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data); // handle successful registration
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn',true);
        localStorage.setItem('user',JSON.stringify(data));
        toast.success("Logged In successfully.");
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error(errorData.error); // handle registration error
        toast.error("Invalid Email or password");
      }
    } catch (error) {
      console.error('Error during logging in:', error);
    }
  };

  return (
    <div className="max-w-auto mx-auto" style={{ backgroundImage: `url(${bg})` }}>
      <div><br/></div>
      <div className="max-w-md mx-auto p-6 bg-gray-300 bg-opacity-50 border border-gray-300 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-5xl font-bold mb-4 text-center">LOGIN</h2>
          <div>
            <label htmlFor="email" className="block text-2xl">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Type your email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${emailError ? 'border-red-500' : ''}`}
              required
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-2xl">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Type your password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${passwordError ? 'border-red-500' : ''}`}
              required
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className='text-center'>
            <a className='text-red-500 text-lg' href="/register">Don't Have an account? Register</a>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-300">Login</button>
          </div>
        </form>
      </div>
      <div><br/><br/></div>
    </div>
  );  
};

export default Login;
