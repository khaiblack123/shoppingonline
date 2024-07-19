import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  render() {
    const categoryLinks = this.state.categories.map((item) => (
      <li key={item._id} className="menu-item">
        <Link to={'/product/category/' + item._id}>{item.name}</Link>
      </li>
    ));

    return (
      <div className="menu-container">
        <div className="menu-left">
          <ul className="menu-list">
            <li className="menu-item"><Link to="/">Home</Link></li>
            <li className="menu-item"><Link to="/gmap">Gmap</Link></li>
            {categoryLinks}
          </ul>
        </div>
        {/* <div className="menu-theme-toggle">
          <input
            className="theme-toggle-checkbox"
            type="checkbox"
            onChange={(e) => this.handleThemeToggle(e)}
          />
          <span>Light / Dark mode</span>
        </div> */}
        <div className="menu-right">
          <form className="search-form">
            <input
              type="search"
              placeholder="Enter keyword"
              className="search-input"
              value={this.state.txtKeyword}
              onChange={(e) => this.setState({ txtKeyword: e.target.value })}
            />
            <input
              type="submit"
              value="SEARCH"
              className="search-button"
              onClick={(e) => this.handleSearch(e)}
            />
          </form>
        </div>
        <div className="clearfix" />
      </div>
    );
  }

  // Event-handlers
  handleSearch(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  // handleThemeToggle(e) {
  //   document.documentElement.setAttribute('data-bs-theme', e.target.checked ? 'dark' : 'light');
  // }

  componentDidMount() {
    this.fetchCategories();
  }

  // APIs
  fetchCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default withRouter(Menu);
