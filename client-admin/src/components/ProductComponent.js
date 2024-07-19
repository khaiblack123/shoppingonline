import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import './Product.css'; // Import the CSS file

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="product-row" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.image} className="product-image" alt="" /></td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<span key={index} className="pagination-current">| <b>{index + 1}</b> |</span>);
      } else {
        return (<span key={index} className="pagination-link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>);
      }
    });
    return (
      <div className="product-container">
        <div className="product-header">
          <h2 className="product-title">PRODUCT LIST</h2>
          <table className="product-table" border="1">
            <thead>
              <tr className="product-header-row">
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {prods}
              <tr>
                <td colSpan="6" className="pagination-container">{pagination}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
      </div>
    );
  }
  updateProducts = (products, noPages, curPage) => { // arrow-function
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;
