var React = require('react');

const instaAPIaccessToken = "?access_token=3681332213.81b69f2.88020902f003411196c3f4423912f547";
const fullRequest = "https://api.instagram.com/v1/tags/";
const tagName = "fashion";

function httpRequestInsta(url) {
  return new Promise(function(resolve, reject) {
    var instaRequest = new XMLHttpRequest();
    instaRequest.open("GET", url, true);
    instaRequest.onreadystatechange = function() {
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
      instaRequest.send();
    });
}

var Instagram = React.createClass({
  getInitialState: function() {
    console.log('GetInitialState', 'info');
    return {
    	insta : "Where are the pics?",
    };  
  },
  
  getDefaultProps: function() {
      console.log('GetDefaultProps', 'info');
      return {bar: 2};
  },
  
  update: function() {
    console.log('Updating State', 'primary');
    let self = this;
     httpRequestInsta(fullRequest + tagName + instaAPIaccessToken)
     .then(function(data){
        self.setState({
          insta: data
        });
     })
     .catch(function(err){
        console.log("error", err);
     });

  },
  
  render: function() {
    console.log('Render', 'success');
    let pics = this.state.insta;
    return (
    	<div>
    		<p>{pics} </p>
       
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

module.exports = Instagram;