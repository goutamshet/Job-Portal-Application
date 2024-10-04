import logo from './logo.svg';
import './App.css';
import Home from './Componets/Home/home';
import Login from './Componets/SignIn/login';
import SignUp from './Componets/SignUp/signup';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import Employer from './Componets/Employer/employer';
import Seeker from './Componets/Seeker/seeker';
import PostJob from './Componets/Employer/PostJob/post_job';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<Login/>}/>
          <Route path='/jobprovider' element={<Employer/>}/>
          <Route path='/post-job' element={<PostJob/>}/>
          <Route path='/jobseeker' element={<Seeker/>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
