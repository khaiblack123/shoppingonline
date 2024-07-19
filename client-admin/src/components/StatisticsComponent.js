import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './Statistics.css'; // Import the new CSS file

class Statistics extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            noCategories: 0,
            noProducts: 0,
            noOrders: 0,
            noOrdersPending: 0,
            noOrdersApproved: 0,
            noOrdersCanceled: 0,
            noOrdersRevenue: 0,
            noCustomers: 0,
        };
    }

    render() {
        return (
            <div className="statistics-container">
                <h2 className="statistics-title">STATISTICS</h2>
                <table className="statistics-table">
                    <tbody>
                        <tr>
                            <td className="statistics-label">No.Categories</td>
                            <td></td>
                            <td className="statistics-value">{this.state.noCategories}</td>
                        </tr>
                        <tr>
                            <td className="statistics-label">No.Products</td>
                            <td></td>
                            <td className="statistics-value">{this.state.noProducts}</td>
                        </tr>
                        <tr>
                            <td className="statistics-label">No.Orders</td>
                            <td></td>
                            <td className="statistics-value">{this.state.noOrders}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="statistics-sub-label">Pending &ensp;</td>
                            <td className="statistics-value">{this.state.noOrdersPending}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="statistics-sub-label">Approved &ensp;</td>
                            <td className="statistics-value">{this.state.noOrdersApproved}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="statistics-sub-label">Canceled &ensp;</td>
                            <td className="statistics-value">{this.state.noOrdersCanceled}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="statistics-sub-label">Revenue &ensp;</td>
                            <td className="statistics-value">{this.state.noOrdersRevenue}</td>
                        </tr>
                        <tr>
                            <td className="statistics-label">No.Customers</td>
                            <td></td>
                            <td className="statistics-value">{this.state.noCustomers}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        this.apiGetStatistics();
    }

    // API
    apiGetStatistics() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/statistics', config).then((res) => {
            const result = res.data;
            this.setState({
                noCategories: result.noCategories,
                noProducts: result.noProducts,
                noOrders: result.noOrders,
                noOrdersPending: result.noOrdersPending,
                noOrdersApproved: result.noOrdersApproved,
                noOrdersCanceled: result.noOrdersCanceled,
                noOrdersRevenue: result.noOrdersRevenue,
                noCustomers: result.noCustomers
            });
        });
    }
}

export default Statistics;
