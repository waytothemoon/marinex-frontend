// third-party
import { FormattedMessage } from 'react-intl';

// types
import { NavItemType } from 'types/menu';
import { UserRole } from 'types/auth';

// assets
import Dashboard from './icons/Dashboard';
import Help from './icons/Help';
import Portfolio from './icons/Portfolio';
import Project from './icons/Project';
import Reward from './icons/Reward';
import Transaction from './icons/Transaction';
import Wallet from './icons/Wallet';

import { DashboardOutlined, TeamOutlined, FileProtectOutlined, UsergroupAddOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - COMPONENTS ||============================== //

const menuItems: NavItemType[] = [
  {
    id: 'dashboard',
    icon: Dashboard,
    search: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    type: 'item',
    url: '/dashboard',
    roles: [UserRole.INVESTOR, UserRole.PROJECT_OWNER]
  },
  {
    id: 'my-portfolio',
    icon: Portfolio,
    search: 'my-portfolio',
    title: <FormattedMessage id="my-portfolio" />,
    type: 'item',
    url: '/my-portfolio',
    roles: [UserRole.INVESTOR, UserRole.PROJECT_OWNER]
  },
  {
    id: 'my-wallet',
    icon: Wallet,
    search: 'my-wallet',
    title: <FormattedMessage id="my-wallet" />,
    type: 'item',
    url: '/my-wallet',
    roles: [UserRole.INVESTOR, UserRole.PROJECT_OWNER]
  },
  {
    id: 'transactions',
    icon: Transaction,
    search: 'transactions',
    title: <FormattedMessage id="transactions" />,
    type: 'item',
    url: '/transactions',
    roles: [UserRole.INVESTOR]
  },
  {
    id: 'projects',
    icon: Project,
    search: 'projects',
    title: <FormattedMessage id="projects" />,
    type: 'item',
    url: '/projects',
    roles: [UserRole.INVESTOR, UserRole.PROJECT_OWNER]
  },
  {
    id: 'project-transactions',
    icon: Transaction,
    search: 'project-transactions',
    title: <FormattedMessage id="project-transactions" />,
    type: 'item',
    url: '/project-transactions',
    roles: [UserRole.PROJECT_OWNER]
  },
  {
    id: 'rewards',
    icon: Reward,
    search: 'rewards',
    title: <FormattedMessage id="rewards" />,
    type: 'item',
    url: '/rewards',
    roles: [UserRole.INVESTOR]
  },
  {
    id: 'help',
    icon: Help,
    search: 'help',
    title: <FormattedMessage id="help" />,
    type: 'item',
    url: '/help',
    roles: [UserRole.INVESTOR]
  },
  {
    id: 'dashboard',
    icon: Dashboard,
    search: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    type: 'item',
    url: '/admin/dashboard',
    roles: [UserRole.ADMIN]
  },
  {
    id: 'investors',
    icon: TeamOutlined,
    search: 'investors',
    title: <FormattedMessage id="investors" />,
    type: 'item',
    url: '/admin/investors',
    roles: [UserRole.ADMIN]
  },
  {
    id: 'project-owners',
    icon: UsergroupAddOutlined,
    search: 'project-owners',
    title: <FormattedMessage id="project-owners" />,
    type: 'item',
    url: '/admin/project-owners',
    roles: [UserRole.ADMIN]
  },
  {
    id: 'projects',
    icon: Project,
    search: 'projects',
    title: <FormattedMessage id="projects" />,
    type: 'item',
    url: '/admin/projects',
    roles: [UserRole.ADMIN]
  },
  {
    id: 'kyc',
    icon: DashboardOutlined,
    search: 'kyc',
    title: <FormattedMessage id="kyc" />,
    type: 'item',
    url: '/admin/kyc',
    roles: [UserRole.ADMIN]
  },
  {
    id: 'financial-transactions',
    icon: Transaction,
    search: 'financial-transactions',
    title: <FormattedMessage id="financial-transactions" />,
    type: 'item',
    url: '/admin/financial-transactions',
    roles: [UserRole.ADMIN]
  },
  {
    id: 'wallet-transactions',
    icon: Wallet,
    search: 'wallet-transactions',
    title: <FormattedMessage id="wallet-transactions" />,
    type: 'item',
    url: '/admin/wallet-transactions',
    roles: [UserRole.ADMIN]
  },
  {
    id: 'project-transactions',
    icon: FileProtectOutlined,
    search: 'project-transactions',
    title: <FormattedMessage id="project-transactions" />,
    type: 'item',
    url: '/admin/project-transactions',
    roles: [UserRole.ADMIN]
  },
  {
    id: 'rewards',
    icon: Reward,
    search: 'rewards',
    title: <FormattedMessage id="rewards" />,
    type: 'item',
    url: '/admin/rewards',
    roles: [UserRole.ADMIN]
  },
  {
    id: 'help',
    icon: Help,
    search: 'help',
    title: <FormattedMessage id="help" />,
    type: 'item',
    url: '/admin/help',
    roles: [UserRole.ADMIN]
  }
  // {
  //   id: 'referral',
  //   icon: DashboardOutlined,
  //   search: 'referral',
  //   title: <FormattedMessage id="referral" />,
  //   type: 'item',
  //   url: '/admin/referral',
  //   roles: [UserRole.ADMIN]
  // },
  // {
  //   id: 'settings',
  //   icon: SettingOutlined,
  //   search: 'settings',
  //   title: <FormattedMessage id="settings" />,
  //   type: 'item',
  //   url: '/admin/settings',
  //   roles: [UserRole.ADMIN]
  // }
];

export default menuItems;
