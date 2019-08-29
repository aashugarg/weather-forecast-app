import React, { Component } from 'react';
import ErrorMessage from './errorMessage.js';
import '../App.css';

const days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const options = { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

class WeatherCard extends Component {
    render() {
        var dayIndex = this.props.timestamp.dayIndex;
        var hourIndex = this.props.timestamp.hourIndex;
        if (dayIndex === null || hourIndex === null) {
            if (this.props.responseObj.status === "") return null;
            else {
                return (
                    <ErrorMessage responseStatus={this.props.responseObj.status} responseMessage={this.props.responseObj.message} />
                );
            }
        }
        var dataObj = this.props.responseObj.response[dayIndex][hourIndex];
        const leftButton = (hourIndex === 0) ? (<button onClick={() => this.props.handleTimeChange(0)} type="button" className="btn btn-primary btn-lg disabled"><i className="oi oi-arrow-left" title="icon name" aria-hidden="true"></i></button>) : (<button onClick={() => this.props.handleTimeChange(0)} type="button" className="btn btn-primary btn-lg"><i className="oi oi-arrow-left" title="icon name" aria-hidden="true"></i></button>);
        const rightButton = (hourIndex < this.props.responseObj.response[dayIndex].length - 1) ? (<button onClick={() => this.props.handleTimeChange(1)} type="button" className="btn btn-primary btn-lg"><i className="oi oi-arrow-right" title="icon name" aria-hidden="true"></i></button>) : (<button onClick={() => this.props.handleTimeChange(1)} type="button" className="btn btn-primary btn-lg disabled"><i className="oi oi-arrow-right" title="icon name" aria-hidden="true"></i></button>);
        const displayDays = this.props.displayDays.map((day, index) => {
            if (index === 0) {
                const dayLabel = (new Date().getDay() === day) ? "Today" : days_of_week[day];
                return (
                    <li className="nav-item" key={index}>
                        <a className="nav-link active" onClick={() => this.props.handleNavTabChange(index)} id="pills-home-tab" data-toggle="pill" href="#nav-pills" role="tab" aria-controls="pills-home" aria-selected="true">{dayLabel}</a>
                    </li>
                );
            }
            else {
                return (
                    <li className="nav-item" key={index}>
                        <a className="nav-link" onClick={() => this.props.handleNavTabChange(index)} id="pills-home-tab" data-toggle="pill" href="#nav-pills" role="tab" aria-controls="pills-home" aria-selected="false">{days_of_week[day]}</a>
                    </li>
                );
            }
        });
        return (
            <div className="card w-50">
                <div className="card-header bg-white">
                    <h4 className="d-flex justify-content-between">{this.props.location.cityName}, {this.props.location.countryName}</h4>
                    <h5 className="d-flex justify-content-between">
                        <div>
                            {dataObj.dt.toLocaleDateString('en-US', options)}
                        </div>
                        <div>
                            {dataObj.dt.toLocaleTimeString()}
                        </div>
                    </h5>
                    <br />
                    <ul className="nav nav-pills nav-justified" role="tablist">
                        {displayDays}
                    </ul>
                </div>

                <div className="card-body">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-around flex-row">
                            <div className="d-flex flex-column justify-content-center">
                                <div>
                                    <img src={`http://openweathermap.org/img/wn/${dataObj.weather_icon}@2x.png`}
                                        className="wc-weatherImg img-fluid"
                                        alt="Weather" />
                                </div>
                                <div className="wc-weatherDetails">{dataObj.weather_desc}</div>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="wc-tempDisplay">
                                    <span>{Math.round(dataObj.temp)}</span>
                                    <span>&#8451;</span>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div className="d-flex flex-row">
                                        <span className="oi oi-arrow-top" title="icon name" aria-hidden="true"></span>
                                        <div>
                                            <span>{dataObj.temp_max}</span>
                                            <span>&#8451;</span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <span className="oi oi-arrow-bottom" title="icon name" aria-hidden="true"></span>
                                        <div>
                                            <span>{dataObj.temp_min}</span>
                                            <span>&#8451;</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-left justify-content-center flex-column wc-weatherDetails">
                                <div className="">
                                    <div>Pressure: <span>{Math.round(dataObj.pressure)} Pa</span>
                                    </div>
                                </div>
                                <div className="">
                                    <div>Humidity: <span>{dataObj.humidity}%</span>
                                    </div>
                                </div>
                                <div className="">
                                    <div>Wind: <span>{Math.round(dataObj.wind_speed * 3.6)} km/h</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-center mt-5">
                            <div>
                                {leftButton}
                            </div>
                            <div className="mx-3 align-self-center wc-time">
                                <b>{dataObj.dt.getHours()}:{dataObj.dt.getMinutes()}</b>
                            </div>
                            <div>
                                {rightButton}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherCard;