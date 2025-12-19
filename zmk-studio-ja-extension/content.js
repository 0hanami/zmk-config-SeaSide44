// ZMK Studio 日本語翻訳 - 静的置換
const translations = {
  // === Behavior (動作タイプ) - 元の名前 + 補足説明 ===
  "Behavior:": "Behavior:",
  "Behavior": "Behavior",
  "Bluetooth": "Bluetooth - BT接続/ペアリング/切替",
  "Bootloader": "Bootloader - ファームウェア更新モードへ",
  "Caps Word": "Caps Word - 次の単語だけ大文字入力",
  "enc_key_press": "enc_key_press - ロータリーエンコーダー用",
  "External Power": "External Power - 外部デバイスへの給電ON/OFF",
  "Grave/Escape": "Grave/Escape - 通常Esc、Shift時は`",
  "Key Press": "Key Press - キー入力",
  "Key Repeat": "Key Repeat - 直前のキーを繰り返す",
  "Key Toggle": "Key Toggle - 押すたびにON/OFF切替",
  "Layer-Tap": "Layer-Tap - 長押しレイヤー/タップキー",
  "Mod-Tap": "Mod-Tap - 長押し修飾/タップキー",
  "Momentary Layer": "Momentary Layer - 一時レイヤー",
  "Mouse Key Press": "Mouse Key Press - マウスボタン入力",
  "mouse_move": "mouse_move - カーソル移動",
  "mouse_scroll": "mouse_scroll - スクロール操作",
  "None": "None - 無効",
  "Output Selection": "Output Selection - USB/BLE出力先を選択",
  "Reset": "Reset - キーボードを再起動",
  "Sticky Key": "Sticky Key - 次の1キーに修飾キーを適用",
  "Sticky Layer": "Sticky Layer - 次の1キー入力までレイヤー有効",
  "Studio Unlock": "Studio Unlock - ZMK Studioのロック解除",
  "To Layer": "To Layer - レイヤー移動",
  "Toggle Layer": "Toggle Layer - レイヤー切替",
  "Transparent": "Transparent - 透過",

  // === カスタムBehavior（キーマップで定義されたもの） ===
  "LAYER_TAP_TO_0": "LAYER_TAP_TO_0 - カスタム動作",
  "TO_LAYER_0": "TO_LAYER_0 - カスタム動作",

  // === Layer/Layout ===
  "Layer:": "レイヤー:",
  "Layer": "レイヤー",
  "Layers": "レイヤー",
  "Layout": "レイアウト",
  "New Layer Name": "新規レイヤー名",
  "Keymap Layer": "キーマップレイヤー",

  // === Key ===
  "Key:": "キー:",
  "Key": "キー",

  // === Modifiers ===
  "L Ctrl": "左Ctrl",
  "L Shift": "左Shift",
  "L Alt": "左Alt",
  "L GUI": "左GUI (Win/Cmd)",
  "R Ctrl": "右Ctrl",
  "R Shift": "右Shift",
  "R Alt": "右Alt",
  "R GUI": "右GUI (Win/Cmd)",
  "Implicit Modifiers": "暗黙の修飾キー",

  // === Actions ===
  "Save": "保存",
  "Discard": "破棄",
  "Undo": "元に戻す",
  "Redo": "やり直し",
  "Hide": "非表示",
  "Show": "表示",
  "Auto": "自動",

  // === Connection ===
  "Not connected": "未接続",
  "Select A Device:": "デバイスを選択:",
  "Select a connection type.": "接続方法を選択してください",
  "USB": "USB",
  "BLE": "BLE",
  "Welcome to ZMK Studio": "ZMK Studioへようこそ",
  "Unlock To Continue": "続行するにはロック解除",
  "Continue?": "続行しますか？",
  "User disconnected": "ユーザーが切断しました",

  // === Settings ===
  "Restore Stock Settings": "初期設定に戻す",
  "ZMK Studio": "ZMK Studio",

  // === Errors ===
  "Failed to save changes": "変更の保存に失敗しました",
  "Failed to discard changes": "変更の破棄に失敗しました",
  "Failed to connect to the chosen device": "選択したデバイスへの接続に失敗しました",
  "Failed to add layer:": "レイヤーの追加に失敗:",
  "Failed to remove layer:": "レイヤーの削除に失敗:",
  "Failed to change layer name:": "レイヤー名の変更に失敗:",
  "No keymap loaded": "キーマップが読み込まれていません",

  // === OS ===
  "Windows": "Windows",
  "Linux": "Linux",
  "Android": "Android",

  // === Misc ===
  "Unknown": "不明",
  "Notification": "通知",
  "Device": "デバイス",
  "Additional": "追加",
};

// テキストノードを走査して翻訳
function translateTextNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    if (text && translations[text]) {
      node.textContent = node.textContent.replace(text, translations[text]);
    }
  }
}

// select要素のoption翻訳
function translateSelectOptions() {
  document.querySelectorAll('select option').forEach(option => {
    const text = option.textContent.trim();
    if (text && translations[text]) {
      option.textContent = translations[text];
    }
  });
}

// 要素内のすべてのテキストを翻訳
function translateElement(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(translateTextNode);

  // placeholder, title, aria-label なども翻訳
  element.querySelectorAll('[placeholder], [title], [aria-label]').forEach(el => {
    ['placeholder', 'title', 'aria-label'].forEach(attr => {
      const value = el.getAttribute(attr);
      if (value && translations[value]) {
        el.setAttribute(attr, translations[value]);
      }
    });
  });

  // select内のoptionも翻訳
  translateSelectOptions();
}

// 初回翻訳
function initialTranslate() {
  translateElement(document.body);
}

// MutationObserverで動的に追加される要素も翻訳
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        translateElement(node);
      } else if (node.nodeType === Node.TEXT_NODE) {
        translateTextNode(node);
      }
    });
  });
});

// ページ読み込み完了後に実行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initialTranslate();
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
} else {
  initialTranslate();
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// 定期的に再翻訳（Reactの再レンダリング対策）
setInterval(initialTranslate, 1000);

console.log('ZMK Studio Japanese extension loaded');
