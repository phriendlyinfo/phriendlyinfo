require(require('path').join('..', '..', '..', 'core', 'globals'));

var expect = require('chai').expect
  , parser = requireRoot('app/assets/js/search_parser');

describe('SearchParser', function(){
  describe('"show[s]" command', function(){
    itBehavesLikeACommand('shows');

    it('putting it all together now', function(){
      var search = 'first show in 2013'
        , actual = parser.parse(search)
        , expected = {
            command: 'show',
            qualifier: 'first',
            filters: [
              {filter: 'in', arguments: ['2013']}
            ]
          };

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('"song[s]" command', function(){
    itBehavesLikeACommand('song');

    it('putting it all together now', function(){
      var search = 'song fluffhead between 1996-02-15 1997-06-15 sort asc'
        , actual = parser.parse(search)
        , expected = {
            command: 'song',
            arguments: ['fluffhead'],
            filters: [
              {filter: 'between', arguments: ['1996-02-15', '1997-06-15']},
              {filter: 'sort', arguments: ['asc']}
            ]
          };

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('"venue[s]" command', function(){
    itBehavesLikeACommand('venue');

    it('putting it all together now', function(){
      var search = 'venue "madison square garden" in 1995 sort asc'
        , actual = parser.parse(search)
        , expected = {
            command: 'venue',
            arguments: ['madison square garden'],
            filters: [
              {filter: 'in', arguments: ['1995']},
              {filter: 'sort', arguments: ['asc']}
            ]
          };

      expect(actual).to.deep.equal(expected);
    });
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

  context('with arguments', function(){
    it('parses out a single word argument', function(){
      var actual = parser.parse($command + ' fluffhead')
        , expected = {
            command: $command,
            arguments: ['fluffhead']
          };

      expect(actual).to.deep.equal(expected);
    });

    it('parses out a multi word argument in quotes', function(){
      var actual = parser.parse($command + ' "madison square garden"')
        , expected = {
            command: $command,
            arguments: ['madison square garden']
          };

      expect(actual).to.deep.equal(expected);
    });

    it('ignores trailing whitespace', function(){
      var actual = parser.parse($command + ' fluffhead  \n ')
        , expected = {
            command: $command,
            arguments: ['fluffhead']
          };

      expect(actual).to.deep.equal(expected);
    });
  });

  context('with filters', function(){
    it('correctly parses the `in` filter', function(){
      var actual = parser.parse($command + ' in 2013')
        , expected = {
            command: $command,
            filters: [
              {filter: 'in', arguments: ['2013']}
            ]
          };

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses the `sort` filter', function(){
      var actual = parser.parse($command + ' sort asc')
        , expected = {
            command: $command,
            filters: [
              {filter: 'sort', arguments: ['asc']}
            ]
          };

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses filters with multiple arguments', function(){
      var actual = parser.parse($command + ' between 1995 1996')
        , expected = {
            command: $command,
            filters: [
              {filter: 'between', arguments: ['1995', '1996']}
            ]
          };

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses multiple filters', function(){
      var actual = parser.parse($command + ' in 2013 sort asc')
        , expected = {
            command: $command,
            filters: [
              {filter: 'in', arguments: ['2013']},
              {filter: 'sort', arguments: ['asc']}
            ]
          };

      expect(actual).to.deep.equal(expected);
    });
  });

  context('with qualifiers', function(){
    it('correctly parses the `all` qualifier', function(){
      var actual = parser.parse('all ' + $command)
        , expected = {
          command: $command,
          qualifier: 'all'
        };

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses the `first` qualifier', function(){
      var actual = parser.parse('first ' + $command)
        , expected = {
          command: $command,
          qualifier: 'first'
        };

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses the `last` qualifier', function(){
      var actual = parser.parse('last ' + $command)
        , expected = {
          command: $command,
          qualifier: 'last'
        };

      expect(actual).to.deep.equal(expected);
    });
  });
}
