require(require('path').join('..', '..', '..', '..', 'core', 'globals'));

var expect = require('chai').expect
  , QueryBuilders = requireRoot('core/lib/elasticsearch/query_builders');

describe('QueryBuilders', function() {
  describe('.buildSize', function() {
    it('is an elasticsearch size object', function() {
      var actual = QueryBuilders.buildSize(10)
        , expected = {size: 10};

      expect(actual).to.eql(expected);
    });
  });

  describe('.buildFilter', function() {
    it('is an elasticsearch filter object', function() {
        var filter = {range: {date: {from: new Date(2012, 0, 1), to: new Date(2012, 0, 1)}}}
        , actual = QueryBuilders.buildFilter(filter)
        , expected = {filter: filter};

      expect(actual).to.eql(expected);
    });
  });

  describe('.buildDateRange', function() {
    it('is an elasticsearch date range object', function() {
      var from = new Date(2012, 0, 1)
        , to = new Date(2013, 0, 1)
        , actual = QueryBuilders.buildDateRange(from, to)
        , expected = {range: {date: {from: from, to: to}}};

      expect(actual).to.eql(expected);
    });
  });

  describe('.buildSort', function() {
    it('is an elasticsearch sort object', function() {
      var actual = QueryBuilders.buildSort('date', 'desc')
        , expected = {sort: {date: {order: 'desc'}}};

      expect(actual).to.eql(expected);
    });
  });
});
