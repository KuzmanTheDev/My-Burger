import React from 'react';
import classes from './BurgerIngredients.module.css';

const BurgerIngredients = (props) =>{
    let ingredients = null;

    switch(props.type){
        case('bottom-bread'):
            ingredients = <div className= {classes.BottomBread}></div>;
            break;
        case('top-bread'):
            ingredients =
            ( <div className = {classes.TopBread}>
                    <div className= {classes.Seeds1}></div>
                    <div className= {classes.Seeds2}></div> 
              </div>
            );
            break;
        case('meat'):
            ingredients = <div className= {classes.Meat}></div>;
            break; 
        case('cheese'):
            ingredients = <div className= {classes.Cheese}></div>;
            break;
        case('bacon'):
            ingredients = <div className= {classes.Bacon}></div>;
            break;
        case('salad'):
            ingredients = <div className= {classes.Salad}></div>;
            break;
        default:
            ingredients = null;
    }
    return ingredients;
  
}
export default BurgerIngredients;