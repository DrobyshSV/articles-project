import React from 'react';
import {useTheme} from 'app/providers/ThemeProbider';
import {classNames} from 'shared/lib/classNames/classNames';
import {AppRouter} from 'app/providers/router';

import './styles/index.scss';
import {Navbar} from 'widgets/Navbar';

const App = () => {
  const {theme} = useTheme()
  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar/>
      <AppRouter/>
    </div>
  );
};

export default App;
