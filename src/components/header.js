var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper row">
            <div className="col s12">
              <a className="brand-logo">Logo</a>
              <ul className="left side-nav">
                <li><a>Sass</a></li>
                <li><a>Components</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
