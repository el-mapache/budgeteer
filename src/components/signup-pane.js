var React = require('react');

var SignupPane = React.createClass({
  getInitialState: function() {
    return {
      disabled: ''
    };
  },

  render: function() {
    return (
      <div>
        <h2>Sign up</h2>
        <a className={this.computeClass()} href="/auth/google" onClick={this.handleClick} disabled={this.state.disabled}>Click to sign up</a>
      </div>
    );
  },

  computeClass: function() {
    return 'btn' + (this.state.disabled ? ` ${this.state.disabled}` : '');
  },

  handleClick: function(evt) {
    this.setState({disabled: 'disabled'});
  }
});

module.exports = SignupPane;
