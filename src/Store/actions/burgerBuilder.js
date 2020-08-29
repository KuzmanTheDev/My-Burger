import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';




export const addIngredient = (name) =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const loadIngredients = (ingredients) =>{
    return{
        type: actionTypes.LOAD_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () =>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return dispatch =>{
        axios.get('https://burger-project-86df1.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(loadIngredients(response.data));
        })
        .catch(err =>{
            dispatch(fetchIngredientsFailed());
        });
    }
}