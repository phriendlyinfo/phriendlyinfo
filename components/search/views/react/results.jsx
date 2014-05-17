/** @jsx React.DOM */

module.exports = React.createClass({
  render: function() {
    return (
      <section className="results">
        <section className="heading">
          <h5><b>{this.props.total}</b> matches</h5>
        </section>
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
