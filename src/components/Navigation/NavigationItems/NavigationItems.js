import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import  './NavigationItems.css';

const NavigationItems = ({authCheck}) =>{
    return(
  <ul className = {'NavigationItems'}>
      <NavigationItem link= "/" exact>Burger Builder</NavigationItem>
      {authCheck ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
      {authCheck ? 
        <NavigationItem link="/logout">Logout <i className="fas fa-sign-out-alt"></i></NavigationItem>
      : <NavigationItem link="/auth"><i className="fas fa-user-plus"></i></NavigationItem>
      }  
  </ul>
    );
}

export default NavigationItems; 