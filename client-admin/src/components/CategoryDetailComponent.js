import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './CategoryDetail.css'; // Ensure you import the CSS file

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      categoryID: '',
      categoryName: ''
    };
  }

  render() {
    return (
      <div className="category-detail-container">
        <h2 className="category-detail-title">Category Detail</h2>
        <form className="category-detail-form">
          <table className="category-detail-table">
            <tbody>
              <tr>
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    value={this.state.categoryID}
                    onChange={(e) => { this.setState({ categoryID: e.target.value }) }}
                    readOnly
                    className="category-detail-input"
                  />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    value={this.state.categoryName}
                    onChange={(e) => { this.setState({ categoryName: e.target.value }) }}
                    className="category-detail-input"
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button onClick={(e) => this.handleAddClick(e)} className="category-detail-button">Add New</button>
                  <button onClick={(e) => this.handleUpdateClick(e)} className="category-detail-button">Update</button>
                  <button onClick={(e) => this.handleDeleteClick(e)} className="category-detail-button">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        categoryID: this.props.item._id,
        categoryName: this.props.item.name
      });
    }
  }

  handleAddClick(e) {
    e.preventDefault();
    const { categoryName } = this.state;
    if (categoryName) {
      const category = { name: categoryName };
      this.apiPostCategory(category);
    } else {
      alert('Please input name');
    }
  }

  handleUpdateClick(e) {
    e.preventDefault();
    const { categoryID, categoryName } = this.state;
    if (categoryID && categoryName) {
      const category = { name: categoryName };
      this.apiPutCategory(categoryID, category);
    } else {
      alert('Please input id and name');
    }
  }

  handleDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this category?')) {
      const { categoryID } = this.state;
      if (categoryID) {
        this.apiDeleteCategory(categoryID);
      } else {
        alert('Please input id');
      }
    }
  }

  apiPostCategory(category) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', category, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Category added successfully!');
        this.fetchCategories();
      } else {
        alert('Failed to add category.');
      }
    });
  }

  fetchCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }

  apiPutCategory(id, category) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/admin/categories/${id}`, category, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Category updated successfully!');
        this.fetchCategories();
      } else {
        alert('Failed to update category.');
      }
    });
  }

  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete(`/api/admin/categories/${id}`, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Category deleted successfully!');
        this.fetchCategories();
      } else {
        alert('Failed to delete category.');
      }
    });
  }
}

export default CategoryDetail;
