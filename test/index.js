var assert = require('assert');
var fs = require('fs');
var path = require('path');
var rewire = require('rewire');

var formatTextToTanzaku = require('../index');


var rewiredModule = rewire('../index');
var convertToZenkakuOnly = rewiredModule.__get__('convertToZenkakuOnly');
var stringToArray = rewiredModule.__get__('stringToArray');
var convertToTanzakuCharacters = rewiredModule.__get__('convertToTanzakuCharacters');

var konnichiwaSekaiTanzaku = fs.readFileSync(path.join(__dirname, 'support/konnichiwa-sekai.txt')).toString();
konnichiwaSekaiTanzaku = konnichiwaSekaiTanzaku.replace(/\n$/, '');
var helloWorldTanzaku = fs.readFileSync(path.join(__dirname, 'support/hello-world.txt')).toString();
helloWorldTanzaku = helloWorldTanzaku.replace(/\n$/, '');


describe('tanzaku', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof formatTextToTanzaku, 'function');
  });

  context('functions', function() {

    it('convertToZenkakuOnly', function() {
      var actual = convertToZenkakuOnly('あaａｱア 　');
      assert.strictEqual('あａａアア　　', actual);
    });

    it('stringToArray', function() {
      var actual = stringToArray('あ𩸽い');
      assert.deepEqual(['あ', '𩸽', 'い'], actual);
    });

    it('convertToTanzakuCharacters', function() {
      var actual = convertToTanzakuCharacters('あa-');
      assert.deepEqual(['あ', 'ａ', '｜'], actual);
    });
  });

  context('TANZAKU creation', function() {

    it('should format zenkaku-text', function() {
      var actual = formatTextToTanzaku('こんにちわ、世界！');
      assert.strictEqual(konnichiwaSekaiTanzaku, actual);
    });

    it('should format hankaku-text', function() {
      var actual = formatTextToTanzaku('Hello World!');
      assert.strictEqual(helloWorldTanzaku, actual);
    });
  });
});
