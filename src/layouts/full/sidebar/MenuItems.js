import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTransfer, IconUserPlus, IconBrandStripe, IconBrandTabler, IconUserCircle
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Assets',
    icon: IconBrandStripe,
    href: '/ui/assetcreation',
  },
  {
    id: uniqueId(),
    title: 'Transfer Assets',
    icon: IconTransfer,
    href: '/ui/transferAssets',
  },
  {
    id: uniqueId(),
    title: 'Transaction',
    icon: IconBrandTabler,
    href: '/ui/transactions',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'About Us',
    icon: IconUserCircle,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
];

export default Menuitems;
