require(require('path').join('..', '..', '..', 'core', 'globals'));

var expect = require('chai').expect
  , DateStubs = requireRoot('test/support/date_stubs')
  , stubDate = DateStubs.stubDate
  , unstubDate = DateStubs.unstubDate
  , toQuery = requireRoot('components/search/conversion').toQuery
  , canonicalDate = requireRoot('core/lib/utils/date').canonicalDate;

describe('Conversion', function(){
  describe('#toQuery', function(){
    describe('#show[s]', function(){
      beforeEach(function(){
        stubDate('2014-02-05');
      });

      afterEach(unstubDate);

      it('will look up all shows', function(){
        var search = {command: 'shows'}
          , actual = toQuery(search)
          , expected = {
              size: 20,
              filter: {
                range: {
                  date: {
                    from: '1983-01-01',
                    to: '2014-02-05'
                  }
                }
              },
              sort: [
                {date: {order: 'asc'}}
              ]
            };

        expect(actual).to.deep.equal(expected);
      });

      it('will look up the first show', function(){
        var search = {command: 'shows', qualifier: {qualifier: 'first', arguments: []}}
          , actual = toQuery(search)
          , expected = {
              size: 1,
              filter: {
                range: {
                  date: {
                    from: '1983-01-01',
                    to: '2014-02-05'
                  }
                }
              },
              sort: [
                {date: {order: 'asc'}}
              ]
            };

        expect(actual).to.deep.equal(expected);
      });

      it('will look up the first N shows', function(){
        var search = {command: 'shows', qualifier: {qualifier: 'first', arguments: ['5']}}
          , actual = toQuery(search)
          , expected = {
              size: 5,
              filter: {
                range: {
                  date: {
                    from: '1983-01-01',
                    to: '2014-02-05'
                  }
                }
              },
              sort: [
                {date: {order: 'asc'}}
              ]
            };

        expect(actual).to.deep.equal(expected);
      });

      it('will look up the last show', function(){
        var search = {command: 'shows', qualifier: {qualifier: 'last', arguments: []}}
          , actual = toQuery(search)
          , expected = {
              size: 1,
              filter: {
                range: {
                  date: {
                    from: '1983-01-01',
                    to: '2014-02-05'
                  }
                }
              },
              sort: [
                {date: {order: 'desc'}}
              ]
            };

        expect(actual).to.deep.equal(expected);
      });

      it('will look up the last N shows', function(){
        var search = {command: 'shows', qualifier: {qualifier: 'last', arguments: ['10']}}
          , actual = toQuery(search)
          , expected = {
              size: 10,
              filter: {
                range: {
                  date: {
                    from: '1983-01-01',
                    to: '2014-02-05'
                  }
                }
              },
              sort: [
                {date: {order: 'desc'}}
              ]
            };

        expect(actual).to.deep.equal(expected);
      });

    });
  });
});
