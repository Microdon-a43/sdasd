import React from 'react';
import logo from '../../assets/logo.png';
import './header.css';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
  
      <header className="header">
        <div className="container">
          <div className="header__wrap">
            <Link to='/'><img src={logo} alt="" /></Link>
            <button className="header__btn"><Link to='/login'>Войти</Link></button>
          </div>
        </div>
      </header>
  );
};
