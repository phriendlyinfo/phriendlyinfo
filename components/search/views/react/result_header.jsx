/** @jsx React.DOM */

module.exports = React.createClass({
  render: function() {
    return (
      <section className="heading">
        <h5><b>{this.props.results.total}</b> matches</h5>
      </section>
    );
  }
});
