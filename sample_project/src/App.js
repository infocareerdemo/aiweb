import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import MyProfile from './Pages/MyProfile';
import SessionTimeOut from './components/SessionTimeOut';

function App() {

  return (
    <div>
      <HashRouter>
        <SessionTimeOut>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/contactUs' element={<ContactUs />} />
            <Route path='/myProfile' element={<MyProfile />} />
          </Routes>
        </SessionTimeOut>
      </HashRouter>
    </div>
  );
}

export default App;
