require(require('path').join('..', '..', '..', 'core', 'globals'));

var expect = require('chai').expect
  , parser = requireRoot('app/assets/js/search_parser');

describe('SearchParser', function(){
  context('commands', function(){
    it('correctly parses "shows"', function(){
      var actual = parser.parse('shows')
        , expected = {command: 'shows'};

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses "song"', function(){
      var actual = parser.parse('song')
        , expected = {command: 'song'};

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses "venue"', function(){
      var actual = parser.parse('venue')
        , expected = {command: 'venue'};

      expect(actual).to.deep.equal(expected);
    });
  });
});
