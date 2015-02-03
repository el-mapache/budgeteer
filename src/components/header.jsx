var React = require('react');

var Header = React.createClass({
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper row">
            <div className="col s12">
              <a href="#!" className="brand-logo">Logo</a>
              <ul className="left side-nav">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="components.html">Components</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
