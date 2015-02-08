var React = require('react');
var assign = require('object-assign');

var TextInput = React.createClass({
  getDefaultProps: function() {
    return {
      className: 'validate',
      labelState: 'inline'
    };
  },

  render: function() {
    return (
      <div onClick={this.focusInput} className="input-field col s8">
        <input onFocus={this.floatLabel}
               onBlur={this.floatLabel}
               onChange={this.handleChange}
               type="text"
               name={this.props.name}
               defaultValue={this.props.defaultValue}
               className={this.props.className}/>
        <label htmlFor={this.props.name}>{this.props.labelText}</label>
      </div>
    );
  },

  floatLabel: function(evt) {
    var label = this.getDOMNode().querySelector('label');
    var transforms = {};

    if (evt.type === 'focus') {
      transforms.transform = 'translateY(-130%)';
      transforms.fontSize = '0.85rem';
    } else {
      transforms.transform = 'translateY(0%)';
      transforms.fontSize = '1rem';
    }

    assign(label.style, transforms);
  },

  focusInput: function() {
    this.getDOMNode().querySelector('input').focus();
  },

  handleChange: function(evt) {
    this.setState({value: evt.target.value});
  }
});

module.exports = TextInput;
