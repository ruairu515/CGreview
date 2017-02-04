////////////////////////////////////////////////////////////////////
// 作品データ呼び出し
////////////////////////////////////////////////////////////////////
var file_data;
function tes(list_data){
    // console.log(list_data);
    file_data = list_data;
}

////////////////////////////////////////////////////////////////////
// windowイベントの定義
////////////////////////////////////////////////////////////////////
window.addEventListener("load", function () {
    // file_get();//作品データ取得
    work_title();//作品タイトル取得
    setTimeout("threeStart()",50);//Three.jsのスタート関数の実行
    setTimeout("dbStart()",50);//その他DB処理のスタート関数の実行
});


// Three.jsスタート関数の定義
////////////////////////////////////////////////////////////////////
function threeStart() {
    initThree();  //Three.js初期化関数の実行
    // initCube();  //cube初期化関数の実行
    initObject(); //json初期化関数の実行
    // initOBJ();//obj,mtl初期化関数の実行
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
var cubes = []; //直方体オブジェクト
var rayReceiveObjects = []; //光線を受けるオブジェクト配列
function initCube(){
    //Cube
    var geometry1 = new THREE.CubeGeometry(2000,500,4000);
    var material1 = new THREE.MeshLambertMaterial({color : 'silver'});
    var cube1 = new THREE.Mesh(geometry1,material1);
    cube1.position.set(0, -250, 0);
    scene.add(cube1);
}

////////////////////////////////////////////////////////////////////
// jsonオブジェクト初期化関数の定義
////////////////////////////////////////////////////////////////////
var jsonObj,faceMaterial;
function initObject(){

    // JSONObj
    loader = new THREE.JSONLoader();
    loader.load("./assets/work_files/"+file_data, function( geometry, materials ) {
    faceMaterial = new THREE.MeshFaceMaterial( materials );
    for(var i = 0, len = materials.length; i < len; i++){
        materials[i].side = THREE.DoubleSide;
    }
    jsonObj = new THREE.Mesh( geometry, faceMaterial );
    jsonObj.position.set( 50, -25, 0);
    jsonObj.scale.set( 15, 15, 15 );
    jsonObj.name = "workObj";
    scene.add( jsonObj );

    rayReceiveObjects.push( jsonObj );
    });
}


////////////////////////////////////////////////////////////////////
// obj_mtlオブジェクト初期化関数の定義
////////////////////////////////////////////////////////////////////
function initOBJ(){
    // var onProgress = function ( xhr ) {
    //     if ( xhr.lengthComputable ) {
    //         var percentComplete = xhr.loaded / xhr.total * 100;
    //         console.log( Math.round(percentComplete, 2) + '% downloaded' );
    //     }
    // };
    // var onError = function ( xhr ) { };
    // THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    var mtlLoader = new THR9EE.MTLLoader();
    // mtlLoader.setPath( 'obj/male02/' );
    mtlLoader.load( 'cycle2color.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        // objLoader.setPath( 'obj/male02/' );
        objLoader.load( 'cycle2color.obj', function ( object ) {
            object.position.y = - 95;
            scene.add( object );
        }, onProgress, onError );
    });
}


////////////////////////////////////////////////////////////////////
// wireframe初期化関数の定義
////////////////////////////////////////////////////////////////////
function initWire() {
    loader = new THREE.JSONLoader();
    loader.load("./assets/work_files/"+file_data, function( geometry, materials ) {
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
                tag_create(posi_x,posi_y,posi_z);
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
            }
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
function tag_create(posix,posiy,posiz){
    // 直方体の形状と材質の定義
    geometry1 = new THREE.CubeGeometry(50,50,50);
    material1 = new THREE.MeshNormalMaterial();
    // material1 = new THREE.MeshPhongMaterial({color: "red", transparent:true, blending:THREE.NormalBlending, opacity:0.5 });

    // tagオブジェクトの準備
    tags = new THREE.Mesh(geometry1,material1);   
    tags.name = "tag1";
    tags.position.set(posix, posiy, posiz);
    tags.rotation.x = 45;
    tags.rotation.y = 45;
    scene.add(tags);
    rayReceiveObjects.push( tags );
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

    //tagremove実装
    // var id = document.getElementById("add_button");
    // var input1 = document.createElement("input");
    // input1.type = "button";
    // input1.value = "tagRemove";
    // input1.id = "download";
    // input1.setAttribute("onclick","tagRemove_button()");
    // id.appendChild(input1); 
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

function tagRemove_button(){
    var len = arrayBefore.length;
    console.log(len);
}

////////////////////////////////////////////////////////////////////
//データベース処理のスタート関数の実行
////////////////////////////////////////////////////////////////////
function dbStart(){
    dataGet();//jsonファイル読み込み
    allreview();//全体評価の平均
}

//////////////////////////////////////////////
// 作品タイトルの読み込み  
//////////////////////////////////////////////
function work_title(){
    // console.log("list_data");
    $("#work_read").html(file_data);
//     $.ajax({
//         type: 'POST',
//         url: './assets/php/test2_workid_get.php',
//         dataType: 'html',
//     })
//     .done(function(data, status, jqXHR){
//         $("#work_read").html(data);
//         // console.log(data);
//     })
//     .fail(function(jqXHR, status, error){
//          $("#ajax_result").html("エラーです");
//          console.log(status);
//     })
//     .always(function(jqXHR, status){
//         // console.log(status);
//     });
}

////////////////////////////////////////////////////////////////////
//jsonデータ読み込み
////////////////////////////////////////////////////////////////////
// var file_data;
// function file_get(){
//     console.log("1番目");
//     $.ajax({
//         type: 'POST',
//         url: './assets/php/test2_file_get.php',
//         dataType: 'html',
//     })
//     .done(function(data, status, jqXHR){
//         // $("#work_read").html(data);
//         console.log("2番目");
//         file_data = data;
//         console.log(data);

//     })
//     .fail(function(jqXHR, status, error){
//          $("#ajax_result").html("エラーです");
//          console.log(status);
//     })
//     .always(function(jqXHR, status){
//         // console.log(status);
//     });
// }

////////////////////////////////////////////////////////////////////
//ファイル毎のタグデータ読み込み(ファイル指定なし)
////////////////////////////////////////////////////////////////////
var jsonData = [];
var arrayBefore;
function dataGet(){
    var word_val1=file_data; 
    $.ajax({
        type: 'POST',
        url: './assets/php/test2_tag_get.php',
        data:{
            word1:word_val1
        },
        dataType: 'json',
    })
    .done(function(data, status, jqXHR){
        arrayBefore = data;
        console.log(data);

        // console.log(arrayBefore.length);
        var arrayAfter = arrayBefore;
        while(arrayAfter.length > 0){
            var i=0;          
            posi_x = arrayAfter[i][0];
            posi_y = arrayAfter[i][1];
            posi_z = arrayAfter[i][2];
            tag_create(posi_x,posi_y,posi_z); 
            arrayAfter.shift();
            // console.log(arrayAfter.length);
            i = i+1;
        }   
    })
    .fail(function(jqXHR, status, error){
         $("#ajax_test").html("エラーです");
         console.log(status);
    })
    .always(function(jqXHR, status){
        // console.log(status);
    });
}
//////////////////////////////////////////////
// 全体評価の平均  
//////////////////////////////////////////////
var alldata = [];
function allreview(){
    var word_val1=file_data;
    $.ajax({
        type: 'POST',
        url: './assets/php/test2_all_get.php',
        data:{
            word1:word_val1
        },
        dataType: 'json',
    })
    .done(function(data, status, jqXHR){
         console.log(data);
        all_create("modeling",data[0],data[1],data[2],data[3],data[4],data[5]);
        all_create("material",data[6],data[7],data[8],data[9],data[10],data[11]);


    })
    .fail(function(jqXHR, status, error){
         $("#ajax_test").html("エラーです");
         console.log(status);
    })
    .always(function(jqXHR, status){
        // console.log(status);
    });
}
function all_create(text,avg,evaluation5,evaluation4,evaluation3,evaluation2,evaluation1){
    // console.log(evaluation5);
    // console.log(evaluation4);
    // console.log(evaluation3);
    // console.log(evaluation2);
    // console.log(evaluation1);


    var id1 = document.getElementById("all_create_target");
    var div1 = document.createElement("div");
    var h21 = document.createElement("h2");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var div4 = document.createElement("div");

    h21.setAttribute("class","avg_text");
    h21.innerHTML=text+" :"+"&nbsp;";
    div1.setAttribute("class","all_box");
    div2.setAttribute("class","avg_box");
    div3.setAttribute("class","avg_bar");
    div4.setAttribute("class","avg_data");

    div3.style="width:"+avg+"cm;";
    div4.innerHTML=avg;
    
    id1.appendChild(div1);
    div1.appendChild(h21);
    div1.appendChild(div2);
    div2.appendChild(div3);
    div1.appendChild(div4);
    
    var i=0;
    var m=0;
    
    var array=[evaluation5,evaluation4,evaluation3,evaluation2,evaluation1,evaluation1];
    while(i < 5){
        var table1 = document.createElement("table");    
        var tr1 = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var div5 = document.createElement("div");
        var div6 = document.createElement("div");
        var td3 = document.createElement("td");

        var m=5-i;
        td1.innerHTML="Evaluation"+m+" : ";

        div5.setAttribute("class","one_box");
        div6.setAttribute("class","one_bar");
        
        div6.style="width:"+array[i]+"cm;";
        td3.innerHTML=array[i];

        div1.appendChild(table1);
        table1.appendChild(tr1);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        td2.appendChild(div5);
        div5.appendChild(div6);
        tr1.appendChild(td3);
        i= i+1;
    }
}




//////////////////////////////////////////////
// allformデータ格納  
//////////////////////////////////////////////
$(document).ready(function(){
    $("#submit_all").click(function(event){
        event.preventDefault();
        ajax_all();
    });
});
function ajax_all(){
    var word_val1=$("#word_id1").val(); 
    var word_val2=$("#word_id2").val(); 
    var word_val3=file_data;
    $.ajax({
        type: 'POST',
        url: './assets/php/test2_all_post.php',
        data:{
            word1:word_val1,
            word2:word_val2,
            word3:word_val3
        },
        dataType: 'html',
    })
    .done(function(data, status, jqXHR){
        // $("#ajax_test").html(data);
        console.log(data);
        // console.log(status);
    })
    .fail(function(jqXHR, status, error){
         $("#ajax_test").html("エラーです");
         console.log(status);
    })
    .always(function(jqXHR, status){
        // console.log(status);
    });
}

//////////////////////////////////////////////
// partformデータ格納  
//////////////////////////////////////////////
$(document).ready(function(){
    $("#partReview_form").on('submit','form',function(event){
        post_already = 0;
        // console.log(post_already);
        //フォームが通常の動きをしないように
        event.preventDefault();
        $('<input>').attr({
        type: 'hidden',
        id: 'word_id5',
        name: 'hoge',
        value: posi_x
  　　　}).appendTo('#add_data');
        
        $('<input>').attr({
        type: 'hidden',
        id: 'word_id6',
        name: 'hoge',
        value: posi_y
  　　　}).appendTo('#add_data');

        $('<input>').attr({
        type: 'hidden',
        id: 'word_id7',
        name: 'hoge',
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
    var word_val6=file_data;
    $.ajax({
        type: 'POST',
        url: './assets/php/test2_part_post.php',
        data:{
            word1:word_val1,
            word2:word_val2,
            word3:word_val3,
            word4:word_val4,
            word5:word_val5,
            word6:word_val6
        },
        dataType: 'html',
    })
    .done(function(data, status, jqXHR){
        // $("#ajax_test").html(data);
        var phpdata = data;
        console.log(phpdata);
        // console.log(status);
    })
    .fail(function(jqXHR, status, error){
         $("#ajax_test").html("エラーです");
         console.log(status);
    })
    .always(function(jqXHR, status){
        // console.log(status);
    });
}


//////////////////////////////////////////////
// レビューデータ取得(タグクリック)  
//////////////////////////////////////////////
var tagData_get;
function tag_review(){
    var positionX =INTERSECTED.position.x;
    var positionY =INTERSECTED.position.y;
    var positionZ =INTERSECTED.position.z;

    $.ajax({
        type: 'POST',
        url: './assets/php/test2_tag_click.php',
        data:{
            word1:positionX,
            word2:positionY,
            word3:positionZ
        },
        dataType: 'json',
    })
    .done(function(data, status, jqXHR){
        var tagData_get = data;
        review_list(tagData_get[0],tagData_get[1],tagData_get[2]);
    })
    .fail(function(jqXHR, status, error){
         $("#ajax_test").html("エラーです");
         console.log(status);
    })
    .always(function(jqXHR, status){
        // console.log(status);
    });
}

function review_list(date,name,review){
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
    span2.innerHTML = "&nbsp;"+"Posted_date" + "&nbsp;" + date;

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
