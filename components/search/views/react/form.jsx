/** @jsx React.DOM */

module.exports = React.createClass({
  handleKeyPress: function(e){
    if ('Enter' !== e.key) return;
    e.preventDefault();
    this.props.onSubmit(e.target.value);
  },

  render: function() {
    return (
      <form autoComplete="off" onKeyPress={this.handleKeyPress}>
        <span className="fui-search search-icon"></span>
        <label htmlFor="search">Search</label>
        <input autoFocus autoCapitalize="off" id="search" placeholder="all shows in 1997" type="text" />
      </form>
    );
  }
});
