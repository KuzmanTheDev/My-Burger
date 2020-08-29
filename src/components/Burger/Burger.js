import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'



const Burger = ({ingredients}) =>{
    let chosenIngredients = Object.keys(ingredients).map(ingKey => {
        return [...Array(ingredients[ingKey])].map((ing, i) => {
           return <BurgerIngredient key= {ingKey + i} type= {ingKey}/>
        })
    })
    .reduce((accumulator, el) =>{
       return accumulator.concat(el)
    }, []);
    if(chosenIngredients.length === 0 ){
        chosenIngredients= <p>Start adding your ingredients!</p>
    }
    return(
        <div className = 'Burger'>
            <BurgerIngredient type = 'top-bread'/>
             { chosenIngredients }
            <BurgerIngredient type = 'bottom-bread'/>
        </div>
    );
}

export default Burger;