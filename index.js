/* @flow */

var Moji = require('moji');


var TANZAKU_HEADER_LINES = ['\u250f\u2537\u2513', '\u2503\u3000\u2503'];
var TANZAKU_FOOTER_LINES = [ '\u2503\u3000\u2503', '\u2570\u031a\u2501\u251b\u207e\u207e'];
// 体裁を整えるための一対一の文字変換マップ、主に横向きを縦向きにしている
var SPECIAL_CHARACTERS = {
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
  // 全角ハイフンマイナス
  '\uff0d': '\uff5c',
  // "！" を中央寄せに
  '\uff01': '\ufe15'
};

var convertToZenkakuOnly = function convertToZenkakuOnly(text/*: string*/)/*: string*/ {
  return new Moji(text).convert(['HS', 'ZS'], ['HE', 'ZE'], ['HK', 'ZK']).result;
};

// Against surrogate pair
// Ref) http://qiita.com/YusukeHirao/items/2f0fb8d5bbb981101be0
var ONE_CHARACTER_MATCHER = /[\ud800-\udbff][\udc00-\udfff]|[^\ud800-\udfff]/g;
var stringToArray = function stringToArray(str/*: string*/)/*: Array<string>*/ {
  return str.match(ONE_CHARACTER_MATCHER) || [];
};

/**
 * @param {string} text
 * @return {Array}
 */
var convertToTanzakuCharacters = function convertToTanzakuCharacters(text/*: string*/)/*: Array<string>*/ {
  var zenkakuText = convertToZenkakuOnly(text);
  return stringToArray(zenkakuText)
    .map(function(chr) {
      if (chr in SPECIAL_CHARACTERS) {
        chr = SPECIAL_CHARACTERS[chr];
      }
      return chr;
    })
  ;
};

var formatTextToTanzaku = function formatTextToTanzaku(text/*: string*/)/*: string*/ {
  var lines = convertToTanzakuCharacters(text)
    .map(function(chr) {
      return '\u2503' + chr + '\u2503';
    })
  ;
  lines = TANZAKU_HEADER_LINES.concat(lines, TANZAKU_FOOTER_LINES);
  return lines.join('\n');
};


module.exports = formatTextToTanzaku;
