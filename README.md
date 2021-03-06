# conken-contribution

## ð¤ ã©ããªã·ã¹ãã 

`npm script` 1 ã¤ã§ Organization ã«æå±ãã¦ããã¦ã¼ã¶ã¼ã® **Contribution æ°** ãåå¾ãããã¨ãã§ãã¾ãã<br>
ï¼Private ãªãã¸ããªã§ã® Contribution ã®åå¾ãå¯è½ï¼

---

â¼ `curl` ã³ãã³ããå®è¡ããæã«å¸°ã£ã¦ããå¤ â¨

```
ð ä»é±ã®ã©ã³ã­ã³ã° ð

1ä½: XXX
contributionæ°: 1024

2ä½: XXX
contributionæ°: 512

3ä½: XXX
contributionæ°: 256

4ä½: XXX
contributionæ°: 128

...

â¼ãå®è£åå®¹:
https://github.com/Conken-NitKit/conken-contribution
```

---

â¼ `LINE` ã«æç¨¿ããã¦ããã¤ã¡ã¼ã¸åç â¨

<img src="https://user-images.githubusercontent.com/41711771/156927826-6d073492-e5d9-455b-af01-6344dd0e9c54.png" width="480">

---

## ð° Quick Start

### ç°å¢å¤æ°ã®è¨­å®

#### 1. `.env.sample` ãåèã«ãã¦ `.env` ã«ä»¥ä¸ã®åå®¹ãè¨è¼ããã

```
# åãµã¼ãã¹ã¸ã®ãã¼ã¯ã³æå ±ãå®è£ãã¾ãã
GITHUB_ACCESS_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
LINE_NOTICE_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# ç£è¦å¯¾è±¡ã®GitHubã®Organizationã®ID
ORGANIZATION_ID=XXX

# åãµã¼ãã¹ã§ä½æ¥åããã®å·®åãè¨ç®ããããè¨è¼ãã
HTTP_FROM_AT=90
LINE_NOTIFY_FROM_AT=90

# è¡¨ç¤ºããã¦ã¼ã¶ã¼ã®æå¤§æ°
MAX_SIZE=64
MAX_LINE_MESSAGE_SIZE=64
```

#### 2. `src/blackList.sample.ts` ãåèã«ãã¦ `src/blackList.ts` Organization ã«æå±ãã¦ãããç£è¦å¯¾è±¡ããé¤å¤ãããã¦ã¼ã¶ã¼ãæå®ããã

```ts
// Organizationã«æå±ãã¦ãããç£è¦å¯¾è±¡ããé¤å¤ãããã¦ã¼ã¶ã¼ãæå®ããã
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

### ãµã¼ããèµ·å

```
npm run start
```

### çéç¢ºèª

> `ãµã¼ããèµ·å` ãã¦ããªãå ´åã¯ä»¥ä¸ã®ã³ãã³ãã¯åä½ããªãã

#### ã» `HTTP` ã®çéç¢ºèª

```
npm run local-check-http
```

#### ã» `LINE Notify` ã®çéç¢ºèª

```
npm run local-check-line-notify
```

## ð§ éçºèåã

### ä½¿ç¨æè¡

#### ã©ã¤ãã©ãª

- Express
- TypeScript
- ApolloClient (GitHubGraphQLAPI ç¨ã«å©ç¨)
- cheerio (ã¹ã¯ã¬ã¤ãã³ã°ç¨)
- axios (LineNotifyAPI ã«ãªã¯ã¨ã¹ããéä¿¡ããããã«å©ç¨)

#### å¤é¨ API

- [GitHub GraphQL API](https://docs.github.com/ja/graphql/)
- [GitHub Contribution Page](https://github.com/users/kubo-hide-kun/contributions/)
- [LINE Notify API](https://notify-bot.line.me/doc/ja/)

### ãã£ã¬ã¯ããªæ§æ

`run.ts` ãæåã«å®è¡ãããã®ã§ãããããèª­ãã§ããã®ãããããããã¨æãã¾ãã

```
src
âââ Controllers/ <- ã¨ã³ããã¤ã³ãã¨ãµã¼ãã¹ãç´ã¥ããå¦çãè¨è¼
|
âââ Infrastructures/ã<- å¤é¨ã®Saasãå©ç¨ããããã«å¿è¦ãªåå¦çãè¨è¼
|
âââ Routes/ <- ãµã¼ãã¹ã®ã¨ã³ããã¤ã³ããè¨è¼
|
âââ Service/ <- ãã¸ãã¹ã®æ ¹å¹¹ãæããè¤éãªã­ã¸ãã¯ãè¨è¼
â
âââ Utils/ <- ä¾¿å©ç³»ã®é¢æ°ãè¨è¼
â
âââ application.ts <- Express ã®ã©ã¤ããµã¤ã¯ã«ãè¨è¼
âââ run.ts <- ã·ã¹ãã ãèµ·åãã
```
