import HomePage from "./components/HomePage";
import CSGui from './components/CSGui';
import Gremiurilo from './components/Gremiurilo';
import DeMarvel from './components/DeMarvel';
import "./App.css";
import { Route,  Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/demarvel' element={<DeMarvel/>} />
      <Route path='/gremiurilo' element={<Gremiurilo/>} /> 
      <Route path='/csgui' element={<CSGui/>} /> 
    </Routes>
    
  );
}

export default App;
