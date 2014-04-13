/** @jsx React.DOM */

module.exports = React.createClass({
  render: function() {
    return (
      <section className="results">
        <ul>
          {this.props.results.map(function(result){
            return (
              <li>
                <span className="date">{result.get('humanDate')}</span>
                <span className="location">
                  {result.get('venue').name} <br />
                  {result.get('venue').location.city}, {result.get('venue').location.state}
                </span>
              </li>
            );
          }, this)}
        </ul>
      </section>
    );
  }
});
