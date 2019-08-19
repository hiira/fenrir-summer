'use strict';

var search  = document.getElementById("search");
search.addEventListener('click', ()=>{
	//GeoLocation APIに対応しているかの判定
	if( navigator.geolocation ){
		navigator.geolocation.getCurrentPosition(
			//成功した時
			function( position )
			{
				// 取得したデータの整理
				var data_geo = position.coords ;
				var lat = data_geo.latitude ;
				var lng = data_geo.longitude ;
				var range = document.getElementById("distance").value;
				var url = "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=dec749fa7ffd173135ca744c9cfd3101&latitude=" + lat + "&longitude=" + lng + "&range=" + range;
				//確認用
				console.log(lat);
				console.log(lng);
				console.log(url);
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
					var wrapper = document.getElementById("wrapper");
					for(var i = 0; i<data.rest.length; i++){
						//要素を追加してclass,idも付与
						var div = document.createElement('div');
						wrapper.appendChild(div);
						div.classList.add("shop");
						var div_last = wrapper.lastElementChild;
						div_last.setAttribute("id","shop" + i);
						//shopの情報をdiv要素に入れていく
						var h1 = document.createElement('h1');
						var p = document.createElement('p');
						var img = document.createElement('img');
						img.src = data.rest[i].image_url.shop_image1;
						var shopNumber = document.getElementById("shop" + i);
						shopNumber.appendChild(h1);
						shopNumber.appendChild(img);
						shopNumber.appendChild(p);
	
						h1.textContent = data.rest[i].name;
						p.textContent = data.rest[i].address;
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

});

var reset  = document.getElementById("reset");
reset.addEventListener('click', ()=>{
	location.reload();
});

