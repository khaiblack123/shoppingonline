import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import './MyCart.css'; // Import the new CSS file

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    const mycartItems = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="mycart-row">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.product.image} width="70" height="70" alt="" /></td>
          <td>${item.product.price.toFixed(2)}</td>
          <td>{item.quantity}</td>
          <td>${(item.product.price * item.quantity).toFixed(2)}</td>
          <td><span className="mycart-link" onClick={() => this.handleRemoveClick(item.product._id)}>Remove</span></td>
        </tr>
      );
    });

    return (
      <div className="mycart-container">
        <h2 className="mycart-title">ITEM LIST</h2>
        <table className="mycart-table" border="1">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mycartItems}
            <tr>
              <td colSpan="7" className="mycart-total-label">Total</td>
              <td>${CartUtil.getTotal(this.context.mycart).toFixed(2)}</td>
              <td><span className="mycart-link" onClick={() => this.handleCheckoutClick()}>CHECKOUT</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // event-handlers
  handleRemoveClick(id) {
    const mycart = this.context.mycart.slice(); // Create a copy of the array
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }

  handleCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
  }

  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Checkout successful!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('Checkout failed!');
      }
    });
  }
}

export default withRouter(Mycart);
