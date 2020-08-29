import React from 'react';
import './Control.css';


const Control = ({label, more, less, disabled}) =>{
    return(
        <div className={'Control'}>
          <div className = {'Label'}>{label}</div>
          <button className = {'Less'} onClick= {less} disabled= {disabled}>-</button>
          <button className = {'More'} onClick= {more}>+</button>
        </div>
    );
}

export default Control; 