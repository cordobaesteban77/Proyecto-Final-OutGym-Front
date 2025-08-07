import { useState } from "react";
import Footer from "./components/footer.jsx";
import SobreNosotros from "./components/Sobrenosotros.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundScreen from "./pages/NotFoundScreen";
import LoginScreen from "./pages/LoginScreen";
import NavbarApp from "./components/NavbarApp";
import AdminPage from "./pages/AdminPage.jsx";
import ContactoC from "./components/contacto/ContactoC.jsx";
import SolicitarTurnoPage from "./pages/SolicitarTurnoPage.jsx";
import MisClasesUser from "./pages/MisClasesUser.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavbarApp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/about" element={<SobreNosotros />} />
          <Route path="/contact" element={<ContactoC />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="*" element={<NotFoundScreen />} />
          <Route path="/solicitarclase" element={<SolicitarTurnoPage/>}/>
          <Route path="/misclases" element={<MisClasesUser/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
