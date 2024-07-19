import axios from 'axios';
import React, { Component } from 'react';
import './Resetpwd.css'; // Import CSS file

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      id: '',
      token: '',
      password: ''
    };
  }

  render() {
    return (
      <div className="reset-password-container">
        <h2 className="reset-password-title">Reset Password</h2>
        <form className="reset-password-form">
          <table className="reset-password-table">
            <tbody>
              <tr>
                <td className="label">Email</td>
                <td>
                  <input 
                    type="text" 
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
                    type="button" 
                    onClick={(e) => this.handleSendMail(e)} 
                    className="submit-button"
                  >
                    Send Mail
                  </button>
                </td>
              </tr>
              <tr>
                <td className="label">ID</td>
                <td>
                  <input 
                    type="text" 
                    value={this.state.id} 
                    onChange={(e) => this.setState({ id: e.target.value })} 
                    className="input-field"
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Token</td>
                <td>
                  <input 
                    type="text" 
                    value={this.state.token} 
                    onChange={(e) => this.setState({ token: e.target.value })} 
                    className="input-field"
                  />
                </td>
              </tr>
              <tr>
                <td className="label">New Password</td>
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
                <td></td>
                <td>
                  <button 
                    type="button" 
                    onClick={(e) => this.handleResetPassword(e)} 
                    className="submit-button"
                  >
                    Reset
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
  handleSendMail(e) {
    e.preventDefault();
    const email = this.state.email;
    if (email) {
      this.apiSendMail(email);
    } else {
      alert('Please input email');
    }
  }

  handleResetPassword(e) {
    e.preventDefault();
    const { id, token, password } = this.state;
    if (id && token && password) {
      this.apiResetPassword(id, token, password);
    } else {
      alert('Please input id, token, and password');
    }
  }

  // APIs
  apiSendMail(email) {
    axios.get('/api/customer/sendmail/' + email).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }

  apiResetPassword(id, token, password) {
    const body = { id, token, password };
    axios.post('/api/customer/resetpwd', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('Password reset successful!');
      } else {
        alert('Password reset failed!');
      }
    });
  }
}

export default ResetPasswordPage;
