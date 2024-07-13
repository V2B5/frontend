import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import api from '../api/api';

const EventoCreate = ({ handleClose }) => {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [morada, setMorada] = useState('');
  const [foto, setFoto] = useState(null);
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState('');
  const [subareas, setSubareas] = useState([]);
  const [subareaId, setSubareaId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getAreas = async () => {
      try {
        const response = await api.get('/areas');
        setAreas(response.data.data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    getAreas();
  }, []);

  useEffect(() => {
    const getSubareas = async () => {
      if (areaId) {
        try {
          const response = await api.get(`/areas/${areaId}`);
          setSubareas(response.data.data);
        } catch (error) {
          console.error('Error fetching subareas:', error);
        }
      } else {
        setSubareas([]);
      }
    };

    getSubareas();
  }, [areaId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('data', data);
    formData.append('hora', hora);
    formData.append('morada', morada);
    formData.append('foto', foto);
    formData.append('areaId', areaId);
    formData.append('subareaId', subareaId);

    try {
      await api.post('/eventos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      handleClose(); // Fecha o modal após o evento ser criado
    } catch (error) {
      console.error('Error creating evento:', error);
      setError('Erro ao criar o evento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Título"
          variant="outlined"
          margin="normal"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <TextField
          fullWidth
          label="Data"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          margin="normal"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <TextField
          fullWidth
          label="Hora"
          type="time"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          margin="normal"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
        <TextField
          fullWidth
          label="Morada"
          variant="outlined"
          margin="normal"
          value={morada}
          onChange={(e) => setMorada(e.target.value)}
        />
        <TextField
          fullWidth
          select
          label="Área"
          variant="outlined"
          margin="normal"
          value={areaId}
          onChange={(e) => setAreaId(e.target.value)}
        >
          <MenuItem value="">Selecionar Área</MenuItem>
          {areas.map((area) => (
            <MenuItem value={area.id} key={area.id}>{area.nome}</MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          select
          label="Subárea"
          variant="outlined"
          margin="normal"
          value={subareaId}
          onChange={(e) => setSubareaId(e.target.value)}
          disabled={!areaId}
        >
          <MenuItem value="">Selecionar Subárea</MenuItem>
          {subareas.map((subarea) => (
            <MenuItem value={subarea.id} key={subarea.id}>{subarea.nome}</MenuItem>
          ))}
        </TextField>
        <input
          accept="image/*"
          type="file"
          onChange={(e) => setFoto(e.target.files[0])}
          style={{ margin: '10px 0' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Criar Evento'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventoCreate;
