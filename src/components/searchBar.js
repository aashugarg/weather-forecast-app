import React, { Component } from 'react';
import '../App.css';


class SearchBar extends Component {
    render() {
        return (
            <div className="container py-4 sb-divStyle">
                <div className="row justify-content-center">
                    <h1 className="display-4 text-white">
                        <b>Weather Forecast App</b>
                    </h1>
                </div>

                <div className="row mt-4 justify-content-center">
                    <form onSubmit={this.props.handleSubmit}>
                        <div className="form-row">
                            <div className="col">
                                <input name="city" type="text" className="form-control" placeholder="Town/City" value={this.props.searchText.city} onChange={this.props.handleCityChange}></input>
                            </div>
                            <div className="col">
                                <input name="country" type="text" className="form-control" placeholder="Country" value={this.props.searchText.country} onChange={this.props.handleCountryChange}></input>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary bg-success my-4">Get Weather Forecast</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default SearchBar;