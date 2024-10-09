
import { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');


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

        if(response.status === 200){
          localStorage.setItem('token',response.data.token);
          toast.success("logged in")
          const role = localStorage.getItem('role')
          if(role === "Job Seeker"){
              navigate('/jobseeker')
          }else if (role === "Job Provider"){
              navigate('/jobprovider')
          }
      }
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.error; // Get error message from backend
          toast.error(errorMessage)
        } else {
          setErrorMessage('Network error. Please check your connection.');
          toast.error(errorMessage)
        }

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
                    />
                    <div className='error'>{formik.errors.email}</div>
                    <input type="password" 
                        placeholder="Password" 
                        className="login-input" 
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <div className='error'>{formik.errors.password}</div>
                </div>
                <div className="forgot-password">Forgot password?</div>
                <button className="login-button" type='submit'>Log In</button>
                <div className="account-links">
                    <span className="text">Don't have an account? &nbsp;</span> 
                    <Link className="register-link" to="/register">Register</Link>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Login