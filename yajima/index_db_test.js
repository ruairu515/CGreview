// work_title読込
// (現状:PDOのprepareメソッドとbinvalueメソッドを使いデータを指定している)
// (課題：webページ上で指定したtitleを取得する)
$.ajax({
	type: 'POST',
	url: 'index_db_workid.php',
	dataType: 'html',
})
.done(function(data, status, jqXHR){
	$("#work_read").html(data);
	console.log(data);
})
.fail(function(jqXHR, status, error){
	 $("#ajax_result").html("エラーです");
	 console.log(status);
})
.always(function(jqXHR, status){
	console.log(status);
});







// 配列で受け取る 参考url http://www.renowan.com/blog/?p=707
// $.ajax({
// 	type: 'POST',
// 	url: 'index_db_workid.php',
// 	dataType: 'json',
// })
// .done(function(data, status, jqXHR){
// 	$("#work_read").html(data);
// 	console.log(data);
// 	var a = data['title'];
// 	console.log(a);
// 	// var obj = eval("("+data+")");
// 	// console.log(obj);
// })
// .fail(function(jqXHR, status, error){
// 	 $("#ajax_result").html("エラーです");
// 	 console.log(status);
// })
// .always(function(jqXHR, status){
// 	console.log(status);
// });










// 	success: function(data){
//         $("#selectData").append('<h3 class="text-success">接続しました。</h3>');
                
//         //空の配列を用意
//         var items = [];
//         //配列にデータをセットする
//         for(i=0;i' + data[i].emplyeeNo + ":" + data[i].name + "");
//         }
                
//         //ul要素内に配列データを取込み #selectDataに追加する
//         $('
// ', {
//             'class': 'my-new-list',
//                html: items.join('')
//                     }).appendTo('#selectData');

//     	},
//             // 通信できなかった場合(オプション)
//             error: function(){
//                 $("#selectData").append('<h3 class="text-error">接続できません。</h3>');
//             }
//         });
// データを取得
// 接続しました。




// var search_msg_data;
// $("#search_data").html('Now Loading...');
// $.ajax({
// type: "GET",
// url: "hoge.php",
// success: function(msg){
// search_msg_data = msg;
// setTimeout('search_json()', 1000); // タイムラグ表示(Now Loading確認用)
// //search_json(); // すぐに表示
// }
// });
// function search_json(){
// var get_json = eval("("+search_msg_data+")");
// if(get_json.results == null){
// $("#search_data").html("該当するデータは見つかりませんでした。");
// }
// else{
// var hash = get_json["results"];
// var search_html = "";
// for(var i in hash){
// search_html += '<dt>' + hash[i].name + '</dt>';
// search_html += '<dd>' + hash[i].address + '</dd>';
// }
// $("#search_data").html('<dl>' + search_html + '</dl>');
// }
// }












var camera_position;
var requestId;

var width1 = 600;
var height1 = 400;

var DB_jsonfile = "cycle2color.js"//DBデータ仮

function aaa(bb){
	window.cancelAnimationFrame(requestId); 

	//要素切り替え
	var id = document.getElementById("work_screen");
	var newElement = document.createElement("a");
	var oldElement = document.getElementById("three_id");
	id.replaceChild(newElement, oldElement);

	//要素削除ができてない
	//  var dom_obj = document.getElementById(work_screen);
    // console.log("a");
    // var dom_obj_parent = dom_obj.parentNode;
    //  console.log("b");
    // dom_obj_parent.removeChild(dom_obj);

	Domdata(DB_jsonfile,width1,height1,bb)
}





//関数_作品表示
function Domdata(data2, whith2, height2,mate_switch){

	//scene
	var scene = new THREE.Scene();
	
	//Cube
	var geometry = new THREE.CubeGeometry(2000,500,4000);
	//ワイヤー切り替え
	if(mate_switch == 0){
		//マテリアル指定
		var material = new THREE.MeshLambertMaterial({color : 'silver'});
	}else if(mate_switch == 1){
		//マテリアル指定
		var material = new THREE.MeshLambertMaterial({color : 'silver'});
	}else if(mate_switch == 2){
		//ワイヤーフレーム指定
		var material = new THREE.MeshPhongMaterial({                              
       		color: 0x990000, //球の色
       		wireframe: true //ワイヤーフレーム有効
		});
	}
	var cube = new THREE.Mesh(geometry,material);
	cube.position.set(0, -250, 0);
	scene.add(cube);

	// JSONObj
	var jsonObj,faceMaterial;
	loader = new THREE.JSONLoader();
	loader.load(data2, function( geometry, materials ) {
	//ワイヤー切り替え
	if(mate_switch == 0){
		//マテリアル指定
		faceMaterial = new THREE.MeshFaceMaterial( materials );
	}else if(mate_switch == 1){
		//マテリアル指定
		faceMaterial = new THREE.MeshFaceMaterial( materials );
	}else if(mate_switch == 2){
		//ワイヤーフレーム指定
		var faceMaterial = new THREE.MeshPhongMaterial({                              
       		color: 0x990000, //球の色
       		wireframe: true //ワイヤーフレーム有効
		});
	}
	for(var i = 0, len = materials.length; i < len; i++){
	    materials[i].side = THREE.DoubleSide;
	}
	jsonObj = new THREE.Mesh( geometry, faceMaterial );
	jsonObj.position.set( 50, -25, 0);
	jsonObj.scale.set( 15, 15, 15 );
	scene.add( jsonObj );
	});

	//Dom作成
	var id = document.getElementById("work_screen");
	var div = document.createElement("div");

	div.id = "three_id";

	id.appendChild(div); 

	//width　heightのサイズ取得
	var width = whith2;
	var height = height2;




	//light
	var color = 'white';
	var directionalLight = new THREE.DirectionalLight(color, 1.0);
	directionalLight.position.set(-2, 1, 1).normalize(); // 光源の角度を設定
	scene.add(directionalLight); // シーンに追加
	var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
	scene.add( hemisphereLight );

	//camera
	var camera;
	var cameraActive = true;
	camera = new THREE.PerspectiveCamera(75,width/height,1,8000);
	camera.position.set(2000, 2000, 2000); // (x, y, z)
	camera.lookAt(cube.position);
	scene.add(camera);

	//renderer
	var renderer = new THREE.WebGLRenderer({antialias: true})
	renderer.setSize(width,height);
	renderer.setClearColor(0xdddddd,1);
	document.getElementById("three_id").appendChild(renderer.domElement);
	renderer.render(scene,camera);
	convert();
	

	
	function convert(){
		
		var controls = new THREE.OrbitControls(camera,renderer.domElement);
		controls.minDistance = 	10;   //近づける距離の最小値
		controls.maxDistance = 8000;   //遠ざかれる距離の最大値
		render();
		

		function render(){
			requestId = requestAnimationFrame(render);
			renderer.render(scene,camera);
			controls.update();//コントローラーを更新

			var x,y,z,xz,xyz,Radian,Dgr;
			x = camera.position.x;
			y = camera.position.y;
			z = camera.position.z;
			xz = Math.sqrt(Math.pow(x,2) + Math.pow(z,2));
			xyz = Math.sqrt(Math.pow(xz,2) + Math.pow(y,2));//カメラまでの距離
			var Radian = Math.asin(xz/xyz);
			var Dgr = Radian/(Math.PI/180);
			if(x>=0 && z>=0 && Dgr>=15){
				console.log("x,z"); 
				camera_position = "x+z+";
			}	
			else if(x>=0 && z<0 && Dgr>=15){
				console.log("x,-z"); 
				camera_position = "x+z-";
			}
			else if(x<0 && z<0 && Dgr>=15){
				console.log("-x,-z"); 
				camera_position = "x+z-";
			}
			else if(x<0 && z>=0 && Dgr>=15){
				console.log("-x,z"); 
				camera_position = "x-z+";
			}
			else if(Dgr<15){
				console.log("top_camera");
				camera_position = "topcamera";
			}	
		}	
	}
}


















//関数＿form_ajax送信
$(document).ready(function(){
	$("#submit_bt").click(function(event){
		//フォームが通常の動きをしないように
		event.preventDefault();

		//post.php⬅︎testのurlに入れたい
		// var  form = $(this).parents('form').attr('action');
		// console.log(form);

		//初期化
		$("#ajax_result").empty();

		$('<input>').attr({
    	type: 'hidden',
    	id: 'word_id3',
    	name: 'hoge',
    	value: camera_position
  　　　}).appendTo('#target_id');
		test();
	});
});
function test(){
 	var word_val1=$("#word_id1").val(); 
 	var word_val2=$("#word_id2").val(); 
 	var word_val3=$("#word_id3").val(); 

	$.ajax({
		type: 'POST',
		url: 'index_db_partreviewinfo.php',
		data:{
			word1:word_val1,
			word2:word_val2,
			word3:word_val3
		},
		dataType: 'html',
	})
	//$.post('./test.php', {word1:word_val1,word2:word_val2})
	.done(function(data, status, jqXHR){
		$("#ajax_result").html(data);
		var phpdata = data;
		console.log(phpdata);
		console.log(status);
		//$("#ajax_result").html(data.word1 +"と"+ data.word2);//PHPからJSON形式で返ってくる場合
	})
	.fail(function(jqXHR, status, error){
		 $("#ajax_result").html("エラーです");
		 console.log(status);
	})
	.always(function(jqXHR, status){
		console.log(status);
	});
}



//データベースから値取得
function review_get(){
	$.ajax({
		type: 'POST',
		url: 'index_db_partreviewinfo_get.php',
		dataType: 'json',
	})
	.done(function(data, status, jqXHR){
		// $("#work_read").html(data);
		console.log(data);
		
		var rl_name = data['name'];
		var rl_comment = data['comment'];
		review_list(rl_name, rl_comment);

	})
	.fail(function(jqXHR, status, error){
		 $("#ajax_result").html("エラーです");
		 console.log(status);
	})
	.always(function(jqXHR, status){
		console.log(status);
	});
}



//関数_レビュー表示
var i = 1;
function review_list(name, review){
	i++;
	var now = new Date();
	var x = name;
	var y = review;
	var answer1 = document.getElementById('answer1');
	
	var span1 = document.createElement("span");
	var a1 = document.createElement("a");
	var span2 = document.createElement("span");
	var div1 = document.createElement("div");
	var p1 = document.createElement("p");
	var hr = document.createElement("hr");

	span1.innerHTML = "reviewer";
	a1.setAttribute("href", "url");
	a1.innerHTML = x;
	span2.innerHTML = "Posted_date" + "&nbsp;" + now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate();
	// div1.setAttribute("id", "rateit"+i);
	p1.innerHTML = y;

	answer1.appendChild(span1);
	answer1.appendChild(a1);
	answer1.appendChild(span2);
	answer1.appendChild(div1);
	answer1.appendChild(p1);
	answer1.appendChild(hr);
	
	$(function() {
        // RateItの設定（2）
        $("#rateit"+i).rateit();
    });
}


