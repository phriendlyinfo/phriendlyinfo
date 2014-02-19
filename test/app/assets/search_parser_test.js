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
}
