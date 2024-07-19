import axios from 'axios';
import React, { Component } from 'react';
import './Active.css';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div className="active-container">
        <h2 className="active-title">Activate Account</h2>
        <form className="active-form">
          <table className="active-table">
            <tbody>
              <tr>
                <td className="active-label">ID</td>
                <td><input className="active-input" type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className="active-label">Token</td>
                <td><input className="active-input" type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input className="active-button" type="submit" value="Activate" onClick={(e) => this.btnActiveClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Active;
