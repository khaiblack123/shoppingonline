import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import './Myorders.css'; // Import the new CSS file

class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    
    const orderRows = this.state.orders.map((item) => (
      <tr key={item._id} className="order-row" onClick={() => this.handleOrderClick(item)}>
        <td>{item._id}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.customer.name}</td>
        <td>{item.customer.phone}</td>
        <td>${item.total.toFixed(2)}</td>
        <td>{item.status}</td>
      </tr>
    ));

    const itemRows = this.state.order ? this.state.order.items.map((item, index) => (
      <tr key={item.product._id} className="order-detail-row">
        <td>{index + 1}</td>
        <td>{item.product._id}</td>
        <td>{item.product.name}</td>
        <td><img src={"data:image/jpg;base64," + item.product.image} width="70" height="70" alt="" /></td>
        <td>${item.product.price.toFixed(2)}</td>
        <td>{item.quantity}</td>
        <td>${(item.product.price * item.quantity).toFixed(2)}</td>
      </tr>
    )) : null;

    return (
      <div className="myorders-container">
        <div className="myorders-list">
          <h2 className="myorders-title">Order List</h2>
          <table className="myorders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Creation Date</th>
                <th>Customer Name</th>
                <th>Customer Phone</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderRows}
            </tbody>
          </table>
        </div>
        {this.state.order &&
          <div className="myorders-detail">
            <h2 className="myorders-title">Order Detail</h2>
            <table className="myorders-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {itemRows}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.fetchOrdersByCustomerId(cid);
    }
  }

  // event-handlers
  handleOrderClick(item) {
    this.setState({ order: item });
  }

  // apis
  fetchOrdersByCustomerId(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/customer/orders/customer/${cid}`, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}

export default Myorders;
