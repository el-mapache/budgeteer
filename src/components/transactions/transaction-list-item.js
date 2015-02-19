var React = require('react');
var DateFormatter = require('../../mixins/date-formatter.js');

var TransactionListItem = React.createClass({
  mixins: [DateFormatter],

  render: function() {
    var transaction = this.props.transaction;
console.log(transaction)
    return (
      <tr>
        <td className="collection-item">{transaction.title}</td>
        <td className="collection-item">{this.humanize(transaction.purchasedOn)}</td>
        <td className="collection-item">{transaction.User.firstName}</td>
        <td className="collection-item">{transaction.amount}</td>
        <td className="collection-item">{transaction.percentageToSplit}</td>
        <td className="collection-item">{transaction.category}</td>
        <td className="collection-item">{transaction.note}</td>
        <td className="collection-item">{this.humanize(transaction.createdAt)}</td>
      </tr>
    );
  }
});

module.exports = TransactionListItem;
