var React = require('react');
var ReactDOM = require('react-dom');

var Weather = require('./Weather');
var Location = require('./Location');
var Instagram = require('./Instagram');

var fashion_forecast = {
    title: "FashionForecast"
  };

// Component class starts here:
var FfApp = React.createClass({
    render: function(){
      return (
        <div>
          <h1>{fashion_forecast.title}</h1>
          <Weather />
        </div>

        )
    }
});


ReactDOM.render(
  <FfApp />,
  document.getElementById('app')
);
