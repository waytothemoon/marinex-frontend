// material-ui
import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TABLE ROW ||============================== //

export default function TableBody(theme: Theme) {
  const hoverStyle = {
    '&:hover': {
      backgroundColor: '#00000040'
    }
  };

  return {
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            '&:nth-of-type(odd)': {
              backgroundColor: '#FFFFFF20',
              borderRadius: '16px'
            },
            ...hoverStyle
          }
        }
      }
    }
  };
}
