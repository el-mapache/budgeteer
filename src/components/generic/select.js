var React = require('react');

var Select = React.createClass({
  getDefaultProps: function() {
    return {
      optionsForSelect: [{}],
      optionText: 'text',
      optionValue: 'value'
    };
  },

  render: function() {
    var self = this;
    var selected = this.props.value || 'default';

    return (
      <div className="input-field col s8">
        <select className="browser-default" onChange={this.props.handleSelect} value={selected}>
          <option value="default" disabled>Category</option>
          {this.props.optionsForSelect.map(function(option) {
            return (
              <option key={option[self.props.optionValue]}
                      onClick={self.handleOptionSelect}
                      value={option[self.props.optionValue]}>
                {option[self.props.optionText]}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
});

module.exports = Select;
