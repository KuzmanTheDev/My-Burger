import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/Auxillary';

const Sidedrawer = ({close, open, isAuth}) =>{
    let toggleClassses = [classes.Sidedrawer, classes.Close];
    if(open){
        toggleClassses = [classes.Sidedrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop visible ={open} clicked = {close}/>
                <div className= { toggleClassses.join(' ')} onClick={close} >
                    <div className= {classes.Logo}>
                        <Logo/>
                    </div>
                    <nav>
                        <NavigationItems authCheck= {isAuth} />
                    </nav>
                </div>
       </Aux>
    );
}

export default Sidedrawer;  