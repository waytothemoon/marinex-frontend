import { forwardRef, useEffect, ForwardRefExoticComponent, RefAttributes } from 'react';

// next
import { useRouter } from 'next/router';
import NextLink from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, Link, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project import
import Dot from 'components/@extended/Dot';
import useConfig from 'hooks/useConfig';
import { dispatch, useSelector } from 'store';
import { activeItem, openDrawer } from 'store/reducers/menu';

// types
import { LinkTarget, NavItemType } from 'types/menu';
import { MenuOrientation, ThemeMode } from 'types/config';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

interface Props {
  item: NavItemType;
  level: number;
}

const NavItem = ({ item, level }: Props) => {
  const theme = useTheme();

  const menu = useSelector((state) => state.menu);
  const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  const { drawerOpen, openItem } = menu;

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  let itemTarget: LinkTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps: {
    component: ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>> | string;
    href?: string;
    target?: LinkTarget;
  } = {
    component: forwardRef((props, ref) => (
      <NextLink href={item.url!} passHref legacyBehavior ref={ref}>
        <Link {...props} target={itemTarget} />
      </NextLink>
    ))
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const Icon = item.icon!;
  const itemIcon = item.icon ? <Icon style={{ fontSize: '1rem' }} /> : false;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;

  const router = useRouter();
  const { asPath } = router;

  // active menu item on page load
  useEffect(() => {
    if (asPath && asPath.includes('my-portfolio')) {
      if (item.url && item.url.includes('my-portfolio')) {
        dispatch(activeItem({ openItem: [item.id] }));
      }
    }

    if (asPath && asPath.includes('projects')) {
      if (item.url && item.url.includes('projects')) {
        dispatch(activeItem({ openItem: [item.id] }));
      }
    }

    if (asPath === item.url) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
    // eslint-disable-next-line
  }, [asPath]);

  const textColor = theme.palette.mode === ThemeMode.DARK ? 'grey.400' : 'text.primary';
  const iconSelectedColor = '#FEFEFE';

  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <ListItemButton
          {...listItemProps}
          disabled={item.disabled}
          selected={isSelected}
          sx={{
            zIndex: 1201,
            pl: `${level * 16}px`,
            py: 1,
            mx: '16px',
            borderRadius: '8px',
            '&:hover': {
              bgcolor: theme.palette.mode === ThemeMode.DARK ? '#4AD0AA40' : '#2A68DF80'
            },
            '&.Mui-selected': {
              border: '1px solid transparent',
              background:
                theme.palette.mode === ThemeMode.DARK
                  ? 'radial-gradient(117.73% 99.50% at 8.37% 0.00%, rgba(70, 70, 70) 0%, #141718 100%) padding-box, linear-gradient(160deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.11) 50%, rgba(255, 255, 255, 0.11) 60%, #8470FF80) border-box'
                  : '#2A68DF',
              backdropFilter: 'blur(2.5px)',
              color: iconSelectedColor,

              '&:hover': {
                color: iconSelectedColor,
                bgcolor: theme.palette.mode === ThemeMode.DARK ? '#4AD0AA40' : '#2A68DF80'
              }
            }
          }}
          {...(matchDownLg && {
            onClick: () => dispatch(openDrawer(false))
          })}
        >
          {itemIcon && (
            <ListItemIcon
              sx={{
                minWidth: 32,
                color: isSelected ? iconSelectedColor : textColor
              }}
            >
              {itemIcon}
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                {item.title}
              </Typography>
            }
          />
          {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      ) : (
        <ListItemButton
          {...listItemProps}
          disabled={item.disabled}
          selected={isSelected}
          sx={{
            zIndex: 1201,
            '&:hover': {
              bgcolor: 'transparent'
            },
            '&.Mui-selected': {
              bgcolor: 'transparent',
              color: iconSelectedColor,
              '&:hover': {
                color: iconSelectedColor,
                bgcolor: 'transparent'
              }
            }
          }}
        >
          {itemIcon && <ListItemIcon sx={{ minWidth: 36 }}>{itemIcon}</ListItemIcon>}
          {!itemIcon && (
            <ListItemIcon sx={{ color: isSelected ? 'primary.main' : 'secondary.main' }}>
              <Dot size={4} color={isSelected ? 'primary' : 'secondary'} />
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              <Typography variant="h6" color="inherit">
                {item.title}
              </Typography>
            }
          />
          {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      )}
    </>
  );
};

export default NavItem;
