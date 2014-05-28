require(require('path').join('..', '..', '..', 'core', 'globals'));

var expect = require('chai').expect
  , parser = requireRoot('components/search/parser')
  , DateStubs = requireRoot('test/support/date_stubs')
  , stubDate = DateStubs.stubDate
  , unstubDate = DateStubs.unstubDate;

describe('SearchParser', function(){
  before(function(){
    stubDate(new Date('2014-04-10'));
  });

  after(unstubDate);

  describe('`show[s]` command', function(){
    describe('qualifiers', function() {
      it('defaults to `all`', function() {
        var actual = parser.parse('shows')
          , expected = {
              dateRange: {from: '1983-01-01', to: '2014-04-10'},
              qualifier: {arguments: [20], qualifier: 'all'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });

      it('accepts explicit `all`', function() {
        var actual = parser.parse('all shows')
          , expected = {
              dateRange: {from: '1983-01-01', to: '2014-04-10'},
              qualifier: {arguments: [20], qualifier: 'all'},
              sort: 'asc'
            };
        expect(actual).to.deep.equal(expected);
      });

      it('parses `first` with no arguments', function() {
        var actual = parser.parse('first shows')
          , expected = {
              dateRange: {from: '1983-01-01', to: '2014-04-10'},
              qualifier: {arguments: [1], qualifier: 'first'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });

      it('parses `first` with arguments', function() {
        var actual = parser.parse('first 7 shows')
          , expected = {
              dateRange: {from: '1983-01-01', to: '2014-04-10'},
              qualifier: {arguments: [7], qualifier: 'first'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });

      it('parses `last` with no arguments', function() {
        var actual = parser.parse('last shows')
          , expected = {
              dateRange: {from: '1983-01-01', to: '2014-04-10'},
              qualifier: {arguments: [1], qualifier: 'last'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });

      it('parses `last` with arguments', function() {
        var actual = parser.parse('last 7 shows')
          , expected = {
              dateRange: {from: '1983-01-01', to: '2014-04-10'},
              qualifier: {arguments: [7], qualifier: 'last'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });

      it('allows max 20 results', function() {
        var actual = parser.parse('last 200 shows')
          , expected = {
              dateRange: {from: '1983-01-01', to: '2014-04-10'},
              qualifier: {arguments: [20], qualifier: 'last'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });
    });

    describe('`on` filter', function() {
      it('is parsed correctly', function(){
        var actual = parser.parse('shows on 2012-12-30')
          , expected = {
              dateRange: {from: '2012-12-30', to: '2012-12-30'},
              qualifier: {arguments: [20], qualifier: 'all'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });
    });

    describe('`in` filter', function() {
      it('is parsed correctly', function(){
        var actual = parser.parse('shows in 2012')
          , expected = {
              dateRange: {from: '2012-01-01', to: '2013-01-01'},
              qualifier: {arguments: [20], qualifier: 'all'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });
    });

    describe('`between` filter', function() {
      it('is parsed correctly with years', function(){
        var actual = parser.parse('shows between 2012 2013')
          , expected = {
              dateRange: {from: '2012-01-01', to: '2013-01-01'},
              qualifier: {arguments: [20], qualifier: 'all'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });

      it('is parsed correctly with fully qualified dates', function(){
        var actual = parser.parse('shows between 2012-06-10 2012-08-16')
          , expected = {
              dateRange: {from: '2012-06-10', to: '2012-08-16'},
              qualifier: {arguments: [20], qualifier: 'all'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });
    });

    describe('`at` filter', function() {
      it('is parsed correctly', function() {
        var actual = parser.parse('all shows in 1997 at "madison square garden"')
          , expected = {
              at: 'madison square garden',
              dateRange: {from: '1997-01-01', to: '1998-01-01'},
              qualifier: {arguments: [20], qualifier: 'all'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });
    });

    describe('sort', function() {
      it('is ascending', function() {
        var actual = parser.parse('shows sort asc')
          , expected = {
              dateRange: {from: '1983-01-01', to: '2014-04-10'},
              qualifier: {arguments: [20], qualifier: 'all'},
              sort: 'asc'
            };

        expect(actual).to.deep.equal(expected);
      });

      it('is descending', function() {
        var actual = parser.parse('shows sort desc')
          , expected = {
              dateRange: {from: '1983-01-01', to: '2014-04-10'},
              qualifier: {arguments: [20], qualifier: 'all'},
              sort: 'desc'
            };

        expect(actual).to.deep.equal(expected);
      });
    });
  });
});
