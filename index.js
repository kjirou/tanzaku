var Moji = require('moji');


var TANZAKU_HEADER_LINES = ['\u250f\u2537\u2513', '\u2503\u3000\u2503'];
var TANZAKU_FOOTER_LINES = [ '\u2503\u3000\u2503', '\u2570\u031a\u2501\u251b\u207e\u207e'];
var SPECIAL_CHARACTERS = {
  ' ': '\u3000',
  // "、" を右上に
  '\u3001': '\ufe11',
  // "。" を右上に
  '\u3002': '\ufe12',
  // "！" を中央寄せに
  '\uff01': '\ufe15'
};

var formatTextToTanzaku = function formatTextToTanzaku(text) {
  var zenkakuText = new Moji(text).convert('HE', 'ZE').result;

  var lines = zenkakuText
    .split('')
    .map(function(chr) {
      if (chr in SPECIAL_CHARACTERS) {
        chr = SPECIAL_CHARACTERS[chr];
      }
      return '┃' + chr + '┃';
    })
  ;

  lines = TANZAKU_HEADER_LINES.concat(lines, TANZAKU_FOOTER_LINES);

  return lines.join('\n');
};


module.exports = formatTextToTanzaku;
