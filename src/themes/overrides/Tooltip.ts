// material-ui
import { Theme } from '@mui/material/styles';
import { ThemeMode } from 'types/config';

// ==============================|| OVERRIDES - TOOLTIP ||============================== //

export default function Tooltip(theme: Theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.mode === ThemeMode.DARK ? 'black' : 'white'
        }
      }
    }
  };
}
