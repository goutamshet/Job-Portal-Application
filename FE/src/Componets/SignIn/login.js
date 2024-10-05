
import { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '' 
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
    }),

    onSubmit: async (values) => {
      try {
        // You can use axios here to send the form values to the backend
        const response = await axios.post('http://localhost:5001/api/auth/login', values);
        localStorage.setItem('token',response.data.token);
        console.log("logged in")
        const role = localStorage.getItem('role')
        if(role === "Job Seeker"){
            navigate('/jobseeker')
        }else if (role === "Job Provider"){
            navigate('/jobprovider')
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

    return (
        <div className="login-container" >
            <form className="card" onSubmit={formik.handleSubmit}>
                <h1 className="login-title">Log In</h1>
                <div className="input-container">
                    <input type="email" 
                        placeholder="Email" 
                        className="login-input" 
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.touched.email && formik.errors.email ? (
                    <div className='error'>{formik.errors.email}</div>
                    ) : null}
                    <input type="password" 
                        placeholder="Password" 
                        className="login-input" 
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.touched.password && formik.errors.password ? (
                    <div className='error'>{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="forgot-password">Forgot password?</div>
                <button className="login-button" type='submit'>Log In</button>
                <div className="account-links">
                    <span className="text">Don't have an account? &nbsp;</span> 
                    <Link className="signup-link" to="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login