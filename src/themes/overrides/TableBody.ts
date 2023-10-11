// material-ui
import { Theme } from '@mui/material/styles';
import { ThemeMode } from 'types/config';

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
              backgroundColor: theme.palette.mode === ThemeMode.DARK ? '#333637' : '#FFFFFF',
              borderRadius: '16px'
            },
            ...hoverStyle
          }
        }
      }
    }
  };
}
