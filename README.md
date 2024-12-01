# nextjs-with-api-template

`Next.js` + `Prisma.js` + `PlanetScale` +`Firebase Auth（匿名ログイン）` による Todo アプリのテンプレートです。

## 詳しい説明

こちらの記事で説明してます
https://zenn.dev/dl10yr/articles/nextjs-with-api-template

## ページ構成

- `/`: index
- `/todo/ssr`: SSR で DB から Todo を取得して表示してます
- `/todo/csr`: CSR で DB から Todo を取得して表示、フォームを使って投稿。

## API

Next.js でバックエンドの API も構築しています。firebase の`idToken`で`Bearer認証`しています。

- `GET /api/todos`
- `POST /api/todos`
- `DELETE /api/todos/{id}`

## 構築手順

```
1. git clone
2. yarn
3. firebaseClient.tsのCLIENT_CONFIGを変更
4. .env.sampleを.envにして内容変更
5. yarn prisma:push
6. yarn dev
```
