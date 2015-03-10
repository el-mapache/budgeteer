var React = require('react');
var assign = require('object-assign');

var TextInput = React.createClass({
  getDefaultProps: function() {
    return {
      className: 'validate',
      labelState: 'inline'
    };
  },

  getInitialState: function() {
    return {
      value: ''
    }
  },

  render: function() {
    this.state.value = this.props.value;

    return (
      <div onClick={this.focusInput} className="input-field col s8">
        <input onFocus={this.floatLabel}
               onBlur={this.floatLabel}
               onChange={this.props.onChange}
               type="text"
               name={this.props.name}
               value={this.props.value}
               className={this.props.className}/>
        <label htmlFor={this.props.name}>{this.props.labelText}</label>
      </div>
    );
  },

  // this should be a component with a declarative animation.
  // that way when a component loads with a value already assigned, it will
  // properly float.
  floatLabel: function(evt) {
    if (this.props.value) {
      return;
    }

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
  }
});

module.exports = TextInput;
