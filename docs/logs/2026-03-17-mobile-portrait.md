# 2026-03-17 スマホ縦画面（Portrait）対応

## 設計方針
縦長画面は「スクロールする物語」として設計。
情報を縦に積み重ね、スクロールするごとに世界が深まる体験へ。

## 主な改善内容

### オペレーターカード復活
- 非表示(display:none)から横長バナー形式に変更
- 左: ピクセルアバター、右: 2x2ステータスグリッド
- ヒーロー直下でSPECTERの存在感を確立

### Operations を縦カードに再設計
- desktop: 6列グリッド（display:contents でラッパー透過）
- mobile: flex列でコード/タイプ→名前→リスク/報酬→ACCEPTボタン全幅
- HTMLに header-row / meta-row ラッパーを追加してレイアウトを両立

### City Map
- 高さ 240px → 300px（縦を活かしてより見えやすく）
- ツールチップ: モバイルはノード上方に表示（右端はみ出し防止）
- ツールチップ幅を測定して viewport を超えないよう制御

### Factions
- 1カラム全幅表示（非表示だったdescriptionを復活）
- 関係値バーがフル幅になり視覚インパクト最大

### セクション edge-to-edge
- border-left/right: none でスマホ画面端まで拡張
- サイバーパンクの無機質・広大感を強調

### タッチフィードバック
- :active で brightness(1.15) + scale(.97)
- 指が触れた瞬間に反応する体験

### ブレークポイント追加
- < 400px: 極小画面補正（iPhone SE等）

## ファイル変更
- `src/style.css` — モバイルメディアクエリ全面刷新 + <400px追加
- `index.html` — op-item に header-row / meta-row ラッパー追加
- `src/main.js` — City Map tooltip モバイル位置計算改善
