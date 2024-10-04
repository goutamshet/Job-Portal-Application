import React from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      role: '', // Add role field for radio buttons
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
      role: Yup.string().required('Role is required'), // Validation for role
    }),
    onSubmit: async (values) => {
      try {
        // You can use axios here to send the form values to the backend
        const response = await axios.post('http://localhost:5001/api/auth/register', values);
        localStorage.setItem('token',response.data.token);
        console.log('Form submitted successfully:', response.data);
        if(response.data.roleName === 'Job Seeker'){
            navigate('/jobseeker')
        }else(
            navigate('/jobprovider')
        )
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  return (
    <div className="signup-container">
      <form className="card" onSubmit={formik.handleSubmit}>
        <h1 className="signup-title">Sign Up</h1>
        <div className="input-container">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="signup-input"
            value={formik.values.username}
            onChange={formik.handleChange}            
            required
          />
          {formik.touched.username && formik.errors.username ? (
            <div className='error'>{formik.errors.username}</div>
          ) : null}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="signup-input"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='error'>{formik.errors.email}</div>
          ) : null}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="signup-input"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='error'>{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="radio-selector-container">
          <input
            type="radio"
            value="Job Provider"
            name="role" // Use the formik field name here
            id="employer"
            className="radio-selector"
            checked={formik.values.role === 'Job Provider'}
            onChange={formik.handleChange}
          />
          <label htmlFor="employer" className="radio-label">Job Provider</label>

          <input
            type="radio"
            value="Job Seeker"
            name="role" // Use the formik field name here
            id="seeker"
            className="radio-selector"
            checked={formik.values.role === 'Job Seeker'}
            onChange={formik.handleChange}
          />
          <label htmlFor="seeker" className="radio-label">Job Seeker</label>
          {formik.touched.role && formik.errors.role ? (
            <div className='error'>{formik.errors.role}</div>
          ) : null}
        </div>
        <Link className="login-link" to="/jobprovider">
            <button type="submit" className="signup-button">Sign Up</button>
        </Link>
        <div className="account-links">
          <span className="text">Already have an account? &nbsp;</span>
          <Link className="login-link" to="/signin">Log In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
