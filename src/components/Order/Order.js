import React from 'react';
import './Order.css';

const Order = ({ingredients, price}) =>{
    const orderedIngredients = [];
    for (let ingredientName in ingredients){
        orderedIngredients.push(
            {
                name: ingredientName,
                amount: ingredients[ingredientName]
            }
        );
    }
    const ingredientOutput = orderedIngredients.map(ig =>{
    return( <span style= {{textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0px 8px', padding: '5px', border: '1px solid #ccc'}}
                key= {ig.name}>
                {ig.name} ({ig.amount})
            </span>);
    });
    return(
        <div className={'Order'}>
            <p>Ingredients:{ingredientOutput} </p>
            <p>Price: <strong> ${Number.parseFloat(price).toFixed(2)}</strong></p>
        </div>

    );
}

export default Order;