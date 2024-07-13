import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import api from '../api/api';

const EditarPerfil = ({ open, onClose, utilizador, onUpdate }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    descricao: '',
    nif: '',
    localidade: '',
    telemovel: '',
    cargo: ''
  });

  useEffect(() => {
    if (utilizador) {
      setFormData({
        nome: utilizador.nome || '',
        email: utilizador.email || '',
        descricao: utilizador.descricao || '',
        nif: utilizador.nif || '',
        localidade: utilizador.localidade || '',
        telemovel: utilizador.telemovel || '',
        cargo: utilizador.cargo || ''
      });
    }
  }, [utilizador]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.put(`/utilizador/${utilizador.id}`, formData);
      if (response.status === 200) {
        onUpdate(formData);
        onClose();
      }
    } catch (error) {
      console.error('Erro ao atualizar utilizador:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Perfil</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="nome"
          label="Nome"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.nome}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="descricao"
          label="Descrição"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.descricao}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="nif"
          label="NIF"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.nif}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="localidade"
          label="Localidade"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.localidade}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="telemovel"
          label="Telemóvel"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.telemovel}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="cargo"
          label="Cargo"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.cargo}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Confirmar Alterações</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarPerfil;
