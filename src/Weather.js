var React = require('react');

const weatherAPIToken = "&appid=804651b00a6f6491fbd5fc7bc0e63209";
const weatherNowHTTPQuery = "http://api.openweathermap.org/data/2.5/weather?q=";
const locationRequest = "http://freegeoip.net/json/";
let city = "Helsinki";

function httpRequestWeather(url) {
	return new Promise(function(resolve, reject) {
    var weatherRequest = new XMLHttpRequest();
    weatherRequest.open("GET", url, true);
	weatherRequest.onreadystatechange = function() {
		 if ( this.readyState === 4 ) {
		  	if ( this.status === 200) {
		     	console.log("request finished and response is ready");
		     	console.log(this.response);

		     	resolve(this.response);
		    } else{
		    	reject(new Error("no weather data"));
		    }
		 }
	  };
  	weatherRequest.send();
	});
}

function httpRequestLocation(url) {
  return new Promise(function(resolve, reject) {
    var locationRequest = new XMLHttpRequest();
    locationRequest.open("GET", url, true);
    locationRequest.onreadystatechange = function() {
       if ( this.readyState === 4 ) {
          if ( this.status === 200) {
            console.log("request finished and response is ready");
            console.log(this.response);

            resolve(JSON.parse(this.response));
          } else{
            reject(new Error("no location "));
          }
       }
      };
      locationRequest.send();
    });
}

var Weather = React.createClass({
  getInitialState: function() {
    console.log('GetInitialState', 'info');
    return {
    	weatherConditions : "No weather data",
    	weatherObj: {}
    };  
  },
  
  getDefaultProps: function() {
      console.log('GetDefaultProps', 'info');
      return {bar: 2};
  },
  
  update: function() {
    console.log('Updating State', 'primary');
    let self = this;
    
    httpRequestLocation(locationRequest)
     .then(function(data){
        city = data.city;
        return	city;
     })
     .then(function(city){
     	return httpRequestWeather(weatherNowHTTPQuery + city + weatherAPIToken);
     })
     .then(function(data){
		self.setState({
		    weatherConditions: data
		 });
		self.setState({
			weatherObj: data
		});
	})
	.catch(function(err){
		console.log("error", err);
		self.setState({
		    weatherConditions: "Buy"
		 });
	});
       
  },
  
  render: function() {
    console.log('Render', 'success');
    let condition = this.state.weatherConditions;
    return (
    	<div>
    		<span>{condition} </span>
    	</div>
    )
  },
  
  componentWillMount: function() {
    console.log('ComponentWillMount', 'warning');
    this.update();
  },
  
  componentDidMount: function() {
    console.log('ComponentDidMount', 'warning');
    this.update();

  },
  
  shouldComponentUpdate: function() {
    console.log('ShouldComponentUpdate', 'info');
    return true;
  },
  
  componentWillReceiveProps: function(nextProps) {
    console.log('ComponentWillRecieveProps', 'warning');
  },
  
  componentWillUpdate: function() {
    console.log('ComponentWillUpdate', 'warning');
  },
  
  componentDidUpdate: function() {
    console.log('ComponentDidUpdate', 'warning');
  },
  
  componentWillUnmount: function() {
    console.log('componentWillUnmount', 'danger');
  }
});

module.exports = Weather;