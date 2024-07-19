import axios from 'axios';
import React, { Component } from 'react';
import './Signup.css'; // Import CSS file

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      phone: '',
      email: ''
    };
  }

  render() {
    return (
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form">
          <table className="signup-table">
            <tbody>
              <tr>
                <td className="label">Username</td>
                <td>
                  <input 
                    type="text" 
                    value={this.state.username} 
                    onChange={(e) => this.setState({ username: e.target.value })} 
                    className="input-field"
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Password</td>
                <td>
                  <input 
                    type="password" 
                    value={this.state.password} 
                    onChange={(e) => this.setState({ password: e.target.value })} 
                    className="input-field"
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Name</td>
                <td>
                  <input 
                    type="text" 
                    value={this.state.name} 
                    onChange={(e) => this.setState({ name: e.target.value })} 
                    className="input-field"
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Phone</td>
                <td>
                  <input 
                    type="tel" 
                    value={this.state.phone} 
                    onChange={(e) => this.setState({ phone: e.target.value })} 
                    className="input-field"
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Email</td>
                <td>
                  <input 
                    type="email" 
                    value={this.state.email} 
                    onChange={(e) => this.setState({ email: e.target.value })} 
                    className="input-field"
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button 
                    type="submit" 
                    onClick={(e) => this.handleSignupClick(e)} 
                    className="submit-button"
                  >
                    Sign Up
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  // Event-handlers
  handleSignupClick(e) {
    e.preventDefault();
    const { username, password, name, phone, email } = this.state;
    if (username && password && name && phone && email) {
      const account = { username, password, name, phone, email };
      this.apiSignup(account);
    } else {
      alert('Please input all required fields.');
    }
  }

  // APIs
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

export default SignupPage;
