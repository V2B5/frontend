/*
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaHome, FaBars, FaUser, FaCheck} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { BsBuildings } from "react-icons/bs";
import { MdEvent } from "react-icons/md";
import { Drawer, IconButton, AppBar, Toolbar } from '@mui/material';
import api from '../api/api';
import logo from '../../assets/softinsabranco.svg';
import './sidebar.css';
import Swal from 'sweetalert2';
import ContadorNotificacoes from '../utils/contadorNotificacoes';
import AvatarImagem from '../utils/avatarImagem';

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [utilizador, setUtilizador] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchUtilizador = async () => {
      try {
        const response = await api.get('/utilizador/completo');
        setUtilizador(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao encontrar utilizador:', error);
      }
    };
    fetchUtilizador();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Pretende terminar a sua sessão?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
      confirmButtonColor: '#1D324F',
      denyButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('recoveryToken');
        sessionStorage.removeItem('recoveryToken');
        window.location.href = '/login';
      } else if (result.isDenied) {
        Swal.fire('Sessão não terminada', '', 'info');
      }
    });
  };

  return (
    <div>
      <div style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: '5px' }} onMouseEnter={handleDrawerOpen} />
      <AppBar position="static" style={{ backgroundColor: "#1D324F", boxShadow: "none", height: "64px" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <img src={logo} alt="Logo" style={{ width: "150px", height: "100%", objectFit: "contain" }} />
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <FaBars />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose} style={{ boxShadow: 'none' }}>
        <div className="menu" style={{ width: "300px", backgroundColor: "#1D324F", height: "100vh", color: "white", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: "5%" }}>
          <div>
            <img src={logo} alt="Logo" className="logo img-fluid mx-auto d-block mb-3" />
            <NavLink className={location.pathname === "/" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/" onClick={handleDrawerClose}>
              <FaHome className='icone' /> Homepage
            </NavLink>
            <NavLink className={location.pathname === "/calendario" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/calendario" onClick={handleDrawerClose}>
              <FaCalendarAlt className='icone' /> Calendário
            </NavLink>
            <NavLink className={location.pathname === "/utilizadores" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/utilizadores" onClick={handleDrawerClose}>
              <FaUser className='icone' /> Utilizadores
            </NavLink>
            <NavLink className={location.pathname === "/estabelecimentos" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/estabelecimentos" onClick={handleDrawerClose}>
              <BsBuildings className='icone' /> Estabelecimentos
            </NavLink>
            <NavLink className={location.pathname === "/eventos" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/eventos" onClick={handleDrawerClose}>
              <MdEvent className='icone' /> Eventos
            </NavLink>
            <NavLink className={location.pathname === "/notificacoes" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/notificacoes" onClick={handleDrawerClose}>
              <ContadorNotificacoes className='icone' /> Notificações
            </NavLink>
            <NavLink className={location.pathname === "/validacao" ? "menu-item text-white d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/validacao" onClick={handleDrawerClose}>
              <FaCheck className='icone' /> Validações
            </NavLink>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {utilizador && (
              <NavLink 
                className={location.pathname === "/perfil" ? "menu-item text-white d-block text-start active" : "menu-item text-white mt-5 d-block text-start"} 
                to="/perfil" 
                onClick={handleDrawerClose}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'auto'}}>
                  <AvatarImagem
                    src={utilizador.id_google != null ? utilizador.foto : `${process.env.REACT_APP_API_URL}/uploads/utilizador/${utilizador.foto}`}
                    alt={utilizador.nome} 
                    sx={{ width: 30, height: 30, marginRight: 1.4}}
                  />
                  <span>{utilizador.nome}</span>
                </div>
              </NavLink>
            )}
            <div className="menu-item text-white mb-1 mt-1 d-block text-start logout-button" onClick={handleLogout} role="button">
              <CiLogout className='icone'/> Terminar Sessão
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
*/

import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaSignOutAlt, FaBuilding } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { GiHamburgerMenu, GiCalendar } from "react-icons/gi";
import { MdEventAvailable, MdVerifiedUser, MdNotifications } from "react-icons/md";
import { Drawer, IconButton, AppBar, Toolbar } from '@mui/material';
import api from '../api/api';
import logo from '../../assets/softinsabranco.svg';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import './sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/utilizador/completo');
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Deseja sair?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
      confirmButtonColor: '#007bff',
      denyButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login';
      }
    });
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#007bff", boxShadow: "none", height: "64px" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <img src={logo} alt="Logo" style={{ width: "150px", height: "100%", objectFit: "contain" }} />
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <GiHamburgerMenu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={open} onClose={handleDrawerClose} style={{ boxShadow: 'none' }}>
        <div className="menu" style={{ width: "280px", backgroundColor: "#007bff", height: "100vh", color: "white", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: "5%" }}>
          <div>
            <img src={logo} alt="Logo" className="logo img-fluid mx-auto d-block mb-3" />
            <NavLink className={location.pathname === "/" ? "menu-item text-white mb-3 d-block text-start active" : "menu-item text-white mb-3 d-block text-start"} to="/" onClick={handleDrawerClose}>
              <FaHome className='icon' /> Home
            </NavLink>
            <NavLink className={location.pathname === "/utilizadores" ? "menu-item text-white mb-3 d-block text-start active" : "menu-item text-white mb-3 d-block text-start"} to="/utilizadores" onClick={handleDrawerClose}>
              <FaUsers className='icon' /> Utilizadores
            </NavLink>
            <NavLink className={location.pathname === "/estabelecimentos" ? "menu-item text-white mb-3 d-block text-start active" : "menu-item text-white mb-3 d-block text-start"} to="/estabelecimentos" onClick={handleDrawerClose}>
              <FaBuilding className='icon' /> Estabelecimentos
            </NavLink>
            <NavLink className={location.pathname === "/eventos" ? "menu-item text-white mb-3 d-block text-start active" : "menu-item text-white mb-3 d-block text-start"} to="/eventos" onClick={handleDrawerClose}>
              <MdEventAvailable className='icon' /> Eventos
            </NavLink>
            <NavLink className={location.pathname === "/calendario" ? "menu-item text-white mb-3 d-block text-start active" : "menu-item text-white mb-3 d-block text-start"} to="/calendario" onClick={handleDrawerClose}>
              <FaCalendarDays className='icon' /> Calendário
            </NavLink>
            <NavLink className={location.pathname === "/notificacoes" ? "menu-item text-white mb-3 d-block text-start active" : "menu-item text-white mb-3 d-block text-start"} to="/notificacoes" onClick={handleDrawerClose}>
              <MdNotifications className='icon' /> Notificações
            </NavLink>
            <NavLink className={location.pathname === "/validacao" ? "menu-item text-white d-block text-start active" : "menu-item text-white mb-3 d-block text-start"} to="/validacao" onClick={handleDrawerClose}>
              <MdVerifiedUser className='icon' /> Validações
            </NavLink>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {user && (
              <NavLink className={location.pathname === "/perfil" ? "menu-item text-white d-block text-start active" : "menu-item text-white mt-3 d-block text-start"} to="/perfil" onClick={handleDrawerClose}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={user.foto ? `${process.env.REACT_APP_API_URL}/uploads/utilizador/${user.foto}` : user.id_google ? user.foto : '/default-avatar.png'} alt={user.nome} style={{ marginRight: '10px' }} />
                  <span>{user.nome}</span>
                </div>
              </NavLink>
            )}
            <div className="menu-item text-white mb-1 mt-1 d-block text-start logout-button" onClick={handleLogout} role="button">
              <FaSignOutAlt className='icon' /> Terminar sessão
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;

