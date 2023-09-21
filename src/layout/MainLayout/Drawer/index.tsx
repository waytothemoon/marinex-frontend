import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';
import Profile from '../Header/HeaderContent/Profile';

import { DRAWER_WIDTH } from 'config';
import { dispatch, useSelector } from 'store';
import { openDrawer } from 'store/reducers/menu';
import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'types/config';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

interface Props {
  window?: () => Window;
}

const ThemeSwitcher = () => {
  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();

  const handleChangeMode = () => {
    onChangeMode(mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);
  };

  return (
    <Tooltip title="Switch theme" placement="top">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="start"
        onClick={handleChangeMode}
        spacing={1}
        color={mode === ThemeMode.DARK ? theme.palette.primary.main : 'white'}
        mx={2}
        borderRadius={2}
        px={2}
        py={1}
        style={{
          cursor: 'pointer',
          border: '1px solid transparent',
          background:
            theme.palette.mode === ThemeMode.DARK
              ? 'radial-gradient(117.73% 99.50% at 8.37% 0.00%, rgba(70, 70, 70) 0%, #141718 100%) padding-box, linear-gradient(160deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.11) 50%, rgba(255, 255, 255, 0.11) 60%, #8470FF80) border-box'
              : '#2A68DF'
        }}
      >
        {mode === ThemeMode.LIGHT && (
          <>
            <svg width="24" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="white">
              <defs></defs>
              <g id="Sun">
                <circle cx="32" cy="32" r="13.55" />
                <path d="M32,4a1.81,1.81,0,0,1,1.81,1.81v4.46a1.81,1.81,0,0,1-3.62,0V5.81A1.81,1.81,0,0,1,32,4Z" />
                <path d="M32,51.92a1.81,1.81,0,0,1,1.81,1.81v4.46a1.81,1.81,0,0,1-3.62,0V53.73A1.81,1.81,0,0,1,32,51.92Z" />
                <path d="M60,32a1.81,1.81,0,0,1-1.81,1.81H53.73a1.81,1.81,0,1,1,0-3.62h4.46A1.81,1.81,0,0,1,60,32Z" />
                <path d="M12.08,32a1.81,1.81,0,0,1-1.81,1.81H5.81a1.81,1.81,0,1,1,0-3.62h4.46A1.81,1.81,0,0,1,12.08,32Z" />
                <path d="M51.8,12.2a1.8,1.8,0,0,1,0,2.56l-3.16,3.15a1.8,1.8,0,0,1-2.55-2.55l3.15-3.16A1.8,1.8,0,0,1,51.8,12.2Z" />
                <path d="M17.91,46.09a1.79,1.79,0,0,1,0,2.55L14.76,51.8a1.81,1.81,0,0,1-2.56-2.56l3.16-3.15A1.79,1.79,0,0,1,17.91,46.09Z" />
                <path d="M51.8,51.8a1.8,1.8,0,0,1-2.56,0l-3.15-3.16a1.8,1.8,0,0,1,2.55-2.55l3.16,3.15A1.8,1.8,0,0,1,51.8,51.8Z" />
                <path d="M17.91,17.91a1.79,1.79,0,0,1-2.55,0L12.2,14.76a1.81,1.81,0,0,1,2.56-2.56l3.15,3.16A1.79,1.79,0,0,1,17.91,17.91Z" />
              </g>
            </svg>
            <Typography>Light</Typography>
          </>
        )}
        {mode === ThemeMode.DARK && (
          <>
            <svg id="moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill={theme.palette.primary.main}>
              <path d="M20.848,27.134A17.853,17.853,0,0,0,41,30.675,17.849,17.849,0,1,1,17.3,7,17.815,17.815,0,0,0,20.848,27.134Z" />
            </svg>
            <Typography>Dark</Typography>
          </>
        )}
      </Stack>
    </Tooltip>
  );
};

const MainDrawer = ({ window }: Props) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={drawerOpen} />, [drawerOpen]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {drawerHeader}
          {drawerContent}
          <ThemeSwitcher />
          <Profile />
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={() => dispatch(openDrawer(!drawerOpen))}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              border: 'none',
              backgroundImage: 'none',
              backgroundColor: theme.palette.background.default,
              boxShadow: 'inherit'
            }
          }}
        >
          {drawerHeader}
          {drawerContent}
          <ThemeSwitcher />
          <Profile />
        </Drawer>
      )}
    </Box>
  );
};

export default MainDrawer;
