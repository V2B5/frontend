import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 10,
  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
  backgroundColor: '#007bff',
});

const Vista = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ color: '#fff' }}>Atividade mais vista</Typography>
        <Typography variant="body2" sx={{ color: '#fff' }}>Conteúdo</Typography>
      </CardContent>
    </StyledCard>
  );
};

export default Vista;
