import { useState } from 'react'
import Footer from './components/footer.jsx'


  
import SobreNosotros from './components/Sobrenosotros.jsx'


  
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundScreen from "./pages/NotFoundScreen";
import LoginScreen from "./pages/LoginScreen";
import NavbarApp from "./components/NavbarApp";
import Footer from './components/footer.jsx';
const App = () => {
  return (
    <>
      <BrowserRouter>
      <NavbarApp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
        <Footer/>
      </BrowserRouter>

    </>
  );
};

export default App;
