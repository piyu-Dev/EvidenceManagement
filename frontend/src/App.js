import logo from './logo.svg';
import './App.css'; 
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Form from './components/Form';
import Register from './components/Register';
import Complaints from './components/Complaints';
import Admin from './components/Admin';

function App() {
  return (
   <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/admin' element={<Admin />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/setevidence' element={<Form />} />
        <Route exact path='/complaints' element={<Complaints />} />
      </Routes>
   </>
  );
}

export default App;