import React from 'react';
import './ControlsBlock.css';
import Control from './Control/Control';

const controls = [
    {label:'Salad:', type: 'salad'},
    {label:'Bacon:', type: 'bacon'},
    {label:'Meat:', type: 'meat'},
    {label:'Cheese:', type: 'cheese'}
]

const ControlsBlock = ({ingredientIncrement, ingredientDecrement, disabled, price, purchaseValidity, onPurchase, authCheck}) =>{
    return(
        <div className = {'ControlBlock'}>
            <p>Total Price: <strong>{price.toFixed(2)} Naira</strong></p>
            {controls.map(ctrl =>{
                return <Control 
                            key = {ctrl.label} 
                            label ={ctrl.label}
                            more = {() =>ingredientIncrement(ctrl.type)}
                            less = {() => ingredientDecrement(ctrl.type)}
                            disabled= { disabled[ctrl.type] }
                        />
            } )}
            <button 
            className = {'OrderButton'}
            disabled = {!purchaseValidity}
            onClick = { onPurchase }>
                {authCheck ? 'ORDER NOW' :'SIGN IN TO ORDER' }
            </button>
        </div>
    );
}

export default ControlsBlock;