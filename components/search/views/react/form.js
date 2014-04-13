/** @jsx React.DOM */

module.exports = React.createClass({displayName: 'exports',
  handleKeyPress: function(e){
    if ('Enter' !== e.key) return;
    e.preventDefault();
    this.props.onSubmit(e.target.value);
  },

  render: function() {
    return (
      React.DOM.form( {autoComplete:"off", onKeyPress:this.handleKeyPress}, 
        React.DOM.span( {className:"fui-search search-icon"}),
        React.DOM.label( {htmlFor:"search"}, "Search"),
        React.DOM.input( {autoFocus:true, autoCapitalize:"off", id:"search", placeholder:"all shows in 1997", type:"text"} )
      )
    );
  }
});
