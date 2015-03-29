var React = require('react');
var DateFormatter = require('../../mixins/date-formatter.js');
var UserStore = require('../../stores/user-store.js');

var TransactionListItem = React.createClass({
  mixins: [DateFormatter],

  render: function() {
    var transaction = this.props.transaction;

    return (
      <tr>
        <td className="collection-item">{transaction.title}</td>
        <td className="collection-item">{this.humanize(transaction.purchased_on)}</td>
        <td className="collection-item">{this._getUserNameFrom(transaction)}</td>
        <td className="collection-item">{transaction.amount}</td>
        <td className="collection-item">{transaction.percentage_to_split}</td>
        <td className="collection-item">{transaction.category}</td>
        <td className="collection-item">{transaction.note}</td>
        <td className="collection-item">{this.humanize(transaction.createdAt)}</td>
      </tr>
    );
  },

  _getUserNameFrom: function(transaction) {
    return UserStore.get(transaction.user_id).first_name;
  }
});

module.exports = TransactionListItem;
