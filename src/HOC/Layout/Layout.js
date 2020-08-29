import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxillary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/Sidedrawer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawer = () =>{
        this.setState({showSideDrawer: false});
    }

    toggleSideDrawer = () =>{
        this.setState((prevState) => {
            return{showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render(){
        return(
            <Aux> 
                <Toolbar isAuth= {this.props.isAuthenticated} toggleSideDrawer = {this.toggleSideDrawer}/>
                <SideDrawer
                isAuth= {this.props.isAuthenticated}
                open = {this.state.showSideDrawer} 
                close = {this.closeSideDrawer}
                />
                    <main className = {classes.mainSpacing}>
                        {this.props.children}
                    </main>
            </Aux>
        );
    }
}

const mapDispatchToState = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapDispatchToState)(Layout);