// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import UserList from './UserList';

import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';

// types
import { UserProfile } from 'types/user-profile';

// ==============================|| CHAT DRAWER ||============================== //

interface ChatDrawerProps {
  handleDrawerOpen: () => void;
  openChatDrawer: boolean | undefined;
  setUser: (u: UserProfile) => void;
}

function ChatDrawer({ handleDrawerOpen, openChatDrawer, setUser }: ChatDrawerProps) {
  const theme = useTheme();

  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));

  // show menu to set current user status
  return (
    <Drawer
      sx={{
        width: 320,
        border: matchDownLG ? 'none' : '1px solid grey',
        borderRadius: matchDownLG ? 0 : '16px 0 0 16px',
        overflow: 'hidden',
        flexShrink: 0,
        zIndex: { xs: 1100, lg: 0 },
        '& .MuiDrawer-paper': {
          height: matchDownLG ? 'calc(100% - 60px)' : 'auto',
          top: matchDownLG ? '60px' : 'auto',
          width: 320,
          boxSizing: 'border-box',
          position: 'relative',
          border: 'none'
        }
      }}
      variant={matchDownLG ? 'temporary' : 'persistent'}
      anchor="left"
      open={openChatDrawer}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      <MainCard>
        <Box sx={{ p: 3, pb: 1 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="h5" color="inherit">
                Messages
              </Typography>
              {/* <Chip
                label="9"
                component="span"
                color="secondary"
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  '& .MuiChip-label': {
                    px: 0.5
                  }
                }}
              /> */}
            </Stack>
          </Stack>
        </Box>

        <SimpleBar
          sx={{
            overflowX: 'hidden',
            height: '70vh'
            // height: matchDownLG ? 'calc(100vh - 120px)' : 'calc(100vh - 428px)',
            // minHeight: matchDownLG ? 0 : '70vh'
          }}
        >
          <Box sx={{ p: 3, pt: 0 }}>
            <UserList setUser={setUser} />
          </Box>
        </SimpleBar>
        {/* <Box sx={{ p: 3, pb: 0 }}>
          <List component="nav">
            <ListItemButton divider>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>

              <ListItemText primary="LogOut" />
            </ListItemButton>
            <ListItemButton divider>
              <ListItemIcon>
                <SettingOutlined />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </List>
        </Box> */}
      </MainCard>
    </Drawer>
  );
}

export default ChatDrawer;
