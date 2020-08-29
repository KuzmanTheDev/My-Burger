import React from 'react';
import './HamburgerNav.css';


const HamburgerNav = ({clicked}) => {

    return (
      <div className= {'DrawerToggle'} onClick = {clicked}>
         <div></div>
        <div></div>
        <div></div>
      </div>
    );
};

export default HamburgerNav;