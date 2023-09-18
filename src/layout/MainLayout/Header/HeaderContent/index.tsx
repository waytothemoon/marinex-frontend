// import { useMemo } from 'react';
import { useRouter } from 'next/router';

// material-ui
import { Theme } from '@mui/material/styles';
import { Box, useMediaQuery, Typography } from '@mui/material';

// third-party
import { FormattedMessage } from 'react-intl';

// project import
import Profile from './Profile';
// import Localization from './Localization';
import MobileSection from './MobileSection';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/MainLayout/Drawer/DrawerHeader';

// type
import { MenuOrientation } from 'types/config';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { /*i18n,*/ menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const localization = useMemo(() => <Localization />, [i18n]);

  const { pathname, query } = useRouter();

  const getPageName = () => {
    const pageName = (pathname === '/' ? '/dashboard' : pathname).split('/').findLast(() => true);
    if (pageName === '[projectId]') {
      if (query.projectId === 'add') return 'add-project';
      return 'project-detail';
    }
    if (pageName === '[projectOwnerId]') {
      if (query.projectId === 'add') return 'add-project-owner';
      return 'project-owner-detail';
    }
    if (pageName === '[investorId]') {
      return 'investor-detail';
    }
    return pageName;
  };

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {!downLG && (
        <Typography variant="h3" style={{ width: '100%' }}>
          <FormattedMessage id={getPageName()} />
        </Typography>
      )}
      {/* {!downLG && localization} */}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
