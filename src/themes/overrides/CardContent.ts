// ==============================|| OVERRIDES - CARD CONTENT ||============================== //

export default function CardContent() {
  return {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20,
          maxWidth: '100%',
          '&:last-child': {
            paddingBottom: 20
          }
        }
      }
    }
  };
}
