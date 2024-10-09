import logo from './logo.svg';
import './App.css';
import Home from './Componets/Home/home';
import Login from './Componets/Login/login';
import SignUp from './Componets/Register/register';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import Employer from './Componets/Employer/employer';
import Seeker from './Componets/Seeker/seeker';
import PostJob from './Componets/Employer/PostJob/post_job';
import Register from './Componets/Register/register';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/jobprovider' element={<Employer/>}/>
          <Route path='/post-job' element={<PostJob/>}/>
          <Route path='/jobseeker' element={<Seeker/>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
