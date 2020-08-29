import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import * as actions from '../../Store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Register extends Component {
    state = {
        fields:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    componentDidMount(){
        if (!this.props.buildingBurger && this.props.onAuthRedirectPath !== '/'){
            this.props.onAuthRedirectPath('/');
        }
    }

    valididtyCheck = (value, rules) => {
        let isValid = true;
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, fieldName) =>{
        const updatedFields = {
            ...this.state.fields,
            [fieldName]:{
                ...this.state.fields[fieldName],
                value: event.target.value,
                valid: this.valididtyCheck(event.target.value, this.state.fields[fieldName].validation),
                touched: true
            }
        }
        this.setState({ fields: updatedFields});
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.fields.email.value, this.state.fields.password.value, this.state.isSignup);
    }

    onAuthSwitch = () =>{
        this.props.history.push('/auth');
    }

    render(){
        const formElementsArray = [];
        for ( let key in this.state.fields) {
            formElementsArray.push({
                id: key,
                config: this.state.fields[key]
            });
        }
        let form = formElementsArray.map(formElement =>{
                return <Input
                    key = {formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig= {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    invalid = {!formElement.config.valid}
                    shouldValidate ={ formElement.config.validation }
                    touched = {formElement.config.touched}
                    changed ={(event) =>this.inputChangedHandler(event, formElement.id)} 
                    />
               })
        if (this.props.loading){
            form = <Spinner/>;
        }
        let errorMessage = null;
        if (this.props.error){
        errorMessage = <p>{this.props.error.message}</p>;
        }
        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to = {this.props.authRedirectPath} />;
        }

        return(
            <div className = {'Auth'}>
                 {authRedirect}
                 {errorMessage}
                <form onSubmit={this.submitHandler} >
                  { form }
                 <Button btnType='Sure'>REGISTER </Button>
                </form>
                <p>Already have an account? <Button clicked = {this.onAuthSwitch} btnType='Unsure' > SIGN IN </Button></p>

            </div>

        );
    }
};
const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }  
};
const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.authenticate(email, password, isSignup)),
        onAuthRedirectPath: () => dispatch(actions.authRedirectPath('/'))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);