// material-ui
import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme: Theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          '&:first-of-type': {
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px'
          },
          '&:last-child': {
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px'
          },
          fontSize: '0.875rem',
          fontWeight: 300
        },
        sizeSmall: {
          padding: 8
        },
        head: {
          background: 'transparent',
          fontSize: '0.875rem',
          fontWeight: 500
        },
        footer: {
          fontSize: '0.75rem'
        }
      }
    }
  };
}
