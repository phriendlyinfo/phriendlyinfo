/** @jsx React.DOM */

module.exports = React.createClass({
  render: function() {
    var result = this.props.result;
    return (
      <li>
        <span className="date">{result.get('humanDate')}</span>
        <span className="location">
          {result.get('venue').name} <br />
          {result.get('venue').location.city}, {result.get('venue').location.state}
        </span>
        <p className="show-notes" dangerouslySetInnerHTML={{__html: result.get('pnet').setlistNotes}} />
      </li>
    );
  }
});
