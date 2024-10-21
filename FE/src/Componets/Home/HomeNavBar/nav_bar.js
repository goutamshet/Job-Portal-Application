import ProtectedRoute from "../../ProtectedRoute/protected-route";
import "./nav_bar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../AuthContext/auth-context";

const NavBar = () => {
  const { isAuthenticated } = useContext(AuthContext);  
  const role = localStorage.getItem('role');


  const navigate = useNavigate();

  const handleClick = (destination) => {
    if (isAuthenticated) {
      if (role === "Job Seeker" && destination === "/jobseeker") {
        navigate(destination); // Redirect to the candidates page
      } else if (role === "Job Provider" && destination === "/jobprovider") {
        navigate(destination);
      } else {
        // Optionally show an alert or some feedback for unauthorized access
        navigate("/login");
      }
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  };

  return (
    <div className="nav-container">
      <div className="home-app-name">LocalJobs</div>
      <div className="pages-link-container">
        <Link to="/" className="link">
          <div className="home-page-link">Home</div>
        </Link>
        <Link to="/" className="link">
          <div className="jobs-page-link">Jobs</div>
        </Link>

       
        <div className="candidates-page-link" onClick={handleClick}>Candidates</div>
        <div className="recruiter-page-link" onClick={handleClick}>Recruiter</div>
         
      </div>
      <div className="signup-login-container">
        <Link to="/login" className="link">
          <div className="login">Login</div>
        </Link>
        <Link to="/register" className="link">
          <div className="register">Register</div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
