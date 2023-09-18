import { ReactElement, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
// material-ui
import { useTheme, styled, Theme } from '@mui/material/styles';
import { Box, Collapse, Dialog, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
// third party
// project import
import Layout from 'layout';
import Page from 'components/Page';
import ChatDrawer from 'sections/apps/chat/ChatDrawer';
import ChatHistory from 'sections/apps/chat/ChatHistory';
import UserAvatar from 'sections/apps/chat/UserAvatar';
import UserDetails from 'sections/apps/chat/UserDetails';

import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import { PopupTransition } from 'components/@extended/Transitions';

import { dispatch, useSelector } from 'store';
import { openDrawer } from 'store/reducers/menu';
import { openSnackbar } from 'store/reducers/snackbar';
import { getUserChats, insertChat } from 'store/reducers/chat';

// assets
import { SendOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

// types
import { History as HistoryProps } from 'types/chat';
import { UserProfile } from 'types/user-profile';
import { useSession } from 'next-auth/react';

const drawerWidth = 320;

const socket: Socket = io(process.env.SHIPFINEX_BACKEND_URL as string);

const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' })(
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter
      }),
      marginLeft: 0
    })
  })
);

const Chat = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState<boolean>(true);
  const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const [emailDetails, setEmailDetails] = useState(false);
  const [user, setUser] = useState<UserProfile>({});
  const { data: sessoin } = useSession();
  const [data, setData] = useState<HistoryProps[]>([]);
  const [currentChattingEmail, setCurrentChattingEmail] = useState<string>();

  const dataFetchedRef = useRef(false);

  const chatState = useSelector((state) => state.chat);

  const handleUserChange = () => {
    setEmailDetails((prev) => !prev);
  };

  const [openChatDrawer, setOpenChatDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setOpenChatDrawer((prevState) => !prevState);
  };

  // handle new message form
  const [message, setMessage] = useState('');
  const textInput = useRef(null);

  const handleOnSend = () => {
    if (message.trim() === '') {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Message required',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    } else {
      const username: string = sessoin?.user?.email as string;
      const d = new Date();
      let to = sessoin?.token.role === 2 ? 'admin' : user?.email;
      const newMessage = {
        from: username,
        to,
        text: message,
        time: d
      };

      socket.emit('newMessage', newMessage);
      dispatch(insertChat(newMessage));

      // const d = new Date();
      // const newMessage = {
      //   from: 'User1',
      //   to: user.name,
      //   text: message,
      //   time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      // };
      // setData((prevState) => [...prevState, newMessage]);
      // dispatch(insertChat(newMessage));
    }
    setMessage('');
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleOnSend();
  };
  // close sidebar when widow size below 'md' breakpoint
  useEffect(() => {
    setOpenChatDrawer(!matchDownSM);
  }, [matchDownSM]);

  // useEffect(() => {
  //   setUser(chatState.user);
  // }, [chatState.user]);

  useEffect(() => {
    setData(chatState.chats);
  }, [chatState.chats]);

  useEffect(() => {
    setLoading(false);
  }, [chatState.users]);

  useEffect(() => {
    // hide left drawer when email app opens
    // setUser({ name: username });
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const role = sessoin?.token.role;
    dispatch(openDrawer(false));
    // dispatch(getUser(1)).then(() => setLoading(false));
    const myEmail: string = sessoin?.user?.email as string;
    if (role === 2) dispatch(getUserChats(myEmail)).then(() => setLoading(false));
    socket.emit('login', sessoin?.user?.email);

    socket.on('messageFromServer', (data: any) => {
      const newMessage = {
        from: data.from,
        to: data.to,
        text: data.text,
        time: data.time
      };

      console.log('current email on chat -->', currentChattingEmail);
      console.log('-->', newMessage.from, user);
      setData((prevState) => [...prevState, newMessage]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    const myEmail: string = sessoin?.user?.email as string;
    if (sessoin?.token.role === 2) dispatch(getUserChats(myEmail));
    else {
      dispatch(getUserChats(user.email));
      socket.emit('currentUser', user.email);
    }
    console.log('current email -->', currentChattingEmail);
    setCurrentChattingEmail(user.email);
    console.log('user changed ->>>', user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) return <Loader />;

  return (
    <Page title="Chat">
      <Stack direction="row" style={{ maxWidth: '100%' }}>
        {sessoin?.token.role !== 2 && <ChatDrawer openChatDrawer={openChatDrawer} handleDrawerOpen={handleDrawerOpen} setUser={setUser} />}
        <Main theme={theme} open={openChatDrawer} sx={{ width: sessoin?.token.role !== 2 ? 'calc(100% - 320px)' : '100%' }}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={emailDetails ? 8 : 12}
              xl={emailDetails ? 9 : 12}
              sx={{
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.shorter + 200
                })
              }}
            >
              <MainCard
                content={false}
                style={{
                  border: '1px solid grey'
                }}
                sx={{
                  bgcolor: 'dark.main',
                  pt: 2,
                  pl: 2,
                  borderRadius: sessoin?.token.role !== 2 && !matchDownLG ? '0 16px 16px 0' : '16px 16px',
                  transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.shorter + 200
                  })
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sx={{ bgcolor: theme.palette.background.paper, pr: 2, pb: 2, borderBottom: `1px solid grey` }}>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {sessoin?.token.role !== 2 && (
                            <IconButton onClick={handleDrawerOpen} color="secondary" size="large">
                              {openChatDrawer ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                            </IconButton>
                          )}

                          <UserAvatar
                            user={{
                              online_status: user.online_status,
                              avatar: user.avatar,
                              name: user.name
                            }}
                          />
                          <Stack>
                            <Typography variant="subtitle1">{user.name}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {user.email}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ bgcolor: theme.palette.background.paper }}>
                    <SimpleBar
                      sx={{
                        overflowX: 'hidden',
                        height: 'calc(100vh - 440px)',
                        minHeight: 240
                      }}
                    >
                      <Box sx={{ pl: 1, pr: 3 }}>
                        <ChatHistory theme={theme} user={user} data={data} />
                      </Box>
                    </SimpleBar>
                  </Grid>
                  <Grid item xs={12} sx={{ pr: 2, pb: 2, pl: 2 }}>
                    <Stack>
                      <TextField
                        inputRef={textInput}
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Your Message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value.length <= 1 ? e.target.value.trim() : e.target.value)}
                        onKeyPress={handleEnter}
                        variant="standard"
                        sx={{
                          pr: 2,
                          '& .MuiInput-root:before': { borderBottomColor: theme.palette.divider }
                        }}
                      />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" sx={{ py: 2, ml: -1 }}></Stack>
                        <IconButton color="primary" onClick={handleOnSend} size="large" sx={{ mr: 1.5 }}>
                          <SendOutlined />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              xl={3}
              sx={{ bgcolor: theme.palette.grey[800], overflow: 'hidden', display: emailDetails ? 'flex' : 'none' }}
            >
              <Collapse orientation="horizontal" in={emailDetails && !matchDownMD}>
                <UserDetails user={user} onClose={handleUserChange} />
              </Collapse>
            </Grid>

            <Dialog TransitionComponent={PopupTransition} onClose={handleUserChange} open={matchDownMD && emailDetails} scroll="body">
              <UserDetails user={user} onClose={handleUserChange} />
            </Dialog>
          </Grid>
        </Main>
      </Stack>
    </Page>
  );
};

Chat.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Chat;
