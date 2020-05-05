・WEBサイトから大行進スケジュールを全て取得してくる
・取得したデータを成形する
・時間のデータの１時間前になったら通知したい
＝収集したデータの時間＋１時間して、実行時間とイコールなれば通知　そうでないならば通知をしない
・定期実行は00分・30分
・LINE Notifyに通知する
・メールの本文は
　＊＊＊、メータルーキー軍団大行進！　⇦時間を入れたい
・一緒に画像も送りたい


DQサイト：https://hiroba.dqx.jp/sc/tokoyami/

```js
//6:00~ 
    item = data[1].split('class="pt0 pb0"');
    if(item[2] && item[2].indexOf('img') != -1){
        console.log('6:00~ メタル発生'); //6:00~
    }
```

```js
'use strcit';

const axios = require('axios');
const fs = require("fs"); //注: npm i 不要

// 実際にデータを取得する getRequest 関数
async function getRequest() {
  let response;
  try {
    response = await axios.get('https://hiroba.dqx.jp/sc/tokoyami/');
    let html = response.data;
    html = html.replace(/\r?\n/g,""); //整形1: 改行などを削除して整形しやすくする
    let metal = html.match(/id="metal-container" style="display: none;">(.*?)<\/div>/)[1];
    //metal = metal.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,''); //整形2: タグを削除
    //console.log(metal);
    const PATH = "./docs/data.txt";
    fs.writeFileSync(PATH,metal);

    let item,data = [];
    let outputmsg = ''; 



    data = metal.split('<tr class="">');

    for (let index = 1; index < data.length; index++) {
       
        item = data[index].split('class="pt0 pb0"');
        if(item[2] && item[2].indexOf('img') != -1){
            const time = item[1].match(/>\t\t\t\t\t\t\t\t\t\t\t(.*?)&nbsp/)[1];
            outputmsg += time + '/' + 'メタル発生 \n';
        }   
    }
    console.log(outputmsg)

  } catch (error) {
    console.error(error);
  }
}

// getRequest を呼び出してデータを読み込む
getRequest();
```