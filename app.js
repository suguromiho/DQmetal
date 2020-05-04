'use strcit';

const axios = require('axios');
const fs = require("fs"); //注: npm i 不要
const qs = require('querystring');

const LINE_NOTIFY_API_URL = 'https://notify-api.line.me/api/notify';
const LINE_NOTIFY_TOKEN = process.env.LINE_TOKEN;

let config = {
    url: LINE_NOTIFY_API_URL,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + LINE_NOTIFY_TOKEN
    },
    data: ''
}

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
    let outputmsg = '\n'; 



    data = metal.split('<tr class="">');

    for (let index = 1; index < data.length; index++) {
       
        item = data[index].split('class="pt0 pb0"');
        if(item[2] && item[2].indexOf('img') != -1){
            const time = item[1].match(/>\t\t\t\t\t\t\t\t\t\t\t(.*?)&nbsp/)[1];
            outputmsg += time + '/' + 'メタル発生 \n';
        }   
    }
    console.log(outputmsg)
    config.data=qs.stringify({
        // imageFullsize: `https://cache.hiroba.dqx.jp/dq_resource/img/tokoyami/koushin/ico/1.png`,
        // imageThumbnail: `https://cache.hiroba.dqx.jp/dq_resource/img/tokoyami/koushin/ico/1.png`,
        message: outputmsg,
      })
    const responseLINENotify = await axios.request(config);
    console.log(responseLINENotify.data);
  } catch (error) {
    console.error(error);
  }
}

// getRequest を呼び出してデータを読み込む
getRequest();
