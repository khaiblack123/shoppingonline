import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import './Category.css';

class CategoryPage extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: null
    };
  }

  render() {
    const { categories, selectedCategory } = this.state;
    return (
      <div className="category-page">
        <h2 className="category-title">Category List</h2>
        <div className="category-table-container">
          <table className="category-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr 
                  key={item._id} 
                  className="category-row" 
                  onClick={() => this.handleCategoryClick(item)}
                >
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="category-detail-container">
          <CategoryDetail 
            item={selectedCategory} 
            updateCategories={this.updateCategories} 
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchCategories();
  }

  updateCategories = (categories) => {
    this.setState({ categories });
  }

  handleCategoryClick = (category) => {
    this.setState({ selectedCategory: category });
  }

  fetchCategories = () => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default CategoryPage;
