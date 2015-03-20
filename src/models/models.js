var assign = require('object-assign');

exports.Budget = {
  defaults: {
    id: '',
    title: '',
    total: '',
    start_date: '',
    end_date: '',
    created_at: '',
    user_id: '',
    users: [],
    transactions: []
  },

  build: function(attrs) {
    attrs = attrs || {};
    return assign({}, this.defaults, attrs);
  }
};

exports.Transaction = {
  defaults: {
    id: '',
    category: '',
    purchased_on: '',
    amount: '',
    percentage_to_split: '',
    title: '',
    description: '',
    created_at: '',
    budget_id: '',
    user_id: ''
  },

  build: function(attrs) {
    attrs = attrs || {};
    return assign({}, this.defaults, attrs);
  }
};

exports.User = {
  defaults:  {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    photo: ''
  },

  build: function(attrs) {
    attrs = attrs || {};
    return assign({}, this.defaults, attrs);
  }
};
