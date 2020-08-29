import React from 'react';
import  './Backdrop.css';


const Backdrop = ({visible, clicked}) =>{
    return(
       visible ? <div className ='Backdrop' onClick = {clicked}></div> : null
    );
}

export default Backdrop;