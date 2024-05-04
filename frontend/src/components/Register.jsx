import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg from '../assets/background.jpeg'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [fullNameError, setFullNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateFullName = (fullName) => {
    if (!fullName.trim()) {
      setFullNameError('Full Name is required');
    } else {
      setFullNameError('');
    }
  };

  const validatePassword = (password) => {
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)) {
      setPasswordError("Password should contain a lowercase letter, an uppercase letter, a number, and be at least 10 characters long");
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
    
    // Perform validation as the user types
    if (name === 'fullName') {
      validateFullName(value);
    } else if (name === 'password') {
      validatePassword(value);
    } else if (name === 'email') {
      validateEmail(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://af-assignment-2-backend.onrender.com/api/create/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data); // handle successful registration
        toast.success("Registered successfully.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error(errorData.error); // handle registration error
        toast.error("Error In Registering");
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="max-w-auto mx-auto" style={{ backgroundImage: `url(${bg})` }}>
      <div><br/></div>
      <div className="max-w-md mx-auto p-6 bg-gray-300 bg-opacity-50 border border-gray-300 rounded-md">
      <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-5xl font-bold mb-4 text-center">Register</h2>
        <div>
          <label htmlFor="fullName" className="text-2xl block font-medium">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Type your full name"
            value={formData.fullName}
            onChange={handleChange}
            className={`mt-1 p-2 border rounded-md w-full ${fullNameError ? 'border-red-500' : ''}`}
            required
          />
          {fullNameError && <p className="text-red-500">{fullNameError}</p>}
        </div>
        <div>
          <label htmlFor="email" className=" text-2xl block font-medium">Email</label>
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
          <label htmlFor="password" className="text-2xl block font-medium">Password</label>
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
        <div className='text-center '>
          <a className='text-red-500 text-lg' href="/login">Already Have an account? Login</a>
        </div>
      <div className="flex justify-center">
      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-300">Register</button>
    </div>
      </form>
      </div>
      <div><br/></div>
    </div>
  );
};


export default Register
