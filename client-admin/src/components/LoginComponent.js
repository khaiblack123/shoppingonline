import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './Login.css';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    if (!this.context.token) {
      return (
        <div className="login-container">
          <h2 className="login-title">Admin Login</h2>
          <form onSubmit={this.handleLoginSubmit}>
            <div className="login-form">
              <label htmlFor="username">Username</label>
              <input 
                id="username" 
                type="text" 
                value={this.state.username} 
                onChange={(e) => this.setState({ username: e.target.value })} 
              />
              <label htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                value={this.state.password} 
                onChange={(e) => this.setState({ password: e.target.value })} 
              />
              <button type="submit" className="login-button">Login</button>
            </div>
          </form>
        </div>
      );
    }
    return <div />;
  }

  // event-handlers
  handleLoginSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      this.apiLogin({ username, password });
    } else {
      alert('Please input username and password');
    }
  }

  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}

export default Login;
