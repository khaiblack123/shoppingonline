import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: 'khaiblack2210',
      txtPassword: 'khaiblack2210'
    };
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">CUSTOMER LOGIN</h2>
          <form className="login-form">
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              value={this.state.txtUsername}
              onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={this.state.txtPassword}
              onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
            />
            <button
              type="submit"
              className="login-button"
              onClick={(e) => this.btnLoginClick(e)}
            >
              LOGIN
            </button>
            <Link to='/resetpwd' className="forgot-password-link">Forgot password</Link>
          </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      toast.warning('Please input username and password');
    }
  }

  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
        toast.success("Welcome to ShoppingOnline");
      } else {
        toast.error(result.message);
      }
    });
  }
}

export default withRouter(Login);
