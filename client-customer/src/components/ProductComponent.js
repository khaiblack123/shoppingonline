import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import './Product.css'; // Import CSS file

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sort: "default",
    };
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  render() {
    const { products, sort } = this.state;

    // Sort products based on selected option
    const sortedProducts = [...products].sort((a, b) => {
      switch (sort) {
        case 'nameASC':
          return a.name.localeCompare(b.name);
        case 'nameDESC':
          return b.name.localeCompare(a.name);
        case 'priceASC':
          return a.price - b.price;
        case 'priceDESC':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return (
      <div className="product-list-container">
        <h2 className="product-list-title">List of Products</h2>
        <div className="sort-container">
          <select 
            value={sort} 
            onChange={(e) => this.setState({ sort: e.target.value })}
            className="sort-select"
          >
            <option value="default">------Sort by------</option>
            <option value="nameASC">Name (A → Z)</option>
            <option value="nameDESC">Name (Z → A)</option>
            <option value="priceASC">Price (Low → High)</option>
            <option value="priceDESC">Price (High → Low)</option>
          </select>
        </div>
        <div className="product-grid">
          {sortedProducts.map(item => (
            <div key={item._id} className="product-card">
              <figure>
                <Link to={'/product/' + item._id}>
                  <img src={"data:image/jpg;base64," + item.image} alt={item.name} className="product-image" />
                </Link>
                <figcaption className="product-caption">
                  <div className="product-name">{item.name}</div>
                  <div className="product-price">Price: ${item.price.toFixed(2)}</div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // APIs
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}

export default withRouter(ProductList);
