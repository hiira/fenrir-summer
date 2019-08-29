'use strict';

var condition = document.getElementById('condition');
var range_text1 = "現在位置から"
var range_text2 = "m圏内のお店"
// URLのパラメータを取得
var urlParam = location.search.substring(1);
     // URLにパラメータが存在する場合
     if(urlParam) {
       // 「&」が含まれている場合は「&」で分割
       var param = urlParam.split('?');
      
       // パラメータを格納する用の配列を用意
       var paramArray = [];
      
       // 用意した配列にパラメータを格納
       for (var i = 0; i < param.length; i++) {
         var paramItem = param[i].split('=');
         paramArray[paramItem[0]] = paramItem[1];
       }
       var range = paramArray.range;
        var page = paramArray.page;
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
            console.log(lat);
            console.log(lng);
            var page_url = page*10;
            var key = "";
            var url = "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=" + key　+ "&latitude=" + lat + "&longitude=" + lng + "&range=" + range + "&offset=" + page_url;
            //JSON型でAPIを取ってくる
            var request = new XMLHttpRequest();
            request.open('GET', url , true);
            request.responseType = 'json';
            //リクエストが成功した時の処理
            request.onload = function () {
                var data = this.response;
                //店を並べるための処理
                var $shop_whole = document.getElementById('shop_whole');
                var complied_shop = _.template($lodashTemplate_userData.innerHTML);
                let html = "";
                for(var i = 0; i<data.rest.length; i++){
                    var shop_img = data.rest[i].image_url.shop_image1;
                    if(shop_img === ""){
                         shop_img = "img/SVG/noImage.svg"
                    }
                         html += complied_shop({
                            "shop_img": shop_img,
                            "shop_name": data.rest[i].name,
                            "opentime": data.rest[i].opentime,
                            "address": data.rest[i].address,
                            "phone_number": data.rest[i].tel,
                        });
                    }
                    $shop_whole.innerHTML = html;

                    //ページのための処理
                    //何件目か、トータルは何件かの表示
                var $HowManyHit = document.getElementById('HowManyHit');
                var $hit = document.getElementById('hit');
                var complied_hit = _.template($hit.innerHTML);
                // if(page = 1){
                //     var page_now = "1~10件";
                // }else{
                //     var page_now = (page * 10 + 1) + "~" + (page * 10 + 10) + "件"; 
                // }
                var page_now = page * 10;
                var page_text = (page_now - 9) + " ~ " + page_now + "件"
                html = "";
                html = complied_hit({
                    "hit_number" : page_text,
                    "hit_total" : "全" + data.total_hit_count + "件",
                });
                $HowManyHit.innerHTML = html;

                //Pagination描写
                var $number = document.getElementById('number');
                var $previous = document.getElementById('previous');
                var $page = document.getElementById('page');
                var $next = document.getElementById('next');
                var complied_previous = _.template($previous.innerHTML);
                var complied_page = _.template($page.innerHTML);
                var complied_next = _.template($next.innerHTML);
                var previous_html = "";
                var page_html = "";
                var next_html = "";
                for(i = 1; i<=10; i++)
                page_html += complied_page({
                    "page_id": "page" + i,
                    "link": "http://127.0.0.1:5500/search.html?range=4?page=" + i,
                    "page_number" : i
                });
                previous_html += complied_previous({"Previous": "Previous"});
                next_html += complied_next({"Next": "Next"});
                console.log(previous_html);
                $number.innerHTML = previous_html + page_html + next_html;

                //ページの処理
                // for(i=1; i<=10; i++){
                //     page_id = document.getElementById('page' + i);
                // }

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

// var $previous = document.addEventListener('previous');
// var $next = document.addEventListener('next');

// $previous.addEventListener(('click'), ()=>{
//     location.href = 'http://127.0.0.1:5500/search.html?range=4?page=' + (page - 1);
// });

// $next.addEventListener(('click'), ()=>{
//     location.href = 'http://127.0.0.1:5500/search.html?range=4?page=' + (page + 1);
// });

    