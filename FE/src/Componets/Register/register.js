import React from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      roleName: '', // Add role field for radio buttons
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      roleName: Yup.string().required('Role is required'), // Validation for role
    }),
    onSubmit: async (values) => {
      try {
        // You can use axios here to send the form values to the backend
        const response = await axios.post('http://localhost:5001/api/auth/register', values);
        if (response.status === 200) {
          // Show success toast if registration is successful
          toast.success('Registration successful!', {
          });
          // Save token and role to local storage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.role);

          // Navigate to home page or login page after a short delay
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
       if (error.response || error.response.status === 400) {
        // Show error toast with specific message from the backend
        toast.error(error.response.data);
      } else {
        // General error toast if no specific error message is provided
        toast.error('Registration failed. Please try again later');
      }
    }
    },
  });

  return (
    <div className="register-container">
      <form className="card" onSubmit={formik.handleSubmit}>
        <h1 className="register-title">Register    </h1>
        <div className="input-container">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="register-input"
            value={formik.values.username}
            onChange={formik.handleChange}            
          />
          <div className='error'>{formik.errors.username}</div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="register-input"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          
          <div className='error'>{formik.errors.email}</div>
          

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="register-input"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
            <div className='error'>{formik.errors.password}</div>
        </div>

        <div className="radio-selector-container">
          <input
            type="radio"
            value="Job Provider"
            name="roleName" // Use the formik field name here
            id="employer"
            className="radio-selector"
            checked={formik.values.roleName === 'Job Provider'}
            onChange={formik.handleChange}
          />
          <label htmlFor="employer" className="radio-label">Job Provider</label>

          <input
            type="radio"
            value="Job Seeker"
            name="roleName" // Use the formik field name here
            id="seeker"
            className="radio-selector"
            checked={formik.values.roleName === 'Job Seeker'}
            onChange={formik.handleChange}
          />
          <label htmlFor="seeker" className="radio-label">Job Seeker</label>
          {formik.touched.role && formik.errors.roleName ? (
            <div className='error'>{formik.errors.roleName}</div>
          ) : null}
        </div>
        {/* <Link className="login-link" to="/jobprovider">
            
        </Link> */}
        <button type="submit" className="register-button">Register</button>
        <div className="account-links">
          <span className="text">Already have an account? &nbsp;</span>
          <Link className="login-link" to="/login">Log In</Link>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default Register;
