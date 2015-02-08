var React = require('react');

/**
  * Generic icon component. Uses google material design icons.
  *
  * Available properties:
  * @prop {iconSize} string 'tiny|small|medium|large'
  * @prop {iconPosition} string 'left|right'
  * @prop {iconType} string
**/ 

var Icon = React.createClass({
  getDefaultProps: function() {
    return {
      iconSize: 'medium',
      iconPosition: 'left'
    };
  },

  render: function() {
    var iconClasses = `${this.props.iconSize} ${this.props.iconType} ${this.props.iconPosition}`;
    return (
      <i className={iconClasses}></i>
    );
  }
});

module.exports = Icon;
