import React, { Component } from 'react';

class ErrorMessage extends Component {
    render() {
        return (
            <div>
                <h3>Error {this.props.responseStatus}</h3>
                <h4>{this.props.responseMessage.toUpperCase()}</h4>
            </div>
        );
    }
}

export default ErrorMessage;