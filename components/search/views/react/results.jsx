/** @jsx React.DOM */

module.exports = React.createClass({
  render: function() {
    var props = this.props
      , Header = props.Header
      , Pagination = props.Pagination
      , Result = props.Result
      , results = props.results;
    return (
      <section className="results">
        <Header results={results} />
        <Pagination results={results} />
        <ul>
          {
            results.results.map(function(result){
              return <Result result={result} />
            })
          }
        </ul>
      </section>
    );
  }
});
