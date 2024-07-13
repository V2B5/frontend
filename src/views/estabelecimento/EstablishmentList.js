import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import { styled } from "@mui/system";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import api from "../api/api";
import CriarEstabelecimento from './EstablishmentCreate';
import 'bootstrap/dist/css/bootstrap.min.css';

function EstabelecimentoList() {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
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
    const getEstabelecimentos = async () => {
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
        setEstabelecimentos([]);
        const response = await api.get(`/estabelecimentos`, { params });
        console.log('Received response:', response);
        setEstabelecimentos(response.data.data);
      } catch (error) {
        console.error('Error fetching estabelecimentos:', error.response || error.message);
      }
    };

    if (idPosto !== null) {
      getEstabelecimentos();
    }
  }, [areaId, subareaId, idPosto]);

  const handleAreaChange = (event) => {
    setAreaId(event.target.value);
    if (event.target.value === "") {
      setSubareaId("");
      setEstabelecimentos([]);
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

  const CustomButton = styled('div')({
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  });

  const cardStyle = {
    borderRadius: 4,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  };

  return (
    <div className="container">
      <h1 className="text-primary mb-4 fw-bold" align="center">Estabelecimentos</h1>
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
        {estabelecimentos.map((estabelecimento) => (
          <div className="col-md-4" key={estabelecimento.id}>
            <div className="card" style={cardStyle}>
              <img
                className="card-img-top"
                src={`${process.env.REACT_APP_API_URL}/uploads/estabelecimentos/${estabelecimento.foto}`}
                alt={estabelecimento.nome}
                style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/estabelecimentos/${estabelecimento.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {estabelecimento.nome}
                  </Link>
                </h5>
                <p className="card-text">{estabelecimento.morada}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Fab aria-label="add" onClick={handleClickOpen} style={{ position: 'fixed', bottom: 35, right: 20, backgroundColor: '#1D324F' }}>
        <AddIcon style={{ color: '#fff' }} />
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Criar Estabelecimento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha os campos abaixo para criar um novo estabelecimento.
          </DialogContentText>
          <CriarEstabelecimento handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EstabelecimentoList;
