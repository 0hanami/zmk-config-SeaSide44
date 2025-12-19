# ZMK Studio 日本語翻訳 Chrome拡張機能

ZMK Studio (https://zmk.studio) のUIを日本語に翻訳するChrome拡張機能です。

## インストール方法

1. Chromeで `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」をONにする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このフォルダ (`zmk-studio-ja-extension`) を選択

## 使い方

インストール後、https://zmk.studio にアクセスすると自動的にUIが日本語化されます。

## 翻訳内容

- Behavior（動作タイプ）の説明
- レイヤー関連の用語
- 修飾キーの名称
- 接続・設定関連のUI
- エラーメッセージ

## 翻訳を追加・修正する

`content.js` の `translations` オブジェクトを編集してください。

```javascript
const translations = {
  "English Text": "日本語テキスト",
  // ...
};
```

変更後、`chrome://extensions/` で拡張機能を再読み込みしてください。
