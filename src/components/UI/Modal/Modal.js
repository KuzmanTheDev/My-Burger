import React, { Component } from 'react';
import Aux from '../../../HOC/Auxillary';
import Backdrop from '../Backdrop/Backdrop';
import  './Modal.css';


class Modal extends Component {
//the life cycle below is to prevent re-rendering everytime the props in order summary updated.
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.visibility !== this.props.visibility || nextProps.children !== this.props.children;
    }
    render(){
        return(
            <Aux>
                <Backdrop visible = {this.props.visibility} clicked = {this.props.modalClosed}/>
            <div className = {'Modal'} 
            style = {{
                transform: this.props.visibility ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.visibility ? '1' : '0'
                }}>
               {this.props.children} 
            </div>
            </Aux>
        );
    }
   
}

export default Modal;