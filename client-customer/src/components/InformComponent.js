import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import './Inform.css';

class Inform extends Component {
    static contextType = MyContext;

    render() {
        return (
            <div className="inform-container">
                <div className="inform-left">
                    {this.context.token === '' ?
                        <div>
                            <Link to='/login'>Login</Link> | 
                            <Link to='/signup'>Sign-up</Link> | 
                            <Link to='/active'>Activate</Link>
                        </div>
                        :
                        <div>
                            Hello <b>{this.context.customer.name}</b> | 
                            <Link to='/home' onClick={() => this.handleLogoutClick()}>Logout</Link> | 
                            <Link to='/myprofile'>My Profile</Link> | 
                            <Link to='/myorders'>My Orders</Link>
                        </div>
                    }
                </div>
                <div className="inform-right">
                    <Link to='/mycart'>My Cart</Link> have <b>{this.context.mycart.length}</b> items
                </div>
                <div className="clear-float" />
            </div>
        );
    }

    // Event handlers
    handleLogoutClick() {
        this.context.setToken('');
        this.context.setCustomer(null);
        this.context.setMycart([]);
    }
}

export default Inform;
