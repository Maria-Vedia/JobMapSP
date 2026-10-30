import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Aspirantes from './pages/Aspirantes.jsx';
import Empresas from './pages/Empresas.jsx';
import Profesiones from './pages/Profesiones.jsx';
import Contacto from './pages/Contacto.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Jobs from './pages/Jobs.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="aspirantes" element={<Aspirantes />} />
        <Route path="empresas" element={<Empresas />} />
        <Route path="profesiones" element={<Profesiones />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
