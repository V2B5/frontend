import { createTheme } from '@mui/material/styles';

const tema = createTheme({
  palette: {
    primary: {
      main: '#00B7FF',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '10px',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffff',
          color: '#00B7FF',
          borderRadius: '10px',
        },
        cell: {
          color: '#00000',
        },
        columnHeaders: {  
          backgroundColor: '#FFFF',
          color: '#00B7FF',
        },
        footerContainer: {
          backgroundColor: '#FFFF',
        },
      },
    },
  },
});

export default tema;
