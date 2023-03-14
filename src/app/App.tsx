import React from 'react';
import {Link} from 'react-router-dom';
import {useTheme} from 'app/providers/ThemeProbider';
import {classNames} from 'shared/lib/classNames/classNames';
import {AppRouter} from 'app/providers/router';

import './styles/index.scss';


const App = () => {
  const {theme, toggleTheme} = useTheme()
  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to={'/'}>Main Page</Link>
      <Link to={'/about'}>About Page</Link>
      <AppRouter/>
    </div>
  );
};

export default App;
