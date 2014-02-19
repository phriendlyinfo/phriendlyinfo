require(require('path').join('..', '..', '..', 'core', 'globals'));

var expect = require('chai').expect
  , parser = requireRoot('app/assets/js/search_parser');

describe('SearchParser', function(){
  describe('"show" command', function(){
    it('is correctly parsed', function(){
      var actual = parser.parse('shows')
        , expected = {command: 'shows'};

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('"song" command', function(){
    it('is correctly parsed', function(){
      var actual = parser.parse('song')
        , expected = {command: 'song'};

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('"venue" command', function(){
    it('is correctly parsed', function(){
      var actual = parser.parse('venue')
        , expected = {command: 'venue'};

      expect(actual).to.deep.equal(expected);
    });
  });
});
