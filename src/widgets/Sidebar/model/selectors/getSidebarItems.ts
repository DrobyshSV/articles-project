import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RouterPath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-page-icon.svg';
import MainIcon from 'shared/assets/icons/main-page-icon.svg';
import ProfileIcon from 'shared/assets/icons/profile-svg.svg';
import ArticleIcon from 'shared/assets/icons/article-icon.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
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
    ];

    if (userData) {
      sidebarItemsList.push(
        {
          path: `${RouterPath.profile}/${userData.id}`,
          Icon: ProfileIcon,
          text: 'Profile',
          authOnly: true,
        },
        {
          path: RouterPath.articles,
          Icon: ArticleIcon,
          text: 'Articles',
          authOnly: true,
        },
      );
    }

    return sidebarItemsList;
  },
);
