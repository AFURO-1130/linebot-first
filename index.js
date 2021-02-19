const ACCESS_TOKEN = "pvItCZH6Bm5H9Y1dTur0DNE+I68hIstWhFLrxpOQ9IcGvk7O4pNUjRDiX34slMcYwhdUDlVFUr6nKcIBLtnoaeLff59IIDQEMhvB2U8jt1jPJOataXsf63itvLP4pUHgR0jTbRm6AON9bm1jJ3KjCgdB04t89/1O/w1cDnyilFU=";
//引数eにはmessage APIから送られてきたJSON情報がはいっている
function doPost(e){
  //エラー処理（message APIからundefinedがきたときの処理）
  if(typeof e === "undefined"){
    return;
  }else{
      //送られてきたJSON情報を解析
    let json = JSON.parse(e.postData.contents);
    reply(json);//reply関数を呼び出す
  }
}
//dataにはeのJSON情報がはいっている
function reply(data){
  let url = "https://api.line.me/v2/bot/message/reply";
  let replyToken= data.events[0].replyToken;//送られてきたJSONからリプライトークンをget
  let userMessage = data.events[0].message.text;//JSONからテキストをget
  //message APIに送る時に必要な情報
  let headers ={
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + ACCESS_TOKEN,
  }
  //message APIに送るためにJSONに戻してる
  let options = JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': userMessage 
      }],
    });
    //message APIに送信する
   UrlFetchApp.fetch(url, {'headers': headers,'method': 'post','payload':options});

  }
