var React = require('react');
var FormUtils = require('../../mixins/form-utils.js');

var NewTransaction = React.createClass({
  mixins: [FormUtils],

  getInitialState: function() {
    return {
      cost: null,
      purchaseDate: null,
      split: null,
      description: null,
      title: null
    };
  },

  render: function() {
    return (
      <form className="row" onSubmit={this.onSubmitHandler}>
        <div className="col s8 offset-m1">
          <div className="row">
            <TextInput labelText="Amount Spent" name="cost" value={this.state.cost} onChange={this.handleInputUpdate} />
            <TextInput labelText="Split Amount" onChange={this.handleInputUpdate} name="split" value={this.state.split} />
            <TextInput labelText="Name" onChange={this.handleInputUpdate} name="name" value={this.state.name} />
            <TextInput labelText="Note" onChange={this.handleInputUpdate} name="note" value={this.state.note} />
            <BudgetDatePicker labelText="Purchased On" className="col s6" onDayClick={this.setDay.bind(this, 'purchasedOn')} value={this.state.purchasedOn} />
          </div>
          <Button buttonType="submit" text="Add Transaction"/>
        </div>
      </form>
    );
  },

  onSubmitHandler: function(event) {
    event.preventDefault();
  }
});

module.exports = NewTransaction;
