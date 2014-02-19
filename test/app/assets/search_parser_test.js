require(require('path').join('..', '..', '..', 'core', 'globals'));

var expect = require('chai').expect
  , parser = requireRoot('app/assets/js/search_parser');

describe('SearchParser', function(){
  describe('"shows" command', function(){
    itBehavesLikeACommand('shows');
  });

  describe('"song" command', function(){
    itBehavesLikeACommand('song');
  });

  describe('"venue" command', function(){
    itBehavesLikeACommand('venue');
  });
});

function itBehavesLikeACommand($command){
  it('is correctly parsed', function(){
    var actual = parser.parse($command)
      , expected = {command: $command};

    expect(actual).to.deep.equal(expected);
  });

  it('removes surrounding whitespace', function(){
    var actual = parser.parse(' \n\n ' + $command + '  \n')
      , expected = {command: $command};

    expect(actual).to.deep.equal(expected);
  });

  context('with an argument', function(){
    it('parses out a single word argument', function(){
      var actual = parser.parse($command + ' fluffhead')
        , expected = {
            command: $command,
            argument: 'fluffhead'
          };

      expect(actual).to.deep.equal(expected);
    });

    it('parses out a multi word argument in quotes', function(){
      var actual = parser.parse($command + ' "madison square garden"')
        , expected = {
            command: $command,
            argument: 'madison square garden'
          };

      expect(actual).to.deep.equal(expected);
    });

    it('ignores trailing whitespace', function(){
      var actual = parser.parse($command + ' fluffhead  \n ')
        , expected = {
            command: $command,
            argument: 'fluffhead'
          };

      expect(actual).to.deep.equal(expected);
    });
  });
}
