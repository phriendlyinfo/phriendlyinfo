/** @jsx React.DOM */

module.exports = React.createClass({
  render: function() {
    return (
      <section className="pagination">
        <ul className="pagination-main">
          <li><a href="">&larr; prev</a></li>
          <li className="pages">
            <ul>
              <li><a href="">1</a></li>
              <li>2</li>
              <li><a href="">3</a></li>
              <li>. . .</li>
              <li><a href="">166</a></li>
              <li><a href="">167</a></li>
            </ul>
          </li>
          <li><a href="">next &rarr;</a></li>
        </ul>
      </section>
    );
  }
});
