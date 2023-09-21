/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * const logoDark = 'assets/images/logo-dark.svg';
 * const logo = 'assets/images/logo.svg';
 *
 */

import { useTheme } from '@mui/material';

// ==============================|| LOGO SVG ||============================== //

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  const theme = useTheme();
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <Image src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="Mantis" width={118} height={35} />
     *
     */
    <>
      <svg width="118" height="35" viewBox="0 0 118 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text fill={theme.palette.text.primary} fontSize={30} x="0" y="35">
          Marinex
        </text>
      </svg>
    </>
  );
};

export default LogoMain;
