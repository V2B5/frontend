import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import api from '../api/api';

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 10,
  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
  marginBottom: '20px',
  padding: '20px',
  overflow: 'hidden',
});

const Grafico = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get('/eventos');
        setEventos(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error.response || error.message);
      }
    };
    fetchEventos();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.async = true;
    script.onload = () => {
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(drawVisualization);
    };
    document.body.appendChild(script);

    const drawVisualization = () => {
      const eventosPorMes = calcularEventosPorMes(eventos);

      const data = new window.google.visualization.DataTable();
      data.addColumn('string', 'Mês');
      data.addColumn('number', 'Eventos');

      eventosPorMes.forEach(item => {
        data.addRow([item.mes, item.total]);
      });

      const options = {
        title: 'Quantidade de Eventos por Mês',
        vAxis: { 
          title: 'Eventos',
          viewWindow: {
            max: 5,
          }
        },
        hAxis: { title: 'Mês' },
        legend: { position: 'none' },
        colors: ['#1d324f'],
        lineWidth: 2,
        pointSize: 5,
      };

      const chart = new window.google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    };
  }, [eventos]);

  const calcularEventosPorMes = (eventos) => {
    const eventosPorMes = {};

    eventos.forEach(evento => {
      const data = new Date(evento.data);
      const mesAno = `${data.getFullYear()}-${data.getMonth() + 1}`; // Formato YYYY-MM para fácil ordenação
      if (!eventosPorMes[mesAno]) {
        eventosPorMes[mesAno] = { mes: `${data.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })}`, total: 0 };
      }
      eventosPorMes[mesAno].total++;
    });

    const eventosPorMesArray = Object.values(eventosPorMes);
    eventosPorMesArray.sort((a, b) => {
      const [anoA, mesA] = a.mes.split(' ');
      const [anoB, mesB] = b.mes.split(' ');
      return (anoA - anoB) || (new Date(`${mesA} 1, ${anoA}`).getMonth() - new Date(`${mesB} 1, ${anoB}`).getMonth());
    });

    return eventosPorMesArray;
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">Eventos por Mês</Typography>
        <div id="chart_div" style={{ width: '100%', height: '400px' }}></div>
      </CardContent>
    </StyledCard>
  );
};

export default Grafico;
