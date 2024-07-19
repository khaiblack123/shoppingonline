import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import './ProductDetail.css'; // Import CSS file

class ProductDetailPage extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1
    };
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  render() {
    const prod = this.state.product;

    if (prod) {
      return (
        <div className="product-detail-container">
          <h2 className="product-detail-title">Product Details</h2>
          <div className="product-detail-content">
            <img src={"data:image/jpg;base64," + prod.image} alt={prod.name} className="product-image" />
            <div className="product-info">
              <table className="product-info-table">
                <tbody>
                  <tr>
                    <td className="label">ID:</td>
                    <td>{prod._id}</td>
                  </tr>
                  <tr>
                    <td className="label">Name:</td>
                    <td>{prod.name}</td>
                  </tr>
                  <tr>
                    <td className="label">Price:</td>
                    <td>${prod.price.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="label">Category:</td>
                    <td>{prod.category.name}</td>
                  </tr>
                  <tr>
                    <td className="label">Quantity:</td>
                    <td>
                      <input 
                        type="number" 
                        min="1" 
                        max="99" 
                        value={this.state.quantity} 
                        onChange={(e) => { this.setState({ quantity: e.target.value }) }} 
                        className="quantity-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <button 
                        onClick={(e) => this.btnAddToCartClick(e)} 
                        className="add-to-cart-button"
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    return (<div />);
  }

  // APIs
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }

  // Event-handlers
  btnAddToCartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.quantity, 10);
    if (quantity > 0) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // Check if the _id exists in mycart
      if (index === -1) { // Not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // Increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Added to cart successfully!');
    } else {
      alert('Please input a valid quantity');
    }
  }
}

export default withRouter(ProductDetailPage);
