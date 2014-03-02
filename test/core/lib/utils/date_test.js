require(require('path').join('..', '..', '..', '..', 'core', 'globals'));

var expect = require('chai').expect
  , DateStubs = requireRoot('test/support/date_stubs')
  , stubDate = DateStubs.stubDate
  , unstubDate = DateStubs.unstubDate
  , DateUtils = requireRoot('core/lib/utils/date')
  , canonicalDate = DateUtils.canonicalDate
  , isCanonicalDate = DateUtils.isCanonicalDate;

describe('DateUtils', function(){
  describe('#isCanonicalDate', function(){
    it('is true if it is a string formatted as YYYY-MM-DD', function(){
      expect(isCanonicalDate()).to.be.false;
      expect(isCanonicalDate(new Date)).to.be.false;
      expect(isCanonicalDate('2014-1-1')).to.be.false;
      expect(isCanonicalDate('2014-01-01')).to.be.true;
    });
  });

  describe('#canonicalDate', function(){
    afterEach(unstubDate);

    context('without an argument', function(){
      it('formats the current date as YYYY-MM-DD', function(){
        stubDate('2013-10-31');
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
});
