import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './AppLink.module.scss';

export type AppLinkThemeType = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  linkTheme?: AppLinkThemeType;
  children?: ReactNode;
  activeClassName?: string;
}

export const AppLink = forwardRef(
  (props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const {
      to,
      className,
      children,
      linkTheme = 'primary',
      activeClassName = '',
      ...otherProps
    } = props;
    return (
      <NavLink
        ref={ref}
        to={to}
        className={({ isActive }) =>
          classNames(styles.AppLink, { [activeClassName]: isActive }, [
            className,
            styles[linkTheme],
          ])
        }
        {...otherProps}
      >
        {children}
      </NavLink>
    );
  },
);
