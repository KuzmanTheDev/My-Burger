import React from 'react';
import Button from '../../UI/Button/Button';
import  './OrderSummary.css';


const OrderSummary = ({ingredients, continuePurchase, cancelPurchase, price}) =>{
    const ingredientSummary = Object.keys(ingredients).map(igkey =>{
    return (<li key = {igkey}>
             <span style = {{textTransform:'capitalize'}}> {igkey} </span>: {ingredients[igkey]}
          </li>);
    })
    return(
        <div >
           <h3>Your Order...</h3>
           <p>One yummy burger made with the following:</p>
           <ul>
               {ingredientSummary}
           </ul>
           <strong><p>Total Price: {price.toFixed(2)} Naira</p></strong>
           <p>Continue to checkout?</p>
           <Button btnType = 'Unsure' clicked = {cancelPurchase}>CANCEL</Button>
           <Button btnType = 'Sure' clicked = {continuePurchase}>CONTINUE</Button>
        </div>
    );
}

export default OrderSummary;