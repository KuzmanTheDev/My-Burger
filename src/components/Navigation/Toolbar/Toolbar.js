import React from 'react';
import Logo from '../../Logo/Logo';
import  './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerNav from '../HamburgerNav/HamburgerNav';

const Toolbar = ({toggleSideDrawer, isAuth}) =>{
    
    return(
       <header className = {'Toolbar'}>
           <HamburgerNav clicked = {toggleSideDrawer}/>
               <Logo/>
           <nav className = {'largerDisplay'}>
               <NavigationItems authCheck= { isAuth } />
           </nav>
       </header>
    );
}

export default Toolbar;  