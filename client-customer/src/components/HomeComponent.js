import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from './SliderComponent';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProducts: [],
      hotProducts: []
    };
  }

  render() {
    const newProducts = this.state.newProducts.map((item) => {
      return (
        <div key={item._id} className="product-card">
          <figure>
            <Link to={'/product/' + item._id}>
              <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt={item.name} />
            </Link>
            <figcaption className="product-caption">{item.name}<br />Price: {item.price}</figcaption>
          </figure>
        </div>
      );
    });

    const hotProducts = this.state.hotProducts.map((item) => {
      return (
        <div key={item._id} className="product-card">
          <figure>
            <Link to={'/product/' + item._id}>
              <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt={item.name} />
            </Link>
            <figcaption className="product-caption">{item.name}<br />Price: {item.price}</figcaption>
          </figure>
        </div>
      );
    });

    return (
      <div className="home-container">
        <Slider />
        <div className="spacer" />
        <div className="products-section">
          <h2 className="section-title">New Products</h2>
          <div className="products-grid">
            {newProducts}
          </div>
        </div>
        {this.state.hotProducts.length > 0 &&
          <div className="products-section">
            <h2 className="section-title">Hot Products</h2>
            <div className="products-grid">
              {hotProducts}
            </div>
          </div>
        }
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // APIs
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newProducts: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotProducts: result });
    });
  }
}

export default Home;
