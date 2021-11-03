# GoFarmmy-Back-End-API-Node

GoFarmmy-Back-End-API-Node 是一個使用 Node.js + Express + MySQL/ClearDB 建立的後端專案，部署於 Heroku，以 RESTFul API 滿足goFarmmy水果電商網站不同資料的互動需求，搭配 [GoFarmmy-Front-End-vue](https://github.com/jiayenli/go_farmmy_vue) 前端專案，打造一個水果電商網站。

## 目錄

- [Initial - 專案緣起](#Initial---專案緣起)
- [Features - 專案功能](#Features---專案功能)
- [API Reference - 格式範例](#API-Reference---格式範例)
- [Environment SetUp - 環境建置](#Environment-SetUp---環境建置)
- [Installing - 專案安裝流程](#Installing---專案安裝流程)
- [Contributor and Responsibility - 開發人員分工](#Contributor-and-Responsibility---開發人員與職責分工)

## Initial - 專案緣起

專案緣自於身邊朋友經營的小農批發 - [農作伙](https://www.facebook.com/%E8%BE%B2%E4%BD%9C%E4%BC%99-Go-Farmmy-104432345254333)，希望能為其打造一個網站讓顧客能夠更直接地下單，同時商家也能更有效地管理訂單資訊。除此之外在打造專案的過程中，達到練習串接金流和打造RESTFUL API能力的目的。


## Features - 專案功能

- 消費者 CRUD - 商品瀏覽、加入購物車、創建訂單、結帳付款、訂單瀏覽
- 管理員 CRUD - 商品管理、訂單管理、用戶資料管理
- 整合 Heroku 實踐自動化部署（CD）
- 串接第三方藍新金流，快速接入多種支付方式
- 採用 JSON Web Tokens 進行登入驗證
- 整合 Google API / OAuth 2.0 / nodemailer 實現 Email 通知功能
- 整合 imgur API，實作上傳圖片功能
- 採用 bcrypt 處理使用者密碼
- 採用 AJV 實作validate middleware，針對req.body進行JSON格式驗證

## API Reference - 格式範例

- [所有商品](https://go-farmmy-demo.herokuapp.com/api/products)

## Environment SetUp - 環境建置

- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/) / [CLEARDB]](https://www.cleardb.com/)

## Installing - 專案安裝流程

1. 打開terminal，Clone 此專案至本機電腦

```
git clone https://github.com/NokoDOjo/Go_Farmmy-api.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd GO_Farmmy-api
```

3. 安裝 npm 套件，下載專案相依套件

```
在 Terminal 輸入 npm install 指令
```

4. 環境變數設定

將 .env.example 檔案名稱修改為 .env，並填入相對應的值

```
//.env.example --> .env
GMAIL_ACCOUNT=
GMAIL_PASSWORD=
URL=你部署這個專案的網址
MERCHANT_ID=你的藍新金流商店 ID
HASH_KEY=你的藍新金流商店 HASH_KEY
HASH_IV=你的藍新金流商店 HASH_IV
JWT_SECRET=
IMGUR_CLIENT_ID=
```

5. 資料庫設定

新建資料庫名稱為：go_Farmmy，並更新 /config/config.json 的資料庫連線設定，最後執行 migration 建立

```
npx sequelize db:migrate
```

6. 建立種子檔案

```
npx sequelize db:seed:all
```

7. 啟動應用程式，執行 app.js 檔案

```
在 Terminal 執行 npm run dev
```

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始查看囉！

## Contributor and Responsibility - 開發人員

[Benny Yang](https://github.com/NokoDOjo) (後端)

[Jamie Li](https://github.com/asd8116) (前端)
