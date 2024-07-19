import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import './Myprofile.css'; // Import CSS file

class MyProfile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }

  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);

    return (
      <div className="myprofile-container">
        <h2 className="myprofile-title">My Profile</h2>
        <form className="myprofile-form">
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={this.state.txtUsername} 
              onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} 
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={this.state.txtPassword} 
              onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} 
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              value={this.state.txtName} 
              onChange={(e) => { this.setState({ txtName: e.target.value }) }} 
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel" 
              value={this.state.txtPhone} 
              onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} 
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={this.state.txtEmail} 
              onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} 
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button 
              type="submit" 
              className="btn-update" 
              onClick={(e) => this.btnUpdateClick(e)}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }

  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;
    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const customer = { username: txtUsername, password: txtPassword, name: txtName, phone: txtPhone, email: txtEmail };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input all fields');
    }
  }

  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Profile updated successfully!');
        this.context.setCustomer(result);
      } else {
        alert('Failed to update profile!');
      }
    });
  }
}

export default MyProfile;
