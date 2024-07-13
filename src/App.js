/*
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './views/auth/loginForm';
import Registar from './views/auth/registarForm';
import RecuperarPasseForm from './views/auth/recuperarPasseForm';
import NovaPasseForm from './views/auth/novaPasseForm';
import ContaConfirmada from './views/auth/confirmarConta';
import Sidebar from './views/home/sidebar';
import Eventos from './views/eventos/eventos';
import CreateEvent from './views/eventos/EventCreate';
import EstabelecimentoList from './views/estabelecimento/EstablishmentList';
import CriarEstabelecimento from './views/estabelecimento/EstablishmentCreate';
import EstabelecimentoPage from './views/estabelecimento/EstablishmentPage';
import ListaUtilizadores from './views/utilizador/UserList';
import EditarEstabelecimento from './views/estabelecimento/EstablishmentEdit';
import UtilizadorPerfil from './views/utilizador/UserProfile';
import Calendario from './views/calendario/calendario';
import EventPage from './views/eventos/EventPage';
import Notificacoes from './views/notificacao/notificacaoPage';
import Main from './views/home/Main';
import Validacao from './views/validacao/validacao';

const Autenticado = () => (
  <>
    <Sidebar />
    <div style={{padding: '30px' }}> 
      <Outlet />
    </div>
  </>
);

const NaoAutenticado = () => (
  <div>
    <Outlet />
  </div>
);  

function App() {
  const [isAutenticado, setIsAutenticado] = useState(!!localStorage.getItem('token') || !!sessionStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAutenticado(!!localStorage.getItem('token') || !!sessionStorage.getItem('token'));
    };  

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<NaoAutenticado />}>
          <Route path="login" element={<Login setIsAutenticado={setIsAutenticado} />} />
          <Route path="registar" element={<Registar />} />
          <Route path="recuperar-passe" element={<RecuperarPasseForm />} />
          <Route path="reset-passe" element={<NovaPasseForm />} />
          <Route path="verificar-conta" element={<ContaConfirmada />} />
        </Route>

        <Route path="/*" element={isAutenticado ? <Autenticado /> : <Navigate to="/login" replace />}>
          <Route path="/*" element={<Main />} />
          <Route path="eventos" element={<Eventos />} />
            <Route path="eventos/criar" element={<CreateEvent />} />
            <Route path="eventos/:id" element={<EventPage />} />
          <Route path="estabelecimentos" element={<EstabelecimentoList />} />
            <Route path="estabelecimentos/criar" element={<CriarEstabelecimento />} />
            <Route path="estabelecimentos/:id" element={<EstabelecimentoPage/>} />
            <Route path="estabelecimentos/:id/editar" element={<EditarEstabelecimento />} />
          <Route path="utilizadores" element={<ListaUtilizadores />} />
          <Route path="perfil" element={<UtilizadorPerfil />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="notificacoes" element={<Notificacoes />} />
          <Route path="validacao" element={<Validacao />} />
         </Route>
        
        <Route path="*" element={<Navigate to={isAutenticado ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './views/home/sidebar';
import Eventos from './views/eventos/eventos';
import CreateEvent from './views/eventos/EventCreate';
import EstabelecimentoList from './views/estabelecimento/EstablishmentList';
import CriarEstabelecimento from './views/estabelecimento/EstablishmentCreate';
import EstabelecimentoPage from './views/estabelecimento/EstablishmentPage';
import ListaUtilizadores from './views/utilizador/UserList';
import EditarEstabelecimento from './views/estabelecimento/EstablishmentEdit';
import UtilizadorPerfil from './views/utilizador/UserProfile';
import Calendario from './views/calendario/calendario';
import EventPage from './views/eventos/EventPage';
import Notificacoes from './views/notificacao/notificacaoPage';
import Main from './views/home/Main';
import Validacao from './views/validacao/validacao';

const Layout = ({ children }) => (
  <>
    <Sidebar />
    <div className="main-content">
      {children}
    </div>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Main /></Layout>} />
        <Route path="eventos" element={<Layout><Eventos /></Layout>} />
        <Route path="eventos/criar" element={<Layout><CreateEvent /></Layout>} />
        <Route path="eventos/:id" element={<Layout><EventPage /></Layout>} />
        <Route path="estabelecimentos" element={<Layout><EstabelecimentoList /></Layout>} />
        <Route path="estabelecimentos/criar" element={<Layout><CriarEstabelecimento /></Layout>} />
        <Route path="estabelecimentos/:id" element={<Layout><EstabelecimentoPage /></Layout>} />
        <Route path="estabelecimentos/:id/editar" element={<Layout><EditarEstabelecimento /></Layout>} />
        <Route path="utilizadores" element={<Layout><ListaUtilizadores /></Layout>} />
        <Route path="perfil" element={<Layout><UtilizadorPerfil /></Layout>} />
        <Route path="calendario" element={<Layout><Calendario /></Layout>} />
        <Route path="notificacoes" element={<Layout><Notificacoes /></Layout>} />
        <Route path="validacao" element={<Layout><Validacao /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
