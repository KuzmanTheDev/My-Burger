import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Authentication/Auth';
import Register from './containers/Authentication/Register';
import Logout from './containers/Authentication/Logout/Logout';
import * as actions from './Store/actions/index';


class App extends Component {

  componentDidMount(){
    this.props.onLocalStateCheck();
  }

  render(){
    let routes = (
      <div>
        <Route path= "/" exact  component={ BurgerBuilder} />
        <Route path= "/auth"   component={ Auth } />
        <Route path= "/register"   component={ Register } />
        <Redirect to = "/" />
      </div>
    );

    if (this.props.isAuthenticated){
      routes = (
      <div>
        <Route path= "/" exact  component={ BurgerBuilder} />
        <Route path= "/auth"   component={ Auth } />
        <Route path= "/register"   component={ Register } />
        <Route path= "/orders"   component={ Orders} />
        <Route path= "/logout"   component={ Logout } />
        <Route path= "/checkout" component={ Checkout} />
      </div>
      );
    }

    return (
      <div>
      <Layout>
        {routes}
      </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onLocalStateCheck: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
