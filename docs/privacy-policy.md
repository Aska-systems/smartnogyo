# プライバシーポリシーページ 管理手順書

本サイトで公開しているアプリのプライバシーポリシーページについて、地区の追加・内容の更新・公開の手順をまとめたものです。

## 1. 仕組み

プライバシーポリシーは **アプリごと・提供地区ごと** に別ページで公開します。URL は次の形式です。

```
https://aska-intelligence.com/smartnogyo/privacy-policy/<アプリ名>/<地区名>
```

例：GAPLOG・相馬村 → `https://aska-intelligence.com/smartnogyo/privacy-policy/gaplog/soumamura`

関係するファイルは次の 2 種類です。

| ファイル | 役割 |
| --- | --- |
| `components/privacy/GaplogPrivacyPolicy.tsx` | GAPLOG のポリシー**本文**（全地区共通）。ここを直すと全地区のページに反映されます。 |
| `app/privacy-policy/gaplog/<地区名>/page.tsx` | 地区ごとのページ。**制定日・問い合わせ先（組合名）・電話番号**だけを持ちます。 |

フォルダ名がそのまま URL になります（`app/privacy-policy/gaplog/soumamura/` → `/privacy-policy/gaplog/soumamura`）。

なお、これらのページはトップページからリンクしていません。URL を直接開くか、アプリ内やストア掲載情報からリンクして使います。

## 2. 事前準備（初回のみ）

- Node.js をインストールしておく
- リポジトリ `Aska-systems/smartnogyo` を取得し、`main` ブランチで依存パッケージを入れる

```bash
git clone git@github.com:Aska-systems/smartnogyo.git
cd smartnogyo
npm install
```

- GitHub へ push できる権限（SSH 鍵）が必要です。公開作業で `gh-pages` ブランチへ push するためです。

## 3. 新しい地区を追加する

例として「〇〇村農業協同組合」を、地区名 `marumaru` で追加する場合の手順です。

### 3-1. 地区名（URL の一部）を決める

- 半角英小文字のローマ字にします（例：`soumamura`、`hirosaki`）。
- 一度公開してアプリやストアに登録した URL は **後から変えない** でください。リンク切れになります。

### 3-2. 既存の地区フォルダをコピーする

```bash
cp -r app/privacy-policy/gaplog/soumamura app/privacy-policy/gaplog/marumaru
```

### 3-3. コピーした `page.tsx` を書き換える

`app/privacy-policy/gaplog/marumaru/page.tsx` を開き、次の箇所を書き換えます。

```tsx
const UPDATED = '制定日：2026年11月1日'            // ← その地区の制定日
const SUPPORT_ORG = '〇〇村農業協同組合'            // ← 問い合わせ先の組合名
const SUPPORT_TEL = '0000-00-0000'                 // ← 問い合わせ先の電話番号
```

さらに、`openGraph` の `url` の末尾を新しい地区名に変えます。

```tsx
url: 'https://aska-intelligence.com/smartnogyo/privacy-policy/gaplog/marumaru',
```

本文中の「当組合」「お問い合わせ窓口」などは、ここで設定した組合名・電話番号が自動で入ります。

### 3-4. 表示を確認して公開する

「6. 表示確認と公開」の手順に進みます。

## 4. 地区によって本文が異なる場合

本文（取得する情報・利用目的・委託先など）は全地区共通です。ある地区だけ内容が違う場合は、**共通の本文ファイルを直接書き換えないでください。** 直すと、全地区のページが変わってしまいます。

次のどちらかで対応します（開発担当者の作業です）。

- **違いが一部だけの場合**：`GaplogPrivacyPolicy.tsx` に設定項目を追加します（例：委託先の一覧を引数で受け取る）。違いのある地区の `page.tsx` だけで、その値を指定します。
- **大きく異なる場合**：`GaplogPrivacyPolicy.tsx` をコピーして別の本文ファイル（例：`GaplogPrivacyPolicyMarumaru.tsx`）を作り、その地区の `page.tsx` から使います。

## 5. 既存のポリシーを改定する

### 5-1. 全地区共通の内容を改定する

1. `components/privacy/GaplogPrivacyPolicy.tsx` の該当箇所の文章を修正します。
2. 改定した地区の `page.tsx` の `UPDATED` に改定日を追記します。

   ```tsx
   const UPDATED = '制定日：2026年10月2日／最終改定日：2027年4月1日'
   ```

3. **すべての地区のページ** に変更が反映されます。各地区の組合へ改定内容を共有してください。

### 5-2. 特定の地区の問い合わせ先・電話番号を変える

その地区の `page.tsx` の `SUPPORT_ORG` / `SUPPORT_TEL` だけを書き換えます。

### 5-3. 改定時の注意

- ポリシー本文の 8 章では「重要な変更は本サービス上でお知らせします」と定めています。重要な変更の場合は、アプリ側でのお知らせも手配してください。
- 改定前の文面を残しておく必要がある場合は、公開前に Git の履歴（コミット）で確認できます。改定ごとに 1 コミットにまとめてください。

## 6. 表示確認と公開

### 6-1. 手元で表示を確認する

```bash
npm run dev
```

ブラウザで次の URL を開き、内容を確認します（`marumaru` は追加した地区名）。

```
http://localhost:3000/smartnogyo/privacy-policy/gaplog/marumaru
```

確認すること：

- 組合名・電話番号・制定日が正しいか
- 1〜9 章がすべて表示されているか
- スマートフォンの画面幅でも崩れていないか（ブラウザの開発者ツールで幅を狭めて確認）

確認したら `Ctrl + C` で停止します。

### 6-2. ビルドを確認する

> **注意：`npm run dev` を動かしたまま `npm run build` を実行しないでください。**
> 両方が同じ `.next` フォルダを使うため、開発サーバーが 500 エラーを返したり、ビルドが失敗したりします。
> 必ず開発サーバーを `Ctrl + C` で止めてから実行してください。

```bash
npm run build
```

エラーが出ないこと、出力される一覧に `/privacy-policy/gaplog/marumaru` が含まれることを確認します。

### 6-3. 変更をコミットする

```bash
git add app/privacy-policy components/privacy
git commit -m "feat: add GAPLOG privacy policy for marumaru"
git push origin main
```

### 6-4. 公開する

```bash
npm run deploy
```

ビルド結果が `gh-pages` ブランチに送られ、GitHub Pages で公開されます。反映まで数分かかることがあります。

### 6-5. 公開後の確認

本番 URL を開き、表示されることを確認します。

```
https://aska-intelligence.com/smartnogyo/privacy-policy/gaplog/marumaru
```

確認後、この URL をアプリの設定やストア（App Store / Google Play）の掲載情報に登録します。

## 7. 新しいアプリのポリシーを追加する場合

GAPLOG 以外のアプリを追加する場合は、次の構成にそろえます。

- 本文：`components/privacy/<アプリ名>PrivacyPolicy.tsx`
- 地区ページ：`app/privacy-policy/<アプリ名(半角英小文字)>/<地区名>/page.tsx`

GAPLOG のファイルを参考に作成してください。作成後の確認・公開手順は「6. 表示確認と公開」と同じです。

## 8. 困ったとき

| 症状 | 確認すること |
| --- | --- |
| 公開後に 404 になる | フォルダ名と URL の綴りが一致しているか、`npm run deploy` を実行したか、数分待ったか |
| `npm run build` でエラーになる | `page.tsx` の引用符 `'` の閉じ忘れ、`import` 行を消していないか |
| `Cannot find module './xxx.js'` などのエラーが出る／開発サーバーが 500 エラーになる | 開発サーバーを動かしたままビルドしていないか。開発サーバーを止め、`rm -rf .next` を実行してからやり直す |
| 他の地区の表示まで変わった | 共通本文 `GaplogPrivacyPolicy.tsx` を書き換えていないか（「4. 地区によって本文が異なる場合」を参照） |
| `npm run deploy` で push に失敗する | GitHub への push 権限（SSH 鍵）があるか |
