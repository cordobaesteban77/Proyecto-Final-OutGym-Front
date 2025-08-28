import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginScreen from "./pages/LoginScreen";
import NavbarApp from "./components/NavbarApp";
import PrincipalRoutes from "./routes/PrincipalRoutes.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import NotFoundScreen from "./pages/NotFoundScreen.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ContactoC from "./components/contacto/ContactoC.jsx";
import SolicitarTurnoPage from "./pages/SolicitarTurnoPage.jsx";
import MisClasesUser from "./pages/MisClasesUser.jsx";
import SobreNosotros from "./components/Sobrenosotros.jsx";
import Footer from './components/Footer.jsx'
import PagoExitoso from "./pages/PagoExitoso.jsx";
import PagoFallido from "./pages/PagoFallido.jsx";
import PagoPendiente from "./pages/PagoPendiente.jsx";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavbarApp />
        <Routes>
           <Route path="/adminPage" element={
            <ProtectedRoutes>
              <AdminPage />
            </ProtectedRoutes>
            } />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/about" element={<SobreNosotros />} />
          <Route path="/contact" element={<ContactoC />} />
          <Route path="/solicitarclase" element={<SolicitarTurnoPage/>}/>
          <Route path="/misclases" element={<MisClasesUser/>}/>
          <Route path="*" element={<NotFoundScreen />} />
          <Route path="/pago-exitoso" element={<PagoExitoso />} />
          <Route path="/pago-fallido" element={<PagoFallido />} />
          <Route path="/pago-pendiente" element={<PagoPendiente />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
