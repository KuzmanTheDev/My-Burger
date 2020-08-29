import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import errorHandler from '../../../HOC/ErrorHandler/ErrorHandler';
import * as actions from '../../../Store/actions';
import {newObject} from '../../../Utilities/utility';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            mobileNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Mobile Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 9,
                    maxLength: 13,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    placeholder: 'Preferred Delivery method',
                    options: [
                        {value: 'Standard', displayValue: 'Standard'},
                        {value: 'Express', displayValue: 'Express'}
                    ]
                },
                value: 'standard',
                validation: {},
                valid: true
            }
        },
        formIsvalid: false
    }

    orderHandler = (e) =>{
        e.preventDefault();
        const formData = {};
        for ( let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.postOrder(order, this.props.token);
    }

    valididtyCheck = (value, rules) => {
        let isValid = true;
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        const mutatedFormElement = newObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: this.valididtyCheck(event.target.value, this.state.orderForm[inputIdentifier].validation),      
        });
        if (mutatedFormElement.value.length >= 2){
            mutatedFormElement.touched = true;
        }
         const clonedOrderForm = newObject(this.state.orderForm,{
            [inputIdentifier]: mutatedFormElement
         });
        let formIsvalid = true;
        for ( let inputIdentifier in clonedOrderForm){
            formIsvalid = clonedOrderForm[inputIdentifier].valid && formIsvalid;
        }
        this.setState({ orderForm: clonedOrderForm, formIsvalid: formIsvalid});
    }

    render (){
        const formElementsArray = [];
        for ( let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
                <form onSubmit={this.orderHandler} >
                    {formElementsArray.map(formElement =>{
                        return <Input
                            key = {formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig= {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            invalid = {!formElement.config.valid}
                            shouldValidate ={ formElement.config.validation }
                            touched = {formElement.config.touched}
                            changed ={(event) =>this.inputChangedHandler(event, formElement.id)} />
                    })}
                    <Button btnType='Sure' disabled = {!this.state.formIsvalid} >ORDER</Button>
                </form>
        );
        if (this.props.loading){
            form = <Spinner/>;
        }
        return(
            <div className= {'ContactData'}>
                <h4>Please enter your Contact Data</h4>
                 {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        postOrder: (orderData, token) => dispatch(actions.postOrder(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactData, axios));