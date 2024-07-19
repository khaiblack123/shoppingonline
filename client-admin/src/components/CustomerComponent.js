import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './Customer.css';

class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null
    };
  }

  render() {
    const customerRows = this.state.customers.map((item) => (
      <tr key={item._id} className="customer-row" onClick={() => this.handleCustomerClick(item)}>
        <td>{item._id}</td>
        <td>{item.username}</td>
        <td>{item.password}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>{item.active ? 'Active' : 'Inactive'}</td>
        <td>
          {item.active === 0 ?
            <span className="action-link" onClick={() => this.handleEmailClick(item)}>Email</span>
            :
            <span className="action-link" onClick={() => this.handleDeactivateClick(item)}>Deactivate</span>}
        </td>
      </tr>
    ));

    const orderRows = this.state.orders.map((item) => (
      <tr key={item._id} className="order-row" onClick={() => this.handleOrderClick(item)}>
        <td>{item._id}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.customer.name}</td>
        <td>{item.customer.phone}</td>
        <td>{item.total}</td>
        <td>{item.status}</td>
      </tr>
    ));

    const orderItems = this.state.order ? this.state.order.items.map((item, index) => (
      <tr key={item.product._id} className="order-item-row">
        <td>{index + 1}</td>
        <td>{item.product._id}</td>
        <td>{item.product.name}</td>
        <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
        <td>{item.product.price}</td>
        <td>{item.quantity}</td>
        <td>{item.product.price * item.quantity}</td>
      </tr>
    )) : null;

    return (
      <div className="customer-container">
        <div className="customer-list">
          <h2 className="section-title">Customer List</h2>
          <table className="customer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customerRows}
            </tbody>
          </table>
        </div>

        {this.state.orders.length > 0 &&
          <div className="order-list">
            <h2 className="section-title">Order List</h2>
            <table className="order-table">
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
        }

        {this.state.order &&
          <div className="order-detail">
            <h2 className="section-title">Order Detail</h2>
            <table className="order-detail-table">
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
                {orderItems}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  // event-handlers
  handleCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.fetchOrdersByCustomerID(item._id);
  }

  handleOrderClick(item) {
    this.setState({ order: item });
  }

  handleDeactivateClick(item) {
    this.deactivateCustomer(item._id, item.token);
  }

  handleEmailClick(item) {
    this.sendCustomerEmail(item._id);
  }

  // apis
  fetchCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }

  fetchOrdersByCustomerID(customerID) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/admin/orders/customer/${customerID}`, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }

  deactivateCustomer(id, token) {
    const body = { token: token };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/admin/customers/deactive/${id}`, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.fetchCustomers();
      } else {
        alert('Failed to deactivate customer.');
      }
    });
  }

  sendCustomerEmail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/admin/customers/sendmail/${id}`, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

export default Customer;
