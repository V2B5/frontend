import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import api from "../api/api";
import CriarEvento from "./EventCreate";
import 'bootstrap/dist/css/bootstrap.min.css';

function EventoList() {
  const [eventos, setEventos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [subareas, setSubareas] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [subareaId, setSubareaId] = useState("");
  const [idPosto, setIdPosto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getAreas = async () => {
      const response = await api.get('/areas');
      setAreas(response.data.data);
    };

    getAreas();
  }, []);

  useEffect(() => {
    const getSubareas = async () => {
      if (areaId) {
        const response = await api.get(`/areas/${areaId}`);
        setSubareas(response.data.data);
        setSubareaId(""); 
      } else {
        setSubareas([]);
      }
    };

    getSubareas();
  }, [areaId]);

  useEffect(() => {
    const getIdPosto = async () => {
      const response = await api.get('/utilizador');
      setIdPosto(response.data.idPosto);
    };
  
    getIdPosto();
  }, []);

  useEffect(() => {
    const getEventos = async () => {
      const params = {};
      if (areaId) {
        params.areaId = areaId;
      }
      if (subareaId) {
        params.subareaId = subareaId;
      }
      if (idPosto) {
        params.idPosto = idPosto;
      }
      console.log('Sending request with params:', params);
      try {
        const response = await api.get(`/eventos`, { params });
        console.log('Received response:', response);
        setEventos(response.data.data);
      } catch (error) {
        console.error('Error fetching eventos:', error.response || error.message);
      }
    };

    if (idPosto !== null) {
      getEventos();
    }
  }, [areaId, subareaId, idPosto]);

  const handleAreaChange = (event) => {
    setAreaId(event.target.value);
    if (event.target.value === "") {
      setSubareaId("");
      setEventos([]);
    }
  };

  const handleSubareaChange = (event) => {
    setSubareaId(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cardStyle = {
    borderRadius: 4,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  };

  return (
    <div className="container">
      <h1 className="text-primary mb-4 fw-bold" align="center">Eventos</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <select className="form-select" value={areaId} onChange={handleAreaChange}>
            <option value="">Todas</option>
            {areas.map((area) => (
              <option value={area.id} key={area.id}>{area.nome}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-select" value={subareaId} onChange={handleSubareaChange} disabled={!areaId}>
            <option value="">Todas</option>
            {subareas.map((subarea) => (
              <option value={subarea.id} key={subarea.id}>{subarea.nome}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {eventos.map((evento) => (
          <div className="col-md-4" key={evento.id}>
            <div className="card" style={cardStyle}>
              <img
                className="card-img-top"
                src={`${process.env.REACT_APP_API_URL}/uploads/eventos/${evento.foto}`}
                alt={evento.titulo}
                style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/eventos/${evento.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {evento.titulo}
                  </Link>
                </h5>
                <p className="card-text">Data: {new Date(evento.data).toLocaleDateString()}</p>
                <p className="card-text">Hora: {evento.hora.split(':').slice(0, 2).join(':')}</p>
                <p className="card-text">Morada: {evento.morada}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Fab aria-label="add" onClick={handleClickOpen} style={{ position: 'fixed', bottom: 35, right: 20, backgroundColor: '#1D324F' }}>
        <AddIcon style={{ color: '#fff' }} />
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Criar Evento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha os campos abaixo para criar um novo evento.
          </DialogContentText>
          <CriarEvento handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EventoList;
