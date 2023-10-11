import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Grid, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';

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
      <Box
        borderRadius={3}
        mx={2}
        p={0.5}
        style={{
          cursor: 'pointer',
          border: '1px solid transparent',
          background:
            theme.palette.mode === ThemeMode.DARK
              ? 'linear-gradient(0deg, #232627, #232627), linear-gradient(0deg, rgba(35, 38, 39, 0.5), rgba(35, 38, 39, 0.5))'
              : '#F0F2F7'
        }}
      >
        <Grid
          container
          alignItems="center"
          maxWidth="100%"
          onClick={handleChangeMode}
          color={mode === ThemeMode.DARK ? theme.palette.primary.main : 'white'}
        >
          <Grid item xs={6}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              py={1}
              bgcolor={mode === ThemeMode.DARK ? 'transparent' : theme.palette.primary.main}
              borderRadius={2.5}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                fill={theme.palette.mode === ThemeMode.DARK ? '#6C7275' : 'white'}
              >
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
              <Typography color={theme.palette.mode === ThemeMode.DARK ? '#6C7275' : 'white'} fontWeight="semibold">
                Light
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              py={1}
              borderRadius={2.5}
              bgcolor={mode === ThemeMode.LIGHT ? 'transparent' : theme.palette.primary.main}
            >
              <svg width="20" height="20" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.5 14.8442C20.1866 15.4382 18.7286 15.7688 17.1935 15.7688C11.4153 15.7688 6.73116 11.0847 6.73116 5.30654C6.73116 3.77135 7.0618 2.3134 7.65577 1C4.02576 2.64163 1.5 6.2947 1.5 10.5377C1.5 16.3159 6.18414 21 11.9623 21C16.2053 21 19.8584 18.4742 21.5 14.8442Z"
                  stroke={theme.palette.mode === ThemeMode.DARK ? 'white' : '#6C7275'}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Typography color={theme.palette.mode === ThemeMode.DARK ? 'white' : '#6C7275'} fontWeight="semibold">
                Dark
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
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
        <MiniDrawerStyled
          variant="permanent"
          open={drawerOpen}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              border: 'none',
              backgroundImage: 'none',
              backgroundColor: theme.palette.background.paper,
              boxShadow: 'none'
            }
          }}
        >
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
