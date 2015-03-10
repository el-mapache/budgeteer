var assign = require('object-assign');

exports.Budget = {
  defaults: {
    id: '',
    title: '',
    total: '',
    start_date: '',
    end_date: '',
    created_at: '',
    users: [],
    transactions: []
  },

  build: function(attrs) {
    attrs = attrs || {};
    return assign(this.defaults, attrs);
  }
};

exports.Transaction = function() {
  this.defaults = {
    id: '',
    category: '',
    purchasedOn: '',
    amount: '',
    percentageToSplit: '',
    title: '',
    description: '',
    createdAt: '',
    BudgetId: '',
    UserId: ''
  };

  this.build = function(attrs) {
    attrs = attrs || {};
    return assign(this.defaults, attrs);
  };
};

exports.User = function() {
  this.defaults =  {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    photo: ''
  };

  this.build = function(attrs) {
    attrs = attrs || {};
    return assign(this.defaults, attrs);
  };
};
