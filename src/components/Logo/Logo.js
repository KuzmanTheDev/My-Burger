import React from 'react';
import burgerLogo from '../../Assets/images/logo.png';
import  './Logo.css';

const Logo = (props) =>{
    return(
    <div className = {'Logo'}>
        <img src ={burgerLogo} alt= 'My Burger'/>
    </div>
    );
}

export default Logo; 