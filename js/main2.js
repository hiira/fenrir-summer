'use strict';

var condition = document.getElementById('condition');
var range_text1 = "現在位置から"
var range_text2 = "m圏内のお店"
// URLのパラメータを取得
var range;
var urlParam = location.search.substring(1);
 
// URLにパラメータが存在する場合
if(urlParam) {
  // 「&」が含まれている場合は「&」で分割
  var param = urlParam.split('&');
 
  // パラメータを格納する用の配列を用意
  var paramArray = [];
 
  // 用意した配列にパラメータを格納
  for (var i = 0; i < param.length; i++) {
    var paramItem = param[i].split('=');
    paramArray[paramItem[0]] = paramItem[1];
  }
  range = paramArray.range;
}

var $lodashTemplate_userData = document.getElementById('lodashTemplate_userData');

switch(range){
    
        case '1':
            condition.textContent = range_text1 + '100' + range_text2;
            break;
    
    
        case '2':
            condition.textContent = range_text1 + '500' + range_text2;
            break;
    
    
        case '3':
            condition.textContent = range_text1 + '1000' + range_text2;
            break;
    
    
        case '4':
            condition.textContent = range_text1 + '2000' + range_text2;
            break;
    
    
        case '5':
            condition.textContent = range_text1 + '3000' + range_text2;
            break;
    
        }
        
if( navigator.geolocation ){
    navigator.geolocation.getCurrentPosition(
        //成功した時
        function( position )
        {
            // 取得したデータの整理
            var data_geo = position.coords ;
            var lat = data_geo.latitude ;
            var lng = data_geo.longitude ;
            var key = "";
            var url = "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=" + key　+ "&latitude=" + lat + "&longitude=" + lng + "&range=" + range;
            //JSON型でAPIを取ってくる
            var request = new XMLHttpRequest();
            request.open('GET', url , true);
            request.responseType = 'json';
            //リクエストが成功した時の処理
            request.onload = function () {
                var data = this.response;
                console.log(data);
                console.log(data.rest);
                console.log(data.rest[0]);
                var $shop_whole = document.getElementById('shop_whole');
                var complied = _.template($lodashTemplate_userData.innerHTML);
                for(var i = 0; i<data.rest.length; i++){
                        let html = complied({
                            "shop_img": data.rest[i].image_url.shop_image1,
                            "shop_name": data.rest[i].name,
                            "opentime": data.rest[i].opentime,
                            "address": data.rest[i].address,
                            "phone_number": data.rest[i].tel,
                        });
                        console.log(complied.shop_img);
                        if(complied.shop_img === ""){
                            complied.shop_img = "img/SVG/noImage.svg"
                        }
                        $shop_whole.innerHTML = html;
                }
                

            };
              request.send();

        },

        function( error )
        {
            var errorInfo = [
                "原因不明のエラーが発生しました…。" ,
                "位置情報の取得が許可されませんでした…。" ,
                "電波状況などで位置情報が取得できませんでした…。" ,
                "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
            ] ;

            // エラー番号
            var errorNo = error.code ;

            // エラーメッセージ
            var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] ;

            // アラート表示
            alert( errorMessage ) ;
        } ,

        // [第3引数] オプション
        {
            "enableHighAccuracy": false,
            "timeout": 8000,
            "maximumAge": 2000,
        }

    ) ;
}
else
{
    alert("お使いの端末は、GeoLacation APIに対応していません。") ;
}




    