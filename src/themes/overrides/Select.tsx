// material-ui
import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - SELECT ||============================== //

export default function Tab(theme: Theme) {
  return {
    MuiSelect: {
      styleOverrides: {
        root: {
          '& svg': {
            fill: theme.palette.primary.main
          }
        }
      }
    }
  };
}
