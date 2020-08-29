import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import errorHandler from '../../HOC/ErrorHandler/ErrorHandler';
import * as actions from '../../Store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
   
    componentDidMount(){
     this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render(){
        if (this.props.error){
            return <h2 style = {{textAlign:'center', fontFamily: 'monospace'}}>Sorry can't retrieve orders now. Check internet connection and try again</h2>
        }
        let orders = <Spinner/>;
        if (!this.props.loading && this.props.orders.length > 0 ) {    
            orders = this.props.orders.map(order =>{
                return <Order key = {order.id}
                        ingredients = {order.ingredients}
                        price = {order.price} />
            })
        }else if (!this.props.loading && this.props.orders.length === 0 ){
            orders = <h2 style={{textAlign:'center', fontFamily: 'monospace'}}>No Orders yet. </h2>
        }
        return(
            <div>
                { orders }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios));