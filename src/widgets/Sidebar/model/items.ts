import React from 'react';
import { RouterPath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-page-icon.svg';
import MainIcon from 'shared/assets/icons/main-page-icon.svg';
import ProfileIcon from 'shared/assets/icons/profile-svg.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
  authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RouterPath.main,
    Icon: MainIcon,
    text: 'Main',
  },
  {
    path: RouterPath.about,
    Icon: AboutIcon,
    text: 'About',
  },
  {
    path: RouterPath.profile,
    Icon: ProfileIcon,
    text: 'Profile',
    authOnly: true,
  },
];
