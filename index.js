const express = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// 経過時間定義
const waitSec = 30;
const msCoefficient = 1000;
const startTime = Date.now();            // アプリ起動時の現在日時を取得
const blockMs = waitSec * msCoefficient; // 429が解除されるまでの時間（ミリ秒）
const accessible = startTime + blockMs;  // ブロック時間が経過した時点で200を返すようにする


// アクセス時の処理
app.get('/', (req, res) => {
  // アクセス時に日時を取得
  const accessTime = Date.now();
  const elapsed = accessTime - startTime; // アプリ起動してからの経過時間を取得
  const elapsedSec = elapsed / msCoefficient;

  if (accessTime < accessible) {
    // 経過時間が満たない場合
    console.log(`elapsed ${elapsedSec}s`);
    res.status(429).send(`Retry after ${waitSec}s`);
  } else {
    console.log(`elapsed ${elapsedSec}s`);
    res.status(200).send('Success!');
  }
});

// 待ち受け
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});