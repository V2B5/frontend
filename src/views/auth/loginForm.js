import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/softinsa.svg';
import Swal from 'sweetalert2';
import './login.css';
import api from '../api/api';

function Login({ setIsAutenticado: setAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (token) {
      setAuth(true);
      navigate('/');
    }
  }, [token, navigate, setAuth]);

  useEffect(() => {
    localStorage.setItem('rememberUser', rememberUser);
  }, [rememberUser]);

  const handleLogin = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token, recoveryToken } = response.data;

      if (rememberUser) {
        localStorage.setItem('token', token);
        if (recoveryToken) {
          localStorage.setItem('recoveryToken', recoveryToken);
        }
      } else {
        sessionStorage.setItem('token', token);
        if (recoveryToken) {
          sessionStorage.setItem('recoveryToken', recoveryToken);
        }
      }

      setToken(token);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Login realizado com sucesso',
        icon: 'success',
        confirmButtonColor: '#00B7FF',
        timer: 2000,
      });

      setAuth(true);

      if (recoveryToken) {
        navigate(`/reset-passe?token=${recoveryToken}`);
      } else {
        const userResponse = await api.get('/utilizador');
        const { idPosto } = userResponse.data;
        if (idPosto === null || idPosto === undefined) {
          navigate('/posto');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 400:
            setIsEmailInvalid(true);
            setIsPasswordInvalid(true);
            setEmailError('Preencha todos os campos.');
            setPasswordError('Preencha todos os campos.');
            break;
          case 401:
            if (data.error === 'Conta não verificada.') {
              Swal.fire({
                title: 'Erro!',
                text: data.error,
                icon: 'error',
                confirmButtonColor: '#00b7ff',
              });
            } else if (data.error === 'Utilizador não encontrado') {
              setIsEmailInvalid(true);
              setIsPasswordInvalid(false);
              setEmailError(data.error);
              setPasswordError('');
            } else if (data.error === 'Acesso negado') {
              Swal.fire({
                title: 'Erro!',
                text: 'Login apenas permitido a administradores.',
                icon: 'error',
                confirmButtonColor: '#00B7FF',
              });
            } else {
              setIsEmailInvalid(false);
              setIsPasswordInvalid(true);
              setEmailError('');
              setPasswordError(data.error || 'Email ou senha incorretos.');
            }
            break;
          case 500:
            setIsEmailInvalid(false);
            setIsPasswordInvalid(false);
            setEmailError('');
            setPasswordError('');
            break;
          default:
            setIsEmailInvalid(false);
            setIsPasswordInvalid(false);
            setEmailError('');
            setPasswordError('');
        }
      } else {
        setIsEmailInvalid(false);
        setIsPasswordInvalid(false);
        setEmailError('');
        setPasswordError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="login-container d-flex flex-column align-items-center justify-content-center min-vh-75">
      <header className="header mb-4">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${isEmailInvalid ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              required
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailInvalid(false);
                setEmailError('');
              }}
              placeholder="Email"
              style={{ backgroundColor: '#DCDCDC' }}
            />
            {isEmailInvalid && <div className="invalid-feedback">{emailError}</div>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${isPasswordInvalid ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordInvalid(false);
                setPasswordError('');
              }}
              placeholder="Palavra-passe"
              style={{ backgroundColor: '#DCDCDC' }}
            />
            {isPasswordInvalid && <div className="invalid-feedback">{passwordError}</div>}
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberUser"
                name="rememberUser"
                checked={rememberUser}
                onChange={(e) => setRememberUser(e.target.checked)}
              />
              <label htmlFor="rememberUser" className="form-check-label" style={{ marginLeft: '6px' }}>Manter sessão iniciada</label>
            </div>
          </div>
          <button type="submit" className="btn btn-outline-success w-100 mb-2" id="botaoEntrar">
            Entrar
          </button>
          <Link to="/registar" className="btn btn-outline-success w-100 mb-2" id="botaoEntrar">
            Registrar Conta
          </Link>
          <Link
            to="/recuperar-passe"
            className="btn btn-link text-muted w-100"
            style={{ fontSize: '13px' }}>
            Esqueceu a palavra-passe?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
