import logo from "./logo.svg";
import "./App.css";
import Home from "./Componets/Home/home";
import Login from "./Componets/Login/login";
import SignUp from "./Componets/Register/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employer from "./Componets/Employer/employer";
import Seeker from "./Componets/Seeker/seeker";
import PostJob from "./Componets/Employer/PostJob/post_job";
import Register from "./Componets/Register/register";
import ProtectedRoute from "./Componets/ProtectedRoute/protected-route";
import EmployerProfile from "./Componets/Employer/EmployerProfile/employer-profile";
import { AuthProvider } from "./AuthContext/auth-context";
import SeekerProfile from "./Componets/Seeker/SeekerProfile/seeker-profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/jobprovider"
              element={
                <ProtectedRoute>
                  <Employer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post-job"
              element={
                <ProtectedRoute>
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-job/:jobId"
              element={
                <ProtectedRoute>
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobseeker"
              element={
                <ProtectedRoute>
                  <Seeker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer-profile"
              element={
                <ProtectedRoute>
                  <EmployerProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobseeker-profile"
              element={
                <ProtectedRoute>
                  <SeekerProfile/>
                </ProtectedRoute>
              }
            />
            
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
