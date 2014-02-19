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
  });
});
