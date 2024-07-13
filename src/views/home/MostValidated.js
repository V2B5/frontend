/*
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import api from '../api/api';

const DashboardValidacoes = () => {
  const navigate = useNavigate();
  const [numEventosPorValidar, setNumEventosPorValidar] = useState(0);
  const [numEstabelecimentosPorValidar, setnumEstabelecimentosPorValidar] = useState(0);
  const [numAvaliacoesEventosPorValidar, setnumAvaliacoesEventosPorValidar] = useState(0);
  const [numAvaliacoesEstabelecimentosPorValidar, setnumAvaliacoesEstabelecimentosPorValidar] = useState(0);

  useEffect(() => {
    const fetchEventosPorValidar = async () => {
      try {
        const response = await api.get('/eventos/validar');
        if (response.data.success && Array.isArray(response.data.data)) {
          setNumEventosPorValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao procurar eventos para validar:', error);
      }
    };

    const fetchEstabelecimentosPorValidar = async () => {
      try {
        const response = await api.get('/estabelecimentos/validar');
        if (response.data.success && Array.isArray(response.data.data)) {
          setnumEstabelecimentosPorValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao procurar estabelecimentos por validar:', error);
      }
    };

    const fetchAvaliacoesEventosPorValidar = async () => {
      try {
        const response = await api.get('/avaliacao/validar/eventos');
        if (response.data.success && Array.isArray(response.data.data)) {
          setnumAvaliacoesEventosPorValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao procurar avaliações de eventos por validar:', error);
      }
    };

    const fetchAvaliacoesEstabelecimentosPorValidar = async () => {
      try {
        const response = await api.get('/avaliacao/validar/estabelecimentos');
        if (response.data.success && Array.isArray(response.data.data)) {
          setnumAvaliacoesEstabelecimentosPorValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao procurar avaliações de estabelecimentos para validar:', error);
      }
    };

    fetchEventosPorValidar();
    fetchEstabelecimentosPorValidar();
    fetchAvaliacoesEventosPorValidar();
    fetchAvaliacoesEstabelecimentosPorValidar();
  }, []);

  const handleOpen = () => {
    navigate("/validacao");
  };

  const StyledCard = styled(Card)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  });

  return (
    <StyledCard onClick={handleOpen}>
      <CardContent>
        <Typography variant="h6">Validações</Typography>
        <Typography variant="body2">Eventos por validar: {numEventosPorValidar}</Typography>
        <Typography variant="body2">Estabelecimentos por validar: {numEstabelecimentosPorValidar}</Typography>
        <Typography variant="body2">Avaliações de eventos por validar: {numAvaliacoesEventosPorValidar}</Typography>
        <Typography variant="body2">Avaliações de estabelecimentos por validar: {numAvaliacoesEstabelecimentosPorValidar}</Typography>
      </CardContent>
    </StyledCard>
  );
};

export default DashboardValidacoes;
*/

import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import api from '../api/api';

const DashboardValidacoes = () => {
  const navigate = useNavigate();
  const [numEventosPorValidar, setNumEventosPorValidar] = useState(0);
  const [numEstabelecimentosPorValidar, setnumEstabelecimentosPorValidar] = useState(0);
  const [numAvaliacoesEventosPorValidar, setnumAvaliacoesEventosPorValidar] = useState(0);
  const [numAvaliacoesEstabelecimentosPorValidar, setnumAvaliacoesEstabelecimentosPorValidar] = useState(0);

  useEffect(() => {
    const fetchEventosPorValidar = async () => {
      try {
        const response = await api.get('/eventos/validar');
        if (response.data.success && Array.isArray(response.data.data)) {
          setNumEventosPorValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao procurar eventos para validar:', error);
      }
    };

    const fetchEstabelecimentosPorValidar = async () => {
      try {
        const response = await api.get('/estabelecimentos/validar');
        if (response.data.success && Array.isArray(response.data.data)) {
          setnumEstabelecimentosPorValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao procurar estabelecimentos por validar:', error);
      }
    };

    const fetchAvaliacoesEventosPorValidar = async () => {
      try {
        const response = await api.get('/avaliacao/validar/eventos');
        if (response.data.success && Array.isArray(response.data.data)) {
          setnumAvaliacoesEventosPorValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao procurar avaliações de eventos por validar:', error);
      }
    };

    const fetchAvaliacoesEstabelecimentosPorValidar = async () => {
      try {
        const response = await api.get('/avaliacao/validar/estabelecimentos');
        if (response.data.success && Array.isArray(response.data.data)) {
          setnumAvaliacoesEstabelecimentosPorValidar(response.data.data.length);
        }
      } catch (error) {
        console.error('Erro ao procurar avaliações de estabelecimentos para validar:', error);
      }
    };

    fetchEventosPorValidar();
    fetchEstabelecimentosPorValidar();
    fetchAvaliacoesEventosPorValidar();
    fetchAvaliacoesEstabelecimentosPorValidar();
  }, []);

  const handleOpen = () => {
    navigate("/validacao");
  };

  // Define o StyledCard com a cor de fundo #007bff e estilos do botão
  const StyledCard = styled(Card)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10,
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    backgroundColor: "#007bff", // Cor de fundo azul
    color: "white", // Cor do texto
    cursor: "pointer", // Cursor de pointer para indicar que é clicável
    transition: "0.3s", // Transição suave
    '&:hover': {
      backgroundColor: "#0056b3", // Cor de fundo ao passar o mouse
    }
  });

  return (
    <StyledCard onClick={handleOpen}>
      <CardContent>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Validações</Typography>
        <Typography variant="body2">Eventos por validar: {numEventosPorValidar}</Typography>
        <Typography variant="body2">Estabelecimentos por validar: {numEstabelecimentosPorValidar}</Typography>
        <Typography variant="body2">Avaliações de eventos por validar: {numAvaliacoesEventosPorValidar}</Typography>
        <Typography variant="body2">Avaliações de estabelecimentos por validar: {numAvaliacoesEstabelecimentosPorValidar}</Typography>
      </CardContent>
    </StyledCard>
  );
};

export default DashboardValidacoes;
