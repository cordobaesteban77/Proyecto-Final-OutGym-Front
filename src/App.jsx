import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdministrarUsuariosApp from "./components/AdministrarUsuariosApp";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AdministrarUsuariosApp />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
