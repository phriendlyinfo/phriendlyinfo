require(require('path').join('..', '..', '..', 'core', 'globals'));

var expect = require('chai').expect
  , parser = requireRoot('components/search/parser');

describe('SearchParser', function(){
  describe('"show[s]" command', function(){
    itBehavesLikeACommand('shows');

    it('putting it all together now', function(){
      var search = 'first show in 2013'
        , actual = parser.parse(search)
        , expected = {
            arguments: [],
            command: 'show',
            dateRange: ['2013', undefined],
            qualifier: {arguments: [], qualifier: 'first'},
            sort: 'asc'
          };

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('"song[s]" command', function(){
    itBehavesLikeACommand('song');

    it('putting it all together now', function(){
      var search = 'song fluffhead between 1996-02-15 1997-06-15 sort desc'
        , actual = parser.parse(search)
        , expected = {
            arguments: ['fluffhead'],
            command: 'song',
            dateRange: ['1996-02-15', '1997-06-15'],
            qualifier: {arguments: [], qualifier: 'all'},
            sort: 'desc'
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
            arguments: ['madison square garden'],
            command: 'venue',
            dateRange: ['1995', undefined],
            qualifier: {arguments: [], qualifier: 'all'},
            sort: 'asc'
          };

      expect(actual).to.deep.equal(expected);
    });
  });
});

function itBehavesLikeACommand($command){
  it('is correctly parsed', function(){
    var actual = parser.parse($command)
      , expected = {
          arguments: [],
          command: $command,
          dateRange: [],
          qualifier: {arguments: [], qualifier: 'all'},
          sort: 'asc'
        };

    expect(actual).to.deep.equal(expected);
  });

  context('with arguments', function(){
    it('parses out a single word argument', function(){
      var actual = parser.parse($command + ' fluffhead')
        , expected = {
            arguments: ['fluffhead'],
            command: $command,
            dateRange: [],
            qualifier: {arguments: [], qualifier: 'all'},
            sort: 'asc'
          };

      expect(actual).to.deep.equal(expected);
    });

    it('parses out a multi word argument in quotes', function(){
      var actual = parser.parse($command + ' "madison square garden"')
        , expected = {
            arguments: ['madison square garden'],
            command: $command,
            dateRange: [],
            qualifier: {arguments: [], qualifier: 'all'},
            sort: 'asc'
          };

      expect(actual).to.deep.equal(expected);
    });
  });

  context('with filters', function(){
    it('correctly parses the `in` filter', function(){
      var actual = parser.parse($command + ' in 2013')
        , expected = {
            arguments: [],
            command: $command,
            dateRange: ['2013', undefined],
            qualifier: {arguments: [], qualifier: 'all'},
            sort: 'asc'
          };

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses the `sort` filter', function(){
      var actual = parser.parse($command + ' sort desc')
        , expected = {
            arguments: [],
            command: $command,
            dateRange: [],
            qualifier: {arguments: [], qualifier: 'all'},
            sort: 'desc'
          };

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses filters with multiple arguments', function(){
      var actual = parser.parse($command + ' between 1995 1996')
        , expected = {
            arguments: [],
            command: $command,
            dateRange: ['1995', '1996'],
            qualifier: {arguments: [], qualifier: 'all'},
            sort: 'asc'
          };

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses multiple filters', function(){
      var actual = parser.parse($command + ' in 2013 sort desc')
        , expected = {
            arguments: [],
            command: $command,
            dateRange: ['2013', undefined],
            qualifier: {arguments: [], qualifier: 'all'},
            sort: 'desc'
          };

      expect(actual).to.deep.equal(expected);
    });
  });

  context('with qualifiers', function(){
    it('correctly parses the `first` qualifier', function(){
      var actual = parser.parse('first ' + $command)
        , expected = {
            arguments: [],
            command: $command,
            dateRange: [],
            qualifier: {arguments: [], qualifier: 'first'},
            sort: 'asc'
          };

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses the `first` qualifier with arguments', function(){
      var actual = parser.parse('first 7 ' + $command)
        , expected = {
            arguments: [],
            command: $command,
            dateRange: [],
            qualifier: {arguments: ['7'], qualifier: 'first'},
            sort: 'asc'
          };

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses the `last` qualifier', function(){
      var actual = parser.parse('last ' + $command)
        , expected = {
            arguments: [],
            command: $command,
            dateRange: [],
            qualifier: {arguments: [], qualifier: 'last'},
            sort: 'asc'
          };

      expect(actual).to.deep.equal(expected);
    });

    it('correctly parses the `last` qualifier with arguments', function(){
      var actual = parser.parse('last 5 ' + $command)
        , expected = {
            arguments: [],
            command: $command,
            dateRange: [],
            qualifier: {arguments: ['5'], qualifier: 'last'},
            sort: 'asc'
          };

      expect(actual).to.deep.equal(expected);
    });
  });
}
