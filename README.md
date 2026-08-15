# 愛知医科大学 OPEN CAMPUS 特設サイト

静的HTMLサイトです。`index.html` を起点として、医学部・看護学部・動画ページを収録しています。

## 次年度の更新

`assets/js/site-config.js` の以下の項目を変更します。

- `eventYear`: 開催年度
- `eventDate`: 開催日
- `status`: `upcoming` / `open` / `ended`
- `statusKicker`、`statusLabel`、`statusMessage`: トップページの開催案内
- `medicineStatusMessage`、`nursingStatusMessage`: 各学部ページの案内
- `medicineConsultationMeta`、`nursingMiniOpenCampusDates`: 関連イベントの年度・開催日
- `medicineConsultationUrl`、`nursingMiniOpenCampusUrl`: 関連イベント
- `medicineApplicationUrl`、`nursingApplicationUrl`: 両学部の参加申込ページ
- `medicineApplicationStatus`、`nursingApplicationStatus`: 学部別の申込受付状態
- `medicineApplicationLabel`、`medicineApplicationMessage`、`medicineApplicationDeadline`: 医学部オンライン講座の申込・視聴案内
- `nursingStudentInterviewUrl`、`nursingAlumniInterviewUrl`: 看護学部インタビュー記事
- `livingAloneUrl`、`accessUrl`: 一人暮らし・交通アクセス
- `xUrl`、`instagramUrl`: 公式SNS

## 動画の更新

`assets/js/video-data.js` に動画ID、タイトル、サムネイル、分類を登録します。看護学部動画の `group` は次の3種類です。

- `introduction`: 学部紹介
- `student`: 在学生
- `alumni`: 卒業生（同窓生）

トップページの動画レールは、この一覧からページ表示ごとに順番を入れ替えて表示します。

## 当日の写真

医学部・看護学部ページの「当日の模様」には、写真掲載用のプレースホルダーを用意しています。写真受領後、`photo-placeholder` 内を `<figure>` 要素へ置き換えてください。

## 主要ファイル

- `assets/media/open-campus-top-2026.mp4`: トップのループ動画
- `assets/images/brand/`: 正式ロゴとファビコン用シンボル
- `assets/images/brand/open-campus-arch.png`: トップのオープンキャンパス・アーチロゴ
- `assets/documents/`: 2026年度プログラムPDF
- `assets/css/style.css`: 全ページ共通スタイル
- `assets/js/main.js`: メニュー、動画再生、動画レール表示
