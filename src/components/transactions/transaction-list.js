var React = require('react');
var TransactionListItem = require('./transaction-list-item.js');
var TransactionStore = require('../../stores/transaction-store.js');
var StoreConsumer = require('../../mixins/store-consumer.js');


var TransactionList = React.createClass({
  mixins: [StoreConsumer.fromStore(TransactionStore)],

  getTransactions: function() {
    return this.state.transactions.length ? this.state.transactions : this.props.transactions;
  },

  getInitialState: function() {
    return {
      transactions: []
    };
  },

  render: function() {
    console.log('t', this.state.transactions)
    return (
      <div>
        <section className="row">
          <table className="col s10 collection bordered hoverable responsive-table card-panel z-depth-1">
            <thead>
              <tr>
                <td className="collection-item"><b>Title</b></td>
                <td className="collection-item"><b>Purchased On</b></td>
                <td className="collection-item"><b>Purchased By</b></td>
                <td className="collection-item"><b>Amount</b></td>
                <td className="collection-item"><b>Percentage Split</b></td>
                <td className="collection-item"><b>Category</b></td>
                <td className="collection-item"><b>Note</b></td>
                <td className="collection-item"><b>Added On</b></td>
              </tr>
            </thead>
            <tbody>
              {this.getTransactions().map(function(transaction) {
                return ( <TransactionListItem key={transaction.id} transaction={transaction} />);
              })}
            </tbody>
          </table>
        </section>
      </div>
    )
  }
});

module.exports = TransactionList;
