import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import './CheckoutSummary.css';

const CheckoutSummary = ({ingredients, checkoutContinued, checkoutCancelled}) => {
    return(
        <div className = {'CheckoutSummary'}>
            <h3>We hope you enjoy your Burger!</h3>
            <div style={{width: '100%'}}>
                <Burger ingredients={ingredients}/>
            </div>
            <Button btnType= "Unsure" clicked ={ checkoutCancelled} >CANCEL</Button>
            <Button btnType= "Sure" clicked ={ checkoutContinued}>CONTINUE</Button>
        </div>
    );
} 
export default CheckoutSummary;