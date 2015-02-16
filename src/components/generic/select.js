var React = require('react');

var Select = React.createClass({
  getDefaultProps: function() {
    return {
      optionsForSelect: [{}],
      optionText: 'text',
      optionValue: 'value'
    };
  },

  getInitialState: function() {
    return {
      value: 'default'
    };
  },

  render: function() {
    var self = this;

    return (
      <div className="input-field col s8">
        <select className="browser-default" value={this.state.value}>
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
