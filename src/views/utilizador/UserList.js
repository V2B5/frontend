import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import api from '../api/api';
import moment from 'moment';
import 'moment/locale/pt';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListaUtilizadores = () => {
  const [utilizadores, setUtilizadores] = useState([]);
  const [open, setOpen] = useState(false);
  const [postos, setPostos] = useState([]);
  const [form, setForm] = useState({ nome: '', email: '', estado: false, isAdmin: false, idPosto: '' });
  const [isEdit, setIsEdit] = useState(false);

  moment.locale('pt');

  useEffect(() => {
    fetchIdPostoAndUtilizadores();
    fetchPostos();
  }, []);

  const fetchIdPostoAndUtilizadores = async () => {
    try {
      const response = await api.get('/utilizador');
      const idPosto = response.data.idPosto;
      console.log('idPosto:', idPosto);
      fetchUtilizadores(idPosto);
    } catch (error) {
      console.error('Erro ao encontrar idPosto:', error);
    }
  };

  const fetchUtilizadores = async () => {
    try {
      const responsePosto = await api.get('/utilizador');
      const idPosto = responsePosto.data.idPosto;
      const response = await api.get('/utilizador/todos');
      const utilizadores = response.data.filter(user => user.idPosto === idPosto || user.idPosto === undefined || user.idPosto === null);
      setUtilizadores(utilizadores);
    } catch (error) {
      console.error('Erro ao encontrar utilizadores:', error);
    }
  };

  const fetchPostos = async () => {
    try {
      const response = await api.get('/postos');
      setPostos(response.data.data);
    } catch (error) {
      console.error('Erro ao encontrar postos:', error);
    }
  };

  const handleAddOrEdit = async () => {
    try {
      if (isEdit) {
        await api.put(`/utilizador/${form.id}`, form);
      } else {
        await api.post('/utilizador', form);
      }
      fetchUtilizadores();
      setOpen(false);
    } catch (error) {
      console.error('Erro ao adicionar/editar utilizador:', error);
    }
  };

  const handleClickOpen = (user = null) => {
    if (user) {
      setForm(user);
      setIsEdit(true);
    } else {
      setForm({ nome: '', email: '', estado: false, isAdmin: false, idPosto: '' });
      setIsEdit(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 150,
      type: 'boolean',
      renderCell: (params) => (
        params.value ? <ThumbUpAltIcon color="success" /> : <ThumbDownAltIcon color="error" />
      ),
    },
    {
      field: 'isAdmin',
      headerName: 'Admin',
      width: 150,
      type: 'boolean',
      renderCell: (params) => (
        params.value ? <ThumbUpAltIcon color="success" /> : <ThumbDownAltIcon color="error" />
      ),
    },
    {
      field: 'edits',
      headerName: 'Editar',
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleClickOpen(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const rows = utilizadores.map((user) => ({
    ...user,
  }));

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary font-weight-bold mb-4">Gerir Utilizadores</h1>
      <div className="card" style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '8px' }}>
        <div className="card-body">
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            disableSelectionOnClick
            disableColumnMenu
          />
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Editar Utilizador' : 'Adicionar Utilizador'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome"
            type="text"
            fullWidth
            value={form.nome}
            className="mb-4"
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={form.email}
            className="mb-4"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <FormControl fullWidth margin="dense" className="mb-4">
            <InputLabel>Estado</InputLabel>
            <Select
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
            >
              <MenuItem value={true}><ThumbUpAltIcon color="success" /> Ativo</MenuItem>
              <MenuItem value={false}><ThumbDownAltIcon color="error" /> Inativo</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" className="mb-4">
            <InputLabel>Admin</InputLabel>
            <Select
              value={form.isAdmin}
              onChange={(e) => setForm({ ...form, isAdmin: e.target.value })}
            >
              <MenuItem value={true}><ThumbUpAltIcon color="success" /> Sim</MenuItem>
              <MenuItem value={false}><ThumbDownAltIcon color="error" /> Não</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddOrEdit} color="primary">
            {isEdit ? 'Guardar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListaUtilizadores;
