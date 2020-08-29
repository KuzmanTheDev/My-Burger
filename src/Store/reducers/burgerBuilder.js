import * as actionTypes from  '../actions/actionTypes';
import { newObject } from '../../Utilities/utility';

const initialState = {
    ingredients: null,
    price: 0,
    error: false,
    building: false,
    logoutPath: '/logout'
};

const INGREDIENT_PRICES = {
    salad: 100,
    cheese: 250,
    meat: 200,
    bacon: 350
}

const addIngredient = (state, action) =>{
    const updatedIngredients = newObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 });
    const updatedState = {
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return newObject(state, updatedState);
}

const removeIngredient = (state, action) =>{
    return{
        ...state,
        ingredients:{
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        price: state.price - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
}

const loadIngredients = (state, action) => {
    return newObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            meat: action.ingredients.meat,
            cheese: action.ingredients.cheese
        },
        error: false,
        price: 0,
        building: false
    });
}

const reducer = ( state = initialState, action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.LOAD_INGREDIENTS: return loadIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return newObject(state, { error: true });
        default: return state;
    }
};
export default reducer;