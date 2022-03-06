# conken-contribution

## 🔰 Quick Start

### 環境変数の設定

#### 1. `.env.sample` を参考にして `.env` に以下の内容を記載する。

```
# 各サービスへのトークン情報を実装します。
GITHUB_ACCESS_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
LINE_NOTICE_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# 監視対象のGitHubのOrganizationのID
ORGANIZATION_ID=XXX

# 各サービスで何日前からの差分を計算するかを記載する
HTTP_FROM_AT=90
LINE_NOTIFY_FROM_AT=90
```

#### 2. `src/blackList.sample.ts` を参考にして `src/blackList.ts` Organizationに所属しているが監視対象から除外したいユーザーを指定する。

```ts
// Organizationに所属しているが監視対象から除外したいユーザーを指定する。
// export const BLACK_LIST_LOGIN_IDS = [
//   'XXXXXX',
//   'XXXXXX',
//   'XXXXXX',
//   'XXXXXX',
//   'XXXXXX',
//   'XXXXXX',
// ];
export const BLACK_LIST_LOGIN_IDS = [];
```

### サーバを起動

```
npm run start
```

### 疎通確認

> `サーバを起動` していない場合は以下のコマンドは動作しない。

####  - `HTTP` の疎通確認

```
npm run local-check-http
```

#### - `LINE Notify` の疎通確認

```
npm run local-check-line-notify
```
