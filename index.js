var Moji = require('moji');


var TANZAKU_HEADER_LINES = ['\u250f\u2537\u2513', '\u2503\u3000\u2503'];
var TANZAKU_FOOTER_LINES = [ '\u2503\u3000\u2503', '\u2570\u031a\u2501\u251b\u207e\u207e'];
// 体裁を整えるための一対一の文字変換マップ、主に横向きを縦向きにしている
var SPECIAL_CHARACTERS = {
  // 半角スペースはMoji変換対象外だった
  ' ': '\u3000',
  // ダッシュ
  '\u2015': '\uff5c',
  // 全角三点リーダー
  '\u2026': '\ufe19',
  // "、"
  '\u3001': '\ufe11',
  // "。"
  '\u3002': '\ufe12',
  // 全角ハイフン
  '\u30fc': '\uff5c',
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
      return '\u2503' + chr + '\u2503';
    })
  ;

  lines = TANZAKU_HEADER_LINES.concat(lines, TANZAKU_FOOTER_LINES);

  return lines.join('\n');
};


module.exports = formatTextToTanzaku;
