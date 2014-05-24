require(require('path').join('..', '..', '..', '..', 'core', 'globals'));

var expect = require('chai').expect
  , DateStubs = requireRoot('test/support/date_stubs')
  , stubDate = DateStubs.stubDate
  , unstubDate = DateStubs.unstubDate
  , DateUtils = requireRoot('core/lib/utils/date');

describe('DateUtils', function(){
  describe('.isCanonicalDate', function(){
    var isCanonicalDate = DateUtils.isCanonicalDate;

    it('is true if it is a string formatted as YYYY-MM-DD', function(){
      expect(isCanonicalDate()).to.be.false;
      expect(isCanonicalDate(new Date)).to.be.false;
      expect(isCanonicalDate('2014-1-1')).to.be.false;
      expect(isCanonicalDate('2014-01-01')).to.be.true;
    });
  });

  describe('.canonicalDate', function(){
    var canonicalDate = DateUtils.canonicalDate;

    afterEach(unstubDate);

    context('without an argument', function(){
      it('formats the current date as YYYY-MM-DD', function(){
        stubDate(new Date('2013-10-31'));
        expect(canonicalDate()).to.equal('2013-10-31');
      });
    });

    context('with an argument', function(){
      it('formats the date argument as YYYY-MM-DD', function(){
        var date = new Date(1997, 11, 15);
        expect(canonicalDate(date)).to.equal('1997-12-15');
      });

      it('pads dates whose month and/or day is a single digit with a leading 0', function(){
        var date = new Date(1997, 5, 12);
        expect(canonicalDate(date)).to.equal('1997-06-12');

        date = new Date(1997, 11, 6);
        expect(canonicalDate(date)).to.equal('1997-12-06');

        date = new Date(1997, 5, 6);
        expect(canonicalDate(date)).to.equal('1997-06-06');
      })
    });
  });

  describe('.parse', function() {
    var parse = DateUtils.parse;

    context('valid date string in the form of YYYY-MM-DD', function() {
      it('is parsed into a date', function() {
        var date1 = parse('2013-08-03')
          , date2 = parse('2013-8-3');

        expect(date1).to.be.instanceof(Date);
        expect(date2).to.be.instanceof(Date);

        expect(date1.getFullYear()).to.equal(2013);
        expect(date2.getFullYear()).to.equal(2013);

        expect(date1.getMonth()).to.equal(7);
        expect(date2.getMonth()).to.equal(7);

        expect(date1.getDate()).to.equal(3);
        expect(date2.getDate()).to.equal(3);
      });
    });

    context('valid date string in the form of YYYY', function() {
      it('is parsed into a date', function() {
        var date = parse('2013');

        expect(date.getFullYear()).to.equal(2013);
        expect(date.getMonth()).to.equal(0);
        expect(date.getDate()).to.equal(1);
      });
    });

    context('invalid date string', function() {
      it('throws an error', function() {
        expect(parse.bind(null, '20130801')).to.throw(Error, "Unable to parse date string 20130801");
      });
    });
  });

  describe('.increment', function() {
    var increment = DateUtils.increment;

    it('increments a date by a year', function() {
      var date = new Date(2012, 0, 1)
      date = increment(date, {year: 1});

      expect(date.getFullYear()).to.equal(2013);
      expect(date.getMonth()).to.equal(0);
      expect(date.getDate()).to.equal(1);
    });

    it('increments a date by a month', function() {
      var date = new Date(2012, 0, 1)
      date = increment(date, {month: 1});

      expect(date.getFullYear()).to.equal(2012);
      expect(date.getMonth()).to.equal(1);
      expect(date.getDate()).to.equal(1);
    });

    it('increments a date by a day', function() {
      var date = new Date(2012, 0, 1)
      date = increment(date, {day: 1});

      expect(date.getFullYear()).to.equal(2012);
      expect(date.getMonth()).to.equal(0);
      expect(date.getDate()).to.equal(2);
    });
  });
});
