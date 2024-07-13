import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import api from '../api/api';

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: 10,
  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
  backgroundColor: '#007bff',
});

const StyledLink = styled(Link)({
  color: '#fff',
  textDecoration: 'underline',
});

const DashboardComentarios = () => {
  const [maisAvaliados, setMaisAvaliados] = useState({
    estabelecimento: null,
    evento: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/estatistica/mais-avaliados');
        const { estabelecimentoMaisAvaliado, eventoMaisAvaliado } = response.data;
        setMaisAvaliados({
          estabelecimento: estabelecimentoMaisAvaliado,
          evento: eventoMaisAvaliado,
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ color: '#fff' }}>Atividades mais avaliadas</Typography>
        {maisAvaliados.estabelecimento ? (
          <Typography variant="body2" sx={{ color: '#fff' }}>
            Estabelecimento mais avaliado:{" "}
            <StyledLink to={`/estabelecimentos/${maisAvaliados.estabelecimento.idEstabelecimento}`}>
              {maisAvaliados.estabelecimento.nome}
            </StyledLink>{" "}
            ({maisAvaliados.estabelecimento.totalAvaliacoes} avaliações)
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: '#fff' }}>Nenhum estabelecimento encontrado.</Typography>
        )}
        {maisAvaliados.evento ? (
          <Typography variant="body2" sx={{ color: '#fff' }}>
            Evento mais avaliado:{" "}
            <StyledLink to={`/eventos/${maisAvaliados.evento.idEvento}`}>
              {maisAvaliados.evento.nome}
            </StyledLink>{" "}
            ({maisAvaliados.evento.totalAvaliacoes} avaliações)
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: '#fff' }}>Nenhum evento encontrado.</Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default DashboardComentarios;
