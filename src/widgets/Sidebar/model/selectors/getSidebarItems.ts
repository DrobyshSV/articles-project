import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import AboutIconDeprecated from '@/shared/assets/icons/about-page-icon-deprecated.svg';
import AboutIcon from '@/shared/assets/icons/about-page-icon.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-icon-deprecatad.svg';
import ArticleIcon from '@/shared/assets/icons/article-icon.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-page-icon-deprecated.svg';
import MainIcon from '@/shared/assets/icons/main-page-icon.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-svg-deprecated.svg';
import ProfileIcon from '@/shared/assets/icons/profile-svg.svg';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

import { SidebarItemType } from '../types/sidebar';

export const useSidebarItems = () => {
  const userData = useSelector(getUserAuthData);
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => MainIconDeprecated,
        on: () => MainIcon,
      }),
      text: 'Main',
    },
    {
      path: getRouteAbout(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => AboutIconDeprecated,
        on: () => AboutIcon,
      }),
      text: 'About',
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => ProfileIconDeprecated,
          on: () => ProfileIcon,
        }),
        text: 'Profile',
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => ArticleIconDeprecated,
          on: () => ArticleIcon,
        }),
        text: 'Articles',
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
};
