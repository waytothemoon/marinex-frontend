// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/logo';
import useConfig from 'hooks/useConfig';

// types
import { MenuOrientation } from 'types/config';

// ==============================|| DRAWER HEADER ||============================== //

interface Props {
  open: boolean;
}

const DrawerHeader = ({ open }: Props) => {
  const theme = useTheme();

  const { menuOrientation } = useConfig();
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL;

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: isHorizontal ? 'unset' : '60px',
        width: isHorizontal ? { xs: '100%', lg: '424px' } : 'inherit',
        paddingLeft: 3,
        justifyContent: 'flex-start',
        gap: '12px'
      }}
    >
      <Logo isIcon={true} sx={{ width: open ? 'auto' : 40, height: 40 }} />
      <Typography variant="h2" fontFamily={'Cera Pro'} fontWeight={700} fontSize={24}>
        MARINEX
      </Typography>
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
