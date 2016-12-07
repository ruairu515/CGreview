////////////////////////////////////////////////////////////////////
// windowイベントの定義
////////////////////////////////////////////////////////////////////
window.addEventListener("load", function () {
    threeStart(); //Three.jsのスタート関数の実行
    dbStart(); //データベース処理のスタート関数の実行
});











////////////////////////////////////////////////////////////////////
// Three.jsスタート関数の定義
////////////////////////////////////////////////////////////////////
function threeStart() {
    initThree();  //Three.js初期化関数の実行
    initCube();  //cube初期化関数の実行
    initObject(); //json初期化関数の実行
    initLight();//ライト初期化関数の実行
    initCamera(); //カメラ初期化関数の実行
    initEvent();  //イベント準備関数の実行
    loop();       //無限ループ関数の実行
    addButton();//wireFrameボタンDOM実装
}


////////////////////////////////////////////////////////////////////
// Three.js初期化関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var renderer,    //レンダラーオブジェクト
    scene,       //シーンオブジェクト
    canvasFrame; //キャンバスフレームのDOM要素
function initThree(){
    //キャンバスフレームDOM要素の取得
    canvasFrame = document.getElementById('canvas_frame');
    //レンダラーオブジェクトの生成
    renderer = new THREE.WebGLRenderer({ antialias: true ,preserveDrawingBuffer: true});
    if (!renderer) alert('Three.js の初期化に失敗しました');
    //レンダラーのサイズの設定
    renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight);
    renderer.setClearColor(0xdddddd,1);
    //キャンバスフレームDOM要素にcanvas要素を追加
    canvasFrame.appendChild(renderer.domElement);

    //レンダラークリアーカラーの設定
    renderer.setClearColor(0xEEEEEE, 1.0);

    //シーンオブジェクトの生成
    scene = new THREE.Scene();
}


////////////////////////////////////////////////////////////////////
// カメラ初期化関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var camera;    //カメラオブジェクト
var orbit; //orbitcontrolsのオブジェクト
function initCamera() {
    //カメラオブジェクトの生成
    camera = new THREE.PerspectiveCamera(70, canvasFrame.clientWidth / canvasFrame.clientHeight, 1, 10000);
    //カメラの位置の設定
    camera.position.set(2000, 2000, 2000);
    //カメラの上ベクトルの設定
    camera.up.set(0, 1, 0);
    //カメラの中心位置ベクトルの設定
    camera.lookAt({ x: 0, y: 50, z: 0 }); //トラックボール利用時は自動的に無効

    //orbitcontrlosの宣言
    orbit = new THREE.OrbitControls(camera,renderer.domElement);
    orbit.minDistance =  10;   //近づける距離の最小値
    orbit.maxDistance = 8000;   //遠ざかれる距離の最大値

}


////////////////////////////////////////////////////////////////////
// cube初期化関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var cubes = []; //直方体オブジェクト
var rayReceiveObjects = []; //光線を受けるオブジェクト配列
function initCube(){
    //軸オブジェクトの生成
    // var axis; //軸オブジェクト
    // axis = new THREE.AxisHelper(1000);
    // //軸オブジェクトのシーンへの追加
    // scene.add(axis);
    // //軸オブジェクトの位置座標を設定
    // axis.position.set(0, 0, 0);

    //Cube
    var geometry1 = new THREE.CubeGeometry(2000,500,4000);
    var material1 = new THREE.MeshLambertMaterial({color : 'silver'});
    // var material1 = new THREE.MeshNormalMaterial();
    var cube1 = new THREE.Mesh(geometry1,material1);
    cube1.position.set(0, -250, 0);
    scene.add(cube1);
}


////////////////////////////////////////////////////////////////////
// オブジェクト初期化関数の定義
////////////////////////////////////////////////////////////////////
var jsonObj,faceMaterial;
function initObject(){

    // JSONObj
    loader = new THREE.JSONLoader();
    loader.load("cycle2color.js", function( geometry, materials ) {
    faceMaterial = new THREE.MeshFaceMaterial( materials );
    for(var i = 0, len = materials.length; i < len; i++){
        materials[i].side = THREE.DoubleSide;
    }
    jsonObj = new THREE.Mesh( geometry, faceMaterial );
    jsonObj.position.set( 50, -25, 0);
    jsonObj.scale.set( 15, 15, 15 );
    jsonObj.name = "workObj";
    scene.add( jsonObj );

    // jsonObj.name = "tes1";
    rayReceiveObjects.push( jsonObj );
    });
}


////////////////////////////////////////////////////////////////////
// wireframe初期化関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
function initWire() {
    loader = new THREE.JSONLoader();
    loader.load("cycle2color.js", function( geometry, materials ) {
    var faceMaterial = new THREE.MeshPhongMaterial({                              
        color: 0x990000, //球の色
        wireframe: true //ワイヤーフレーム有効
    });
    for(var i = 0, len = materials.length; i < len; i++){
        materials[i].side = THREE.DoubleSide;
    }
    jsonObj = new THREE.Mesh( geometry, faceMaterial );
    jsonObj.position.set( 50, -25, 0);
    jsonObj.scale.set( 15, 15, 15 );
    scene.add( jsonObj );
    rayReceiveObjects.push( jsonObj );
    });
}


////////////////////////////////////////////////////////////////////
// ライト初期化関数の定義
////////////////////////////////////////////////////////////////////
function initLight(){
    var color = 'white';
    var directionalLight = new THREE.DirectionalLight(color, 1.0);
    directionalLight.position.set(-2, 1, 1).normalize(); // 光源の角度を設定
    scene.add(directionalLight); // シーンに追加
    var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
    scene.add( hemisphereLight );
}


////////////////////////////////////////////////////////////////////
// イベント準備関数
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var posi_x;
var posi_y;
var posi_z;
var INTERSECTED; //マウスポインタが指しているオブジェクト
var post_already = 1;

function initEvent() {

    //HTML要素の位置による補正量の取得
    var elementOffsetLeft, elementOffsetTop; 
    //マウスポインタの位置
    var mouse = new THREE.Vector2();
    //光線発射オブジェクト
    var raycaster = new THREE.Raycaster();

    //マウスダウンイベント
    canvasFrame.a
    addEventListener( 'mousedown', onDocumentMouseDown, false );
    function onDocumentMouseDown( event ) {

        //canvas要素の絶対座標の取得
        elementOffsetLeft = canvasFrame.getBoundingClientRect( ).left; 
        elementOffsetTop = canvasFrame.getBoundingClientRect( ).top; 

        //クリップ座標系におけるマウスポインタの位置座標の取得
        mouse.x = ( (event.clientX-elementOffsetLeft) / canvasFrame.clientWidth) * 2 - 1;
        mouse.y = -( (event.clientY-elementOffsetTop) / canvasFrame.clientHeight) * 2 + 1;

        //マウスポインタの位置をと現時点のカメラ関連パラメータを設定
        raycaster.setFromCamera( mouse, camera );

        //光線と交わるオブジェクトを収集
        var intersects = raycaster.intersectObjects( rayReceiveObjects );

        //交わるオブジェクトが１個以上の場合
        if ( intersects.length > 0 ) {
            //オブジェクトがクリックされた時
           

            if(intersects[0].object.name == "workObj"){
               
                // console.log( intersects[0].point);
                posi_x = intersects[0].point.x;
                posi_y = intersects[0].point.y;
                posi_z = intersects[0].point.z;

                if(($('#partReview').length > 0) && (post_already == 1)){
                    //タグ削除
                    tag_remove();
                    formDom_remove();
                }
                if(post_already == 0){
                    formDom_remove();
                }
                //タグ作成
                tag_create();
                formDom_create();
            }
            //tagがクリックされた時
            else if(intersects[0].object.name == "tag1"){
                if($('#part_review').length > 0){
                        $('#part_review').remove();
                }

                 

                 INTERSECTED = intersects[0].object;
                 console.log(INTERSECTED.position);
                 tag_review();

                // console.log( intersects[0].point);
            }

        //最も近いオブジェクトの名前をアラート表示する
            // alert( intersects[0].object.name + "がクリックされました！");
        //     console.log("カメラ位置座標からの距離：" + intersects[0].distance);
        //     console.log("光線との交差座標(" + intersects[0].point.x + ", " + intersects[0].point.y + ", " + intersects[0].point.z + ")" );
        
        }
    }
}

var geometry1;
var material1;
function tag_remove(){
    scene.remove(tags);
    geometry1.dispose();
    material1.dispose();
    rayReceiveObjects.pop();
}

function formDom_remove(){
    $('#partReview').remove();
                 post_already = 1;
}


//グローバル変数
var tags = 0; //直方体オブジェクト
function tag_create(){
    // 直方体の形状と材質の定義
    geometry1 = new THREE.CubeGeometry(50,50,50);
    material1 = new THREE.MeshNormalMaterial();
    // tagオブジェクトの準備
    tags = new THREE.Mesh(geometry1,material1);
    
    tags.name = "tag1";
    tags.position.set(posi_x, posi_y, posi_z);
    tags.rotation.x = 45;
    tags.rotation.y = 45;
    
    scene.add(tags);
    rayReceiveObjects.push( tags );

    console.log(rayReceiveObjects);
}

function formDom_create(){
    //partreviewform_DOM実装
    var id = document.getElementById("partReview_form");
    var form1 = document.createElement("form");
    form1.id = "partReview";
    form1.method = "post";
    form1.name = "hoge2";
    form1.action = "test1_part.php";
    id.appendChild(form1); 

    var table1 = document.createElement("table");
    table1.border = 2;
    table1.id = "add_data";
    form1.appendChild(table1); 

    // var input0 = document.createElement("input");
    // input0.id = "add_data";
    // table1.appendChild(input0);

    var tr1 = document.createElement("tr");
    table1.appendChild(tr1);
    var th1 = document.createElement("th");
    th1.innerHTML = "contributor : ";
    tr1.appendChild(th1);
    var td1 = document.createElement("td");
    tr1.appendChild(td1);
    var textarea1 = document.createElement("textarea");
    textarea1.id = "word_id3";
    textarea1.name = "Contributor"; 
    textarea1.rows = "1";
    td1.appendChild(textarea1);

    var tr2 = document.createElement("tr");
    table1.appendChild(tr2);
    var th2 = document.createElement("th");
    th2.innerHTML = "partReview : "; 
    tr2.appendChild(th2);
    var td2 = document.createElement("td");
    tr2.appendChild(td2);
    var textarea2 = document.createElement("textarea");
    textarea2.name = "partreview";
    textarea2.id = "word_id4";
    textarea2.rows = "4";
    textarea2.cols = "40";
    td2.appendChild(textarea2);

    var input1 = document.createElement("input");
    input1.type = "reset";
    input1.value = "Clear";
    form1.appendChild(input1);

    var input2 = document.createElement("input");
    input2.type = "submit";
    input2.id = "submit_part";
    input2.value = "Submit";
    form1.appendChild(input2); 
}


////////////////////////////////////////////////////////////////////
// 無限ループ関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var step = 0; //ステップ数
var request_stop;
function loop() {
    orbit.update();
    //ステップ数のインクリメント
    step++;
    //レンダリング
    renderer.render(scene, camera);
    //「loop()」関数の呼び出し
    request_stop = requestAnimationFrame(loop);
}


//////////////////////////////////////////////
// addButtonDom   
//////////////////////////////////////////////
function addButton(){
    // materialButton_DOM実装
    var id = document.getElementById("add_button");
    var input1 = document.createElement("input");
    input1.type = "button";
    input1.value = "material";
    input1.id = "material";
    input1.setAttribute("onclick","material_button()");
    id.appendChild(input1); 

    // fireButton_DOM実装
    var id = document.getElementById("add_button");
    var input1 = document.createElement("input");
    input1.type = "button";
    input1.value = "wireFrame";
    input1.id = "wireFrame";
    input1.setAttribute("onclick","wireFrame_button()");
    id.appendChild(input1); 

    // download_DOM実装
    var id = document.getElementById("add_button");
    var input1 = document.createElement("input");
    input1.type = "button";
    input1.value = "screen_shoot";
    input1.id = "download";
    input1.setAttribute("onclick","download_button()");
    id.appendChild(input1); 
}


function material_button(){
    window.cancelAnimationFrame(request_stop);
    scene.remove(jsonObj);
    initObject(); //オブジェクト初期化関数の実行
    loop();       //無限ループ関数の実行
}

function wireFrame_button(){
    window.cancelAnimationFrame(request_stop);
    scene.remove(jsonObj);
    initWire(); //オブジェクト初期化関数の実行
    loop();       //無限ループ関数の実行
}

function download_button(){    
    if($('#img_download').length){
        $('a').remove();
    }
    var id = document.getElementById("add_button");
    var a1 = document.createElement("a");
    var canvas = document.getElementById('canvas');
    var canvas = renderer.domElement;
    var imgsrc = canvas.toDataURL('image/png');
    a1.id = "img_download"
    a1.href = imgsrc;
    a1.download = "picture";
    a1.innerHTML = "download";
    id.appendChild(a1); 
}


















////////////////////////////////////////////////////////////////////
//データベース処理のスタート関数の実行
////////////////////////////////////////////////////////////////////
function dbStart(){
    work_title();//作品タイトル取得
    // form_Storage();//フォーム格納
    // review_get();//レビューデータ
}


//////////////////////////////////////////////
// 作品タイトルの読み込み  
//////////////////////////////////////////////
function work_title(){
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
}


//////////////////////////////////////////////
// allformデータ格納  
//////////////////////////////////////////////

//関数＿form_ajax送信
$(document).ready(function(){
    $("#submit_all").click(function(event){
        //フォームが通常の動きをしないように
        event.preventDefault();
        //post.php⬅︎testのurlに入れたい
        // var  form = $(this).parents('form').attr('action');
        // console.log(form);
        //初期化
//         $("#ajax_result").empty();
//         $('<input>').attr({
//         type: 'hidden',
//         id: 'word_id3',
//         name: 'hoge',
//         value: camera_position
//   　　　}).appendTo('#target_id');
        ajax_all();
    });
});
function ajax_all(){
    var word_val1=$("#word_id1").val(); 
    var word_val2=$("#word_id2").val(); 
    // var word_val3=$("#word_id3").val(); 
    $.ajax({
        type: 'GET',
        url: 'test1_all.php',
        data:{
            word1:word_val1,
            word2:word_val2
        },
        dataType: 'html',
    })
    //$.post('./test.php', {word1:word_val1,word2:word_val2})
    .done(function(data, status, jqXHR){
        $("#ajax_test").html(data);
        var phpdata = data;
        console.log(phpdata);
        console.log(status);
        //$("#ajax_result").html(data.word1 +"と"+ data.word2);//PHPからJSON形式で返ってくる場合
    })
    .fail(function(jqXHR, status, error){
         $("#ajax_test").html("エラーです");
         console.log(status);
    })
    .always(function(jqXHR, status){
        console.log(status);
    });
}


//////////////////////////////////////////////
// partformデータ格納  
//////////////////////////////////////////////

//関数＿form_ajax送信
$(document).ready(function(){
    $("#partReview_form").on('submit','form',function(event){

        post_already = 0;
        console.log(post_already);
        //フォームが通常の動きをしないように
        event.preventDefault();
        //post.php⬅︎testのurlに入れたい
        // var  form = $(this).parents('form').attr('action');
        // console.log(form);
        //初期化
        // $("#ajax_result").empty();
        $('<input>').attr({
        type: 'hidden',
        id: 'word_id5',
        name: 'hoge',
//         value: posix_int
        value: posi_x
  　　　}).appendTo('#add_data');
        
        $('<input>').attr({
        type: 'hidden',
        id: 'word_id6',
        name: 'hoge',
//         value: posiy_int
        value: posi_y
  　　　}).appendTo('#add_data');

        $('<input>').attr({
        type: 'hidden',
        id: 'word_id7',
        name: 'hoge',
//         value: posiz_int
        value: posi_z
  　　　}).appendTo('#add_data');

        ajax_part();
    });
});
function ajax_part(){
    var word_val1=$("#word_id3").val(); 
    var word_val2=$("#word_id4").val(); 
    var word_val3=$("#word_id5").val();
    var word_val4=$("#word_id6").val(); 
    var word_val5=$("#word_id7").val(); 
    $.ajax({
        type: 'POST',
        url: 'test1_part.php',
        data:{
            word1:word_val1,
            word2:word_val2,
            word3:word_val3,
            word4:word_val4,
            word5:word_val5
        },
        dataType: 'html',
    })
    //$.post('./test.php', {word1:word_val1,word2:word_val2})
    .done(function(data, status, jqXHR){
        $("#ajax_test").html(data);
        var phpdata = data;
        console.log(phpdata);
        console.log(status);
        //$("#ajax_result").html(data.word1 +"と"+ data.word2);//PHPからJSON形式で返ってくる場合
    })
    .fail(function(jqXHR, status, error){
         $("#ajax_test").html("エラーです");
         console.log(status);
    })
    .always(function(jqXHR, status){
        console.log(status);
    });
}


// //////////////////////////////////////////////
// // レビューデータ取得(チェックボックスクリック)  
// //////////////////////////////////////////////
// //データベースから値取得
// function review_get(){
//     $.ajax({
//         type: 'POST',
//         url: 'index_db_partreviewinfo_get.php',
//         dataType: 'json',
//     })
//     .done(function(data, status, jqXHR){
//         // $("#work_read").html(data);
//         console.log(data);
//         var rl_name = data['name'];
//         var rl_comment = data['comment'];
//         review_list(rl_name, rl_comment);
//     })
//     .fail(function(jqXHR, status, error){
//          $("#ajax_result").html("エラーです");
//          console.log(status);
//     })
//     .always(function(jqXHR, status){
//         console.log(status);
//     });
// }





// selectでpositionに対するレビュー表示
//////////////////////////////////////////////
// レビューデータ取得(タグクリック)  
//////////////////////////////////////////////
//データベースから値取得
var tagData_get;
function tag_review(){
    var positionX =INTERSECTED.position.x;
    var positionY =INTERSECTED.position.y;
    var positionZ =INTERSECTED.position.z;
    console.log(positionX);

    // $.ajax({
    //     type: 'POST',
    //     url: 'test1_part_get.php',
    //     dataType: 'json',
    // })
    $.ajax({
        type: 'POST',
        url: 'test1_part_get.php',
        data:{
            word1:positionX,
            word2:positionY,
            word3:positionZ
        },
        dataType: 'json',
    })
    //$.post('./test.php', {word1:word_val1,word2:word_val2})
    .done(function(data, status, jqXHR){
        // $("#ajax_test").html(data);
        var tagData_get = data;
        // console.log(tagData_get[1]);
        review_list(tagData_get[0],tagData_get[1],tagData_get[2]);
        // console.log(status);
        // post_already = 0;
        //$("#ajax_result").html(data.word1 +"と"+ data.word2);//PHPからJSON形式で返ってくる場合
    })
    .fail(function(jqXHR, status, error){
         $("#ajax_test").html("エラーです");
         console.log(status);
    })
    .always(function(jqXHR, status){
        console.log(status);
    });
}




var i = 1;
function review_list(date,name,review){
    i++;
    var now = new Date();
    var x = name;
    var y = review;
    var answer1 = document.getElementById('answer1');
    
    var div0 = document.createElement("div");
    div0.id = "part_review";
    answer1.appendChild(div0);
    
    var span1 = document.createElement("span");
    var a1 = document.createElement("a");
    var span2 = document.createElement("span");
    var div1 = document.createElement("div");
    var p1 = document.createElement("p");
    var hr = document.createElement("hr");

    span1.innerHTML = "reviewer"+"&nbsp;";
    a1.setAttribute("href", "url");
    a1.innerHTML = x;
    // span2.innerHTML = "Posted_date" + "&nbsp;" + now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate();
    span2.innerHTML = "&nbsp;"+"Posted_date" + "&nbsp;" + date;

    // div1.setAttribute("id", "rateit"+i);
    p1.innerHTML = y;

    div0.appendChild(span1);
    div0.appendChild(a1);
    div0.appendChild(span2);
    div0.appendChild(div1);
    div0.appendChild(p1);
    div0.appendChild(hr);
    // $(function() {
    //     // RateItの設定（2）
    //     $("#rateit"+i).rateit();
    // });
}



// var i = 1;
// function review_list(name, review){
//     i++;
//     var now = new Date();
//     var x = name;
//     var y = review;



// // PDOの時の実装
// $dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
// $user = 'root';
// $password = 'root';

// try{
// //データーベースに接続
//     $pdo = new PDO($dsn, $user, $password);
//     // // prepareメソッドでSQLをセット
//     $stmt = $pdo->prepare("select title from workinfo where workid  = ? ");
//     // and studentid = ?
//     //bindValueメソッドでパラメータをセット
//     $stmt->bindValue(1,1);
//     // $stmt->bindValue(2,3);
//     //executeでクエリを実行
//     $stmt->execute();
//     //結果を表示
//     $result = $stmt->fetch();
//     echo $result[0];
    
   
//     //接続終了
//     $pdo = null;
// }
// //接続に失敗した際のエラー処理
// catch (PDOException $e){
//     print('エラーが発生しました。:'.$e->getMessage());
//     die();
// }
//     var answer1 = document.getElementById('answer1');
    
//     var span1 = document.createElement("span");
//     var a1 = document.createElement("a");
//     var span2 = document.createElement("span");
//     var div1 = document.createElement("div");
//     var p1 = document.createElement("p");
//     var hr = document.createElement("hr");

//     span1.innerHTML = "reviewer";
//     a1.setAttribute("href", "url");
//     a1.innerHTML = x;
//     span2.innerHTML = "Posted_date" + "&nbsp;" + now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate();
//     // div1.setAttribute("id", "rateit"+i);
//     p1.innerHTML = y;

//     answer1.appendChild(span1);
//     answer1.appendChild(a1);
//     answer1.appendChild(span2);
//     answer1.appendChild(div1);
//     answer1.appendChild(p1);
//     answer1.appendChild(hr);
    
//     // $(function() {
//     //     // RateItの設定（2）
//     //     $("#rateit"+i).rateit();
//     // });
// }





