// ==============================|| OVERRIDES - CARD ||============================== //
import { Theme } from '@mui/material/styles';
import { ThemeMode } from 'types/config';

export default function Card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: theme.palette.mode === ThemeMode.DARK ? '#333637' : '#e0e0e0'
        }
      }
    }
  };
}
