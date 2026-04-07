# GODA BRIDGE — TikTok予約専用LP

GRAVITATE OSAKA のTikTok集客向け予約専用ランディングページ。

## ファイル構成

```
04_LP/
├── index.html      ← LP本体（7セクション）
├── style.css       ← スタイル
├── script.js       ← インタラクション
├── SPEC.md         ← 設計仕様書
└── assets/
    ├── video/
    │   └── hero.mp4        ← ← ← 差し替え必要
    └── img/
        └── hero-poster.jpg ← ← ← 差し替え必要
```

## 差し替えが必要な箇所

| 場所 | ファイル | 内容 |
|------|---------|------|
| Hero動画 | `assets/video/hero.mp4` | 吊り橋映像（MP4・H.264・10MB以内） |
| ポスター画像 | `assets/img/hero-poster.jpg` | 動画読み込み前の静止画 |
| TikTok埋め込み | `index.html` Section05 | 公式埋め込みコードに差し替え |
| Googleマップ | `index.html` Section06 | 正確な座標でiframe URLを更新 |
| 天気ウィジェット | `index.html` Section06 | アウトドア天気.jpの埋め込みコード |
| 予約URL | `index.html` Section07 | `href="#booking-url"` を実際のURLに |
| アクティビティ料金 | `index.html` Section04 | 各`data-price`属性を更新 |

## GitHub Pages 公開手順

```bash
# 1. このフォルダで初期化
git init
git add .
git commit -m "feat: GODA BRIDGE LP 初回リリース"

# 2. GitHubでリポジトリを新規作成後
git remote add origin https://github.com/<username>/gravitate-osaka-lp.git
git branch -M main
git push -u origin main

# 3. GitHub Pages を有効化
# Settings → Pages → Source: main / root → Save
# → https://<username>.github.io/gravitate-osaka-lp/ で公開
```

## デザイン仕様

- **コンセプト**: スリルの予告
- **カラー**: #0A0A0A / #FF5500 / #D4A843
- **フォント**: Bebas Neue / Oswald / Noto Sans JP
- **技術**: HTML5 + Pure CSS + Vanilla JS（依存ゼロ）
