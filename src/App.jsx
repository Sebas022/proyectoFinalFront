import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import HomeView from './views/HomeView';
import CreateClotheView from './views/createClotheView';
import UpdateClotheView from './views/UpdateClotheView';
import LoginView from './auth/LoginView';

function AppContent() {
  const location = useLocation();

  const noNavbarRoutes = ["/"];

  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <NavBar />}

      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/home" element={<HomeView />} />
        <Route path="/crearprenda" element={<CreateClotheView />} />
        <Route path="/actualizarprenda/:id" element={<UpdateClotheView />} />
        <Route path="/eliminarprenda/:id" element={<HomeView />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
