# Web Design Project — Claude 作業指示書

## プロジェクト概要

デザインにこだわった Web ページを開発するプロジェクト。
Vite によるホットリロード環境でスタイル変更を即座に確認しながら開発する。

---

## 技術スタック

| 役割 | ツール |
|------|--------|
| ビルド / HMR | [Vite](https://vitejs.dev/) |
| 言語 | HTML / CSS / JavaScript (バニラ) |
| パッケージ管理 | npm |
| ホスティング | AWS Amplify (main ブランチ自動デプロイ) |

---

## プロジェクト構造

```
web/
├── CLAUDE.md          # この指示書
├── amplify.yml        # AWS Amplify ビルド設定
├── docs/
│   └── logs/          # 作業ログ（YYYY-MM-DD-title.md 形式で追記）
├── index.html         # エントリポイント
├── src/
│   ├── style.css      # メインスタイル
│   └── main.js        # エントリ JS
├── public/            # 静的アセット
└── package.json
```

---

## 開発フロー

```bash
npm install       # 初回のみ
npm run dev       # ホットリロードサーバー起動 (http://localhost:5173)
npm run build     # 本番ビルド
npm run preview   # ビルド成果物のプレビュー
```

---

## Git / GitHub 運用ルール

### ブランチ戦略

| ブランチ | 用途 |
|----------|------|
| `main` | 安定版。直接コミット禁止 |
| `feature/機能名` | 機能追加・スタイル改修 |
| `fix/修正内容` | バグ修正 |
| `docs/YYYY-MM-DD` | CLAUDE.md・ドキュメント更新専用 |

### CLAUDE.md 更新ワークフロー

CLAUDE.md を変更するたびに以下を実行する:

```bash
git checkout -b docs/YYYY-MM-DD
git add CLAUDE.md
git commit -m "docs: CLAUDE.md を更新 — <変更概要>"
git push origin docs/YYYY-MM-DD
# → PR 作成 → 人間がマージ
```

### コミットプレフィックス

`feat:` / `fix:` / `style:` / `docs:` / `chore:` / `refactor:`

### マージ

- **マージは必ず人間が確認・実行する**
- Claude はブランチの実装・コミット・プッシュ・PR 作成までを担当

---

## 作業ログ

作業のたびに `docs/logs/YYYY-MM-DD-<タイトル>.md` を作成・更新する。

```markdown
# YYYY-MM-DD タイトル

## やったこと
- ...

## 次にやること
- ...
```

---

## デプロイ

### AWS Amplify
- `main` ブランチへのマージで **自動デプロイ** が走る
- ビルド設定は `amplify.yml` で管理（`npm ci` → `npm run build` → `dist/` を配信）
- デプロイ URL: Amplify Console で確認

### ローカル確認
```bash
npm run build    # dist/ を生成
npm run preview  # http://localhost:4173 でビルド成果物を確認
```

---

## 注意事項

- デザイン変更は `src/style.css` を主戦場にする
- JS ロジックと CSS は分離して管理する
- `public/` に画像・フォントなど静的アセットを置く
- `dist/` は `.gitignore` に含める（Amplify がビルドするため不要）
