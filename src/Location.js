var React = require('react');

let locationRequest = "http://freegeoip.net/json/";

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

var Location= React.createClass({
  getInitialState: function() {
    console.log('GetInitialState', 'info');
    return {
    	location : "Where are you?",
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
        self.setState({
          location: data
        });
     })
     .catch(function(err){
        console.log("error", err);
     });

  },
  
  render: function() {
    console.log('Render', 'success');
    let loc = this.state.location;
    return (
    	<div>
    		<p>{loc.country_name} </p>
        <p>{loc.city} </p>
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

module.exports = Location;