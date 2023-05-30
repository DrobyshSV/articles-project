import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/config/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/config/hooks/useTheme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <PageLoader />;
  }
  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
};

export default App;
