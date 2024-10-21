import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        // You can use axios here to send the form values to the backend
        const response = await axios.post(
          "http://localhost:5001/api/auth/login",
          values
        );

        if (response.status === 200) {
          localStorage.setItem("token", response.data.accesstoken);
          localStorage.setItem("role", response.data.user.role);
          localStorage.setItem("userId", response.data.user.id);
          const role = localStorage.getItem("role");
          if (role === "Job Seeker") {
            navigate("/jobseeker");
          } else if (role === "Job Provider") {
            navigate("/jobprovider");
          }
        }
      } catch (error) {
        if (error.response.status === 404) {
          setErrorMessage("User not found. Please register first.");
        } else if(error.response.status === 401) {
          setErrorMessage("Login failed. Please check your email and password.");
        }else{
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    },
  });

  return (
    <div className="login-container">
      <form className="card" onSubmit={formik.handleSubmit}>
        <h1 className="login-title">Log In</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Email"
            className="login-input"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? formik.errors.email : null}
          </div>
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
           <div className="error">
            {formik.touched.password && formik.errors.password ? formik.errors.password : null}
          </div>
        </div>
        <div className="forgot-password">Forgot password?</div>
        <button className="login-button" type="submit">
          Log In
        </button>
        <div className="account-links">
          <span className="text">Don't have an account? &nbsp;</span>
          <Link className="register-link" to="/register">
            Register
          </Link>
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Login;
