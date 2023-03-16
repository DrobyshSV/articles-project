import {classNames} from 'shared/lib/classNames/classNames';
import styles from './Sidebar.module.scss'
import React, {useState} from 'react';
import {ThemeSwitcher} from 'widgets/ThemeSwitcher';


interface SidebarProps {
  className?: string
}

export const Sidebar = ({className}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const collapsedHandler = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className={classNames(styles.Sidebar,{[styles.collapsed]: collapsed},[className])}>
      <button onClick={collapsedHandler}>TOGGLE</button>
      <div className={styles.switchers}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

