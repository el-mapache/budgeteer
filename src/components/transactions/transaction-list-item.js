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
        <td className="collection-item">{this.humanize(transaction.purchasedOn)}</td>
        <td className="collection-item">{this._getUserNameFrom(transaction)}</td>
        <td className="collection-item">{transaction.amount}</td>
        <td className="collection-item">{transaction.percentageToSplit}</td>
        <td className="collection-item">{transaction.category}</td>
        <td className="collection-item">{transaction.note}</td>
        <td className="collection-item">{this.humanize(transaction.createdAt)}</td>
      </tr>
    );
  },

  _getUserNameFrom: function(transaction) {
    return (transaction.User && transaction.User.firstName) ||
           UserStore.getById(transaction.UserId).firstName;
  }
});

module.exports = TransactionListItem;
