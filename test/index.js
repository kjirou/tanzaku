var assert = require('assert');
var fs = require('fs');
var path = require('path');

var formatTextToTanzaku = require('../index');

var konnichiwaSekaiTanzaku = fs.readFileSync(path.join(__dirname, 'support/konnichiwa-sekai.txt')).toString();
konnichiwaSekaiTanzaku = konnichiwaSekaiTanzaku.replace(/\n$/, '');
var helloWorldTanzaku = fs.readFileSync(path.join(__dirname, 'support/hello-world.txt')).toString();
helloWorldTanzaku = helloWorldTanzaku.replace(/\n$/, '');


describe('tanzaku', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof formatTextToTanzaku, 'function');
  });

  it('should format zenkaku-text', function() {
    var actual = formatTextToTanzaku('こんにちわ、世界！');
    assert.strictEqual(konnichiwaSekaiTanzaku, actual);
  });

  it('should format hankaku-text', function() {
    var actual = formatTextToTanzaku('Hello World!');
    assert.strictEqual(helloWorldTanzaku, actual);
  });
});
