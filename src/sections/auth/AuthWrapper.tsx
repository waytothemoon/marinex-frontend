import { ReactNode, useEffect, useRef, useState } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import Logo from 'components/logo';

// third-party
import WAVES from 'vanta/dist/vanta.waves.min';
import * as THREE from 'three';

interface Props {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }: Props) => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          THREE: THREE,
          el: sectionRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x8c8c9b,
          shininess: 22.0
        })
      );
    }
  }, [vantaEffect]);

  return (
    <Box sx={{ minHeight: '100vh' }} ref={sectionRef}>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        sx={{
          minHeight: '100vh',
          backgroundColor: 'transparent'
        }}
      >
        <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 220px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 80px)' } }}
          >
            <Grid item>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthWrapper;
