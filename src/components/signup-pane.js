var React = require('react');

var SignupPane = React.createClass({
  componentWillMount: function() {
    console.log('mounting');
  },

  render: function() {
    return (
      <div>
        <h2>Sign up</h2>
        <a className="btn" href="/auth/google">Click to sign up</a>
      </div>
    );
  },

  handleClick: function(evt) {
    evt.preventDefault();
  }
});

module.exports = SignupPane;
