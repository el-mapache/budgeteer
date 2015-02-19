var React = require('react');

var Button = React.createClass({
  getDefaultProps: function() {
    return {
      buttonType: 'button'
    };
  },

  render: function() {
    return (
      <button {...this.props}
              className={this.getButtonClass()}>
        {this.props.icon}{this.props.text}
      </button>
    );
  },

  getButtonClass: function() {
    return 'btn ' + this.props.classes;
  }
});

module.exports = Button;
