/** @jsx React.DOM */

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.DOM.section( {className:"results"}, 
        React.DOM.ul(null, 
          this.props.results.map(function(result){
            return (
              React.DOM.li(null, 
                React.DOM.span( {className:"date"}, result.get('humanDate')),
                React.DOM.span( {className:"location"}, 
                  result.get('venue').name, " ", React.DOM.br(null ),
                  result.get('venue').location.city,", ", result.get('venue').location.state
                )
              )
            );
          }, this)
        )
      )
    );
  }
});
