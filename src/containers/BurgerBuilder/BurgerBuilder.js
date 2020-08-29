import React, { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../../HOC/Auxillary';
import Burger from '../../components/Burger/Burger';
import ControlsBlock from '../../components/Burger/ControlsBlock/ControlsBlock';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../HOC/ErrorHandler/ErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../Store/actions/index';



class BurgerBuilder extends Component {
        state = { 
            purchaseValidity: false,
            purchasing: false,
        }

   componentDidMount(){
           this.props.initIngredients();
   }

    isPurchaseValid = (ingredients) =>{
        const sum = Object.keys(ingredients).map(igkey =>{
            return ingredients[igkey]
        })
        .reduce((accumulator,el) =>{
            return accumulator + el
        }, 0);
        return sum > 0;
    }

    // ingredientIncrement = (type) =>{
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const oldPrice = this.state.Price;
    //     const newPrice = oldPrice + INGREDIENT_PRICES[type];
    //     this.setState({ Price: newPrice, ingredients: updatedIngredients})
    //     this.isPurchaseValid(updatedIngredients);
    // }

    // ingredientDecrement = (type) =>{
    //     const oldCount = this.props.ings[type];
    //     if(oldCount === 0 ){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const oldPrice = this.state.Price;
    //     const newPrice = oldPrice - INGREDIENT_PRICES[type];
    //     this.setState({ Price: newPrice, ingredients: updatedIngredients}) 
    //     this.isPurchaseValid(updatedIngredients);
    // }

    onPurchase = () =>{
        if (this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            this.props.onAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    onCancelPurchase = () =>{
        this.setState({purchasing: false});
    }

    onContinuePurchase = () =>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledProp = {
            ...this.props.ings
        };
        for(let key in disabledProp){
            disabledProp[key] = disabledProp[key] === 0
        }
        let orderSummary = null;        
        let burger = this.props.error 
        ? <p>Sorry, ingredients can't be loaded.
          Check connection and Try again</p>
        : <Spinner/>;
        if (this.props.ings){
            burger =(
                <Aux>
                    <Burger ingredients = {this.props.ings}  />
                    <ControlsBlock ingredientIncrement = {this.props.onAddIngredient}
                        ingredientDecrement = {this.props.onRemoveIngredient}
                        disabled = {disabledProp}
                        price= {this.props.price }
                        purchaseValidity = {this.isPurchaseValid(this.props.ings)}
                        onPurchase = {this.onPurchase} 
                        authCheck = {this.props.isAuthenticated}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients = {this.props.ings} 
                continuePurchase = {this.onContinuePurchase} 
                cancelPurchase = {this.onCancelPurchase} 
                price= {this.props.price }/>
        } 
 
        return (
          <Aux>
                <Modal visibility = {this.state.purchasing} modalClosed = { this.onCancelPurchase}>
                    {orderSummary}
                </Modal>
                    {burger}
          </Aux>  
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
    };
}
const mapDispatchToProps = dispatch =>{
    return{
        onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
        initIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onAuthRedirectPath: (path) => dispatch(actions.authRedirectPath(path))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
 