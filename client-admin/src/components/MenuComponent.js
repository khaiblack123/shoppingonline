import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import './Menu.css';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    return (
      <div className="menu-container">
        <div className="menu-links">
          <ul className="menu-list">
            <li className="menu-item"><Link to='/admin/home'>Home</Link></li>
            <li className="menu-item"><Link to='/admin/category'>Category</Link></li>
            <li className="menu-item"><Link to='/admin/product'>Product</Link></li>
            <li className="menu-item"><Link to='/admin/order'>Order</Link></li>
            <li className="menu-item"><Link to='/admin/customer'>Customer</Link></li>
            <li className="menu-item"><Link to='/admin/statistics'>Statistics</Link></li>
          </ul>
        </div>
        <div className="menu-user-info">
          Hello <b>{this.context.username}</b> |
          <Link to='/admin/home' onClick={this.handleLogout}> Logout</Link>
        </div>
      </div>
    );
  }

  // event-handlers
  handleLogout = () => {
    this.context.setToken('');
    this.context.setUsername('');
  }
}

export default Menu;
