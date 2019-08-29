import React, { Component } from 'react';
import SearchBar from './components/searchBar';
import WeatherCard from './components/weatherCard';

const Api_Key = "07e16bd65a4655d5ade1fd150ba994aa";
var JsonResponse = null;
var hourlyForecast = [];
var location = {
  cityName: "",
  countryName: "",
};
var days = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: {
        city: "",
        country: "",
      },
      timestamp: {
        dayIndex: null,
        hourIndex: null,
      },
      responseStatus: "",
    };
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleNavTabChange = this.handleNavTabChange.bind(this);
  }

  handleSubmit = async (e) => {
    this.setState({
      timestamp: {
        dayIndex: null,
        hourIndex: null,
      },
      responseStatus: "",
    });
    JsonResponse = null;
    hourlyForecast = [];
    days = [];
    const city = this.state.searchText.city;
    const country = this.state.searchText.country;
    //console.log(city, country);

    e.preventDefault();
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${Api_Key}&units=metric`);
    JsonResponse = await api_call.json();
    console.log(JsonResponse);

    if (JsonResponse.cod === "200") {
      location['cityName'] = JsonResponse.city.name;
      location['countryName'] = JsonResponse.city.country;
      var len = JsonResponse.cnt;
      var dayHourlyForecast = [];
      var currDay, prevDay = null;
      for (var i = 0; i < len; ++i) {
        var tempObj = {
          dt: new Date(JsonResponse.list[i].dt * 1000),
          temp: JsonResponse.list[i].main.temp,
          temp_min: JsonResponse.list[i].main.temp_min,
          temp_max: JsonResponse.list[i].main.temp_max,
          humidity: JsonResponse.list[i].main.humidity,
          pressure: JsonResponse.list[i].main.pressure,
          weather_desc: JsonResponse.list[i].weather[0].description,
          weather_icon: JsonResponse.list[i].weather[0].icon,
          wind_speed: JsonResponse.list[i].wind.speed,
        };
        currDay = tempObj.dt.getDay();
        if (prevDay !== currDay) {
          if (dayHourlyForecast.length > 0) {
            hourlyForecast.push(dayHourlyForecast.slice());
            dayHourlyForecast = [];
          }
          days.push(currDay);
        }
        dayHourlyForecast.push(tempObj);
        if (i === len - 1) hourlyForecast.push(dayHourlyForecast);
        prevDay = currDay;
      }

      this.setState({
        timestamp: {
          dayIndex: 0,
          hourIndex: 0,
        },
        responseStatus: JsonResponse.cod,
      });
    }
    else {
      this.setState({
        responseStatus: JsonResponse.cod,
      });
    }
  }

  handleCityChange(event) {
    this.setState({
      searchText: {
        city: event.target.value,
        country: this.state.searchText.country,
      },
    });
  }

  handleCountryChange(event) {
    this.setState({
      searchText: {
        city: this.state.searchText.city,
        country: event.target.value,
      },
    });
  }

  handleNavTabChange(i) {
    var newTimestamp = Object.assign({}, this.state.timestamp);
    if (i !== newTimestamp.dayIndex) {
      newTimestamp['dayIndex'] = i;
      newTimestamp['hourIndex'] = 0;
      this.setState({
        timestamp: newTimestamp,
      });
    }
  }

  handleTimeChange(i) {
    //console.log(i);
    var newTimestamp = Object.assign({}, this.state.timestamp);
    //console.log(newTimestamp);
    var dayIndex = newTimestamp.dayIndex;
    var hourIndex = newTimestamp.hourIndex;
    if (i === 0) {
      if (hourIndex > 0)
        newTimestamp['hourIndex'] = hourIndex - 1;
    }
    else {
      if (hourIndex < hourlyForecast[dayIndex].length - 1) {
        newTimestamp['hourIndex'] = hourIndex + 1;
      }
    }
    //console.log(newTimestamp);
    this.setState({
      timestamp: newTimestamp,
    });
  }

  render() {
    const responseObj = {
      status: this.state.responseStatus,
      message: (JsonResponse) ? JsonResponse.message : null,
      response: hourlyForecast,
    };
    return (
      <div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <SearchBar searchText={this.state.searchText} handleSubmit={this.handleSubmit} handleCityChange={this.handleCityChange} handleCountryChange={this.handleCountryChange} />
          </div>
          <div className="row justify-content-center border">
            <WeatherCard timestamp={this.state.timestamp} displayDays={days} location={location} responseObj={responseObj} handleNavTabChange={this.handleNavTabChange} handleTimeChange={this.handleTimeChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;