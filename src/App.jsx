import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundScreen from "./pages/NotFoundScreen";
import LoginScreen from "./pages/LoginScreen";
import NavbarApp from "./components/NavbarApp";

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
      </BrowserRouter>
    </>
  );
};

export default App;
