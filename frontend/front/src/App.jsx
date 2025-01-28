import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePages from './pages/homePrincipal.jsx';
import RegistrationPage from "./pages/regis.jsx";
import Employer from './pages/Employer.jsx';
import StaffWorkerbee from './pages/StaffWorkerBee.jsx';
import CardUser from "./components/card.jsx";

const App = ()=> {
  return(
    <Router>
      <Routes>
      <Route path="/" element={<HomePages />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/empleyer" element={<Employer />} />
      <Route path="/workerbee" element={<StaffWorkerbee/>}/>
      <Route path="/card" element={<CardUser/>}/>
      </Routes>
    </Router>
  );
};



export default App
