# GHOST.NET — Secure Terminal

> 2077年。コーポレートが支配する都市 NEON CITY。
> ここは地下ネットランナー組織 **Ghost Collective** の秘密ターミナル。
> オペレーター SPECTER としてシステムにアクセスせよ。

---

## Overview

サイバーパンクの世界観を持つインタラクティブ Web 作品。
架空の都市・組織・作戦情報をリアルタイムで表示するターミナル UI。

**Live:** [AWS Amplify でデプロイ済み](#deploy)

![GHOST.NET screenshot](docs/screenshot.png)

---

## Features

| 機能 | 説明 |
|---|---|
| **INTEL Ticker** | NEON CITY の事件情報がリアルタイムスクロール |
| **Operator Profile** | SPECTER のステータス・ピクセルアバター・セッションタイマー |
| **City Network Map** | 9セクターのネットワークグラフ。パケット流動アニメーション＋ホバー詳細 |
| **Operations Board** | 受注可能作戦の一覧。ACCEPT でミッション受諾インタラクション |
| **Faction Status** | 4勢力の関係値をリアルタイム表示 |
| **BYPASS → VOID** | BYPASS ボタンで異次元（VOID SECTOR）へのトランジション |
| **Matrix Rain** | 背景に流れるカタカナ＋英数字マトリックス |
| **Glitch / Scanlines** | CRT モニター再現エフェクト |
| **Swipe Navigation** | モバイルで左右スワイプによるセクション移動 |
| **Portrait Mobile** | スマホ縦画面に最適化されたレイアウト |

---

## Tech Stack

| 役割 | 技術 |
|---|---|
| Build / HMR | [Vite](https://vitejs.dev/) v6 |
| 言語 | HTML / CSS / JavaScript (Vanilla) |
| フォント | Orbitron · Space Mono (Google Fonts) |
| ホスティング | AWS Amplify |
| パッケージ管理 | npm |

フレームワーク・ライブラリ依存ゼロ。素の Web 技術のみで構築。

---

## Getting Started

```bash
# 依存インストール
npm install

# 開発サーバー起動（ホットリロード）
npm run dev
# → http://localhost:5173

# 本番ビルド
npm run build

# ビルド成果物プレビュー
npm run preview
```

---

## Project Structure

```
web/
├── index.html          # エントリポイント・全コンポーネント HTML
├── src/
│   ├── style.css       # 全スタイル（CSS カスタムプロパティ・アニメーション）
│   └── main.js         # インタラクション・Canvas アニメーション
├── public/             # 静的アセット
├── amplify.yml         # AWS Amplify ビルド設定
├── docs/
│   └── logs/           # 作業ログ（実装記録）
└── CLAUDE.md           # Claude 作業指示書
```

---

## World

```
NEON CITY — 2077

  SECTORS          THREAT      CONTROL
  ──────────────────────────────────────
  ALPHA  Corporate District  CAUTION   AXIOM CORP
  SIGMA  Financial Core      CLEAR     AXIOM CORP
  BETA   Neon Markets        CLEAR     NEON SYNDICATE
  DELTA  Central Hub         CAUTION   CONTESTED
  GAMMA  Industrial Zone     DANGER    AXIOM CORP
  ETA    Slum District       DANGER    FREE CIRCUIT
  THETA  Underground         SAFE      GHOST COLLECTIVE ← HERE
  ZETA   Harbor Front        CAUTION   NEON SYNDICATE
  NULL   VOID SECTOR         ????      UNKNOWN

  FACTIONS
  ──────────────────────────────────────
  AXIOM CORP       ████░░░░░░  HOSTILE
  GHOST COLLECTIVE ██████████  ALLIED
  NEON SYNDICATE   █████░░░░░  NEUTRAL
  FREE CIRCUIT     ███████░░░  FRIENDLY
```

---

## Branch Strategy

| ブランチ | 用途 |
|---|---|
| `main` | 安定版・Amplify 自動デプロイ |
| `feature/xxx` | 機能追加・デザイン改修 |
| `fix/xxx` | バグ修正 |
| `docs/xxx` | ドキュメント更新 |

マージは人間が確認・実行。

---

## Deploy

AWS Amplify で `main` ブランチを自動デプロイ。
PR → マージ → 数分で本番反映。

ビルド設定は [`amplify.yml`](./amplify.yml) を参照。

---

## License

Private project.
