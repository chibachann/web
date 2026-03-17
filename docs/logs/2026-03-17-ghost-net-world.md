# 2026-03-17 GHOST.NET 世界観実装

## コンセプト転換
- CYBER//UI（ショーケース）→ GHOST.NET（地下ネットランナー組織のセキュアターミナル）
- 訪問者 = オペレーター SPECTER としてログイン済みという設定

## 追加した要素

### INTELティッカー
- ナビ直下に常設のスクロールニュース帯
- NEON CITYで起きる事件 10件をループ表示
- 赤=CRITICAL / オレンジ=WARNING / 白=通常

### オペレータープロフィール
- ヒーロー右側にSPECTERのカード
- ピクセルアートアバター（Canvas、グリッチアニメーション）
- NEON CITY専用時計（ローカル+4h）、セッション経過タイマー

### CITY NETWORK MAP (Canvas)
- 9ノードのネットワークグラフ
- ノード間をデータパケットがリアルタイムで流れる
- ホバーでセクター詳細ツールチップ（脅威・人口・支配勢力）
- 脅威レベルで色分け（cyan/green/orange/red/purple）

### AVAILABLE OPERATIONS
- 4作戦（EXTRACTION/SABOTAGE/INFILTRATION/RECON）
- リスクバーを脅威色で着色
- ACCEPTボタンでミッション受諾モーダル（3秒で自動閉幕）

### FACTION STATUS
- AXIOM CORP / GHOST COLLECTIVE / NEON SYNDICATE / FREE CIRCUIT
- 関係値バー + ステータスラベル

## リネーム
- CYBER//UI → GHOST.NET
- // BUTTONS → // COMMAND PROTOCOLS
- // CARDS → // SYSTEM NODES
- // INPUT → // SECURE COMM
- // BADGES → // ACCESS CLEARANCE
- // MISC → // SYSTEM DIAGNOSTICS
