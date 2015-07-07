# tanzaku

[![npm version](https://badge.fury.io/js/tanzaku.svg)](http://badge.fury.io/js/tanzaku)

Format text like japanese TANZAKU


## Usage
### In Command Line
```bash
npm install -g tanzaku
tanzaku 'Hello World!'
┏┷┓
┃　┃
┃Ｈ┃
┃ｅ┃
┃ｌ┃
┃ｌ┃
┃ｏ┃
┃　┃
┃Ｗ┃
┃ｏ┃
┃ｒ┃
┃ｌ┃
┃ｄ┃
┃︕┃
┃　┃
╰̚━┛⁾⁾
```

### In JavaScript
```bash
npm install --save tanzaku
```

```
var tanzaku = require('tanzaku');

console.log(tanzaku('Hello World!'));
```


## Refs
短冊メーカー(Tanzaku Generator):
http://tanzaku.ch3cooh.jp/
