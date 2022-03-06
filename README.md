# conken-contribution

## 🤔 どんなシステム

`npm script` 1つで Organizationに所属しているユーザーの **Contribution数** を取得することができます。<br>
（PrivateリポジトリでのContributionの取得も可能）

---

▼ `curl` コマンドを実行した時に帰ってくる値 ✨

```
🎉 今週のランキング 🎉

1位: XXX
contribution数: 1024

2位: XXX
contribution数: 512

3位: XXX
contribution数: 256

4位: XXX
contribution数: 128

...

▼　実装内容:
https://github.com/Conken-NitKit/conken-contribution
```

---

▼ `LINE` に投稿されているイメージ写真 ✨

<img src="https://user-images.githubusercontent.com/41711771/156927826-6d073492-e5d9-455b-af01-6344dd0e9c54.png" width="480">

---

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

# 表示するユーザーの最大数
MAX_SIZE=64
MAX_LINE_MESSAGE_SIZE=64
```

#### 2. `src/blackList.sample.ts` を参考にして `src/blackList.ts` Organization に所属しているが監視対象から除外したいユーザーを指定する。

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

#### ・ `HTTP` の疎通確認

```
npm run local-check-http
```

#### ・ `LINE Notify` の疎通確認

```
npm run local-check-line-notify
```

## 🔧 開発者向け 

### ディレクトリ構成

`run.ts` が最初に実行されるので、そこから読んでいくのがわかりやすいと思います。

```
src
├── Controllers/ <- エンドポイントとサービスを紐づける処理を記載
|
├── Infrastructures/　<- 外部のSaasを利用するために必要な前処理を記載
|
├── Routes/ <- サービスのエンドポイントを記載
|
├── Service/ <- ビジネスの根幹を担う、複雑なロジックを記載
│
├── Utils/ <- 便利系の関数を記載
│
├── application.ts <- Express のライフサイクルを記載
└── run.ts <- システムを起動する
```
