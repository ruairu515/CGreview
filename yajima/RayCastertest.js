   



////////////////////////////////////////////////////////////////////
// windowイベントの定義
////////////////////////////////////////////////////////////////////
window.addEventListener("load", function () {
    threeStart(); //Three.jsのスタート関数の実行
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
    //renderer = new THREE.CanvasRenderer();//<------------------------------------------------------------------------------------------------------------（canvasレンダラー）

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
    scene.add( jsonObj );
    rayReceiveObjects.push( jsonObj );
    });





    /////////////直方体の形状と材質の定義//////////////////
    // 形状オブジェクトの宣言と生成
    // var geometry = new THREE.CubeGeometry(100, 25, 200);
    // // 材質オブジェクトの宣言と生成
    // var material = new THREE.MeshNormalMaterial();
    // var material = new THREE.MeshLambertMaterial({color : 'blue'});


    ///////////直方体オブジェクトの準備//////////////////
    // 直方体オブジェクトの生成
    // cubes[0] = new THREE.Mesh(geometry, material);
    // // 直方体オブジェクトのシーンへの追加
    // scene.add(cubes[0]);
    // // 直方体オブジェクトの位置座標を設定
    // cubes[0].position.set(0, 0, 0);

    // // 直方体オブジェクトの生成
    // cubes[1] = new THREE.Mesh(geometry, material);
    // // 直方体オブジェクトのシーンへの追加
    // scene.add(cubes[1]);
    // // 直方体オブジェクトの位置座標を設定
    // cubes[1].position.set(0, 0, 0);

    // // 直方体オブジェクトの生成
    // cubes[2] = new THREE.Mesh(geometry, material);
    // // 直方体オブジェクトのシーンへの追加
    // scene.add(cubes[2]);
    // // 直方体オブジェクトの位置座標を設定
    // cubes[2].position.set(0, 50, 0);

    // 光線受信判定用
    // cubes[0].name = "cube";
    // cubes[1].name = "箱２";
    // cubes[2].name = "箱３";

    // 光線受信オブジェクト配列へ追加
    // rayReceiveObjects.push( cubes[0] );
    // rayReceiveObjects.push( cubes[1] );
    // rayReceiveObjects.push( cubes[2] );
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

            console.log( intersects[0].point);
            posi_x = intersects[0].point.x;
            posi_y = intersects[0].point.y;
            posi_z = intersects[0].point.z;


            var geometry1 = new THREE.CubeGeometry(50,50,50);
            // var material1 = new THREE.MeshLambertMaterial({color : 'silver'});
            var material1 = new THREE.MeshNormalMaterial();
            var cube1 = new THREE.Mesh(geometry1,material1);
            cube1.position.set(posi_x, posi_y, posi_z);
            cube1.rotation.x = 45;
            cube1.rotation.y = 45;
            scene.add(cube1);
            rayReceiveObjects.push( cube1 );

        //最も近いオブジェクトの名前をアラート表示する
        //     alert( intersects[0].object.name + "がクリックされました！");
        //     console.log("カメラ位置座標からの距離：" + intersects[0].distance);
        //     console.log("光線との交差座標(" + intersects[0].point.x + ", " + intersects[0].point.y + ", " + intersects[0].point.z + ")" );
        }
    }
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
    //各直方体の角度の変更
    // cubes[0].rotation.set(step / 100, 0, 0);
    // cubes[1].rotation.set(0, step / 100, 0);
    // cubes[2].rotation.set(0, 0, step / 100);

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
    input1.id = "wireFrame"
    input1.setAttribute("onclick","wireFrame_button()");
    id.appendChild(input1); 

    // download_DOM実装
    var id = document.getElementById("add_button");
    var input1 = document.createElement("input");
    input1.type = "button";
    input1.value = "screen_shoot";
    input1.id = "download"
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
    if($('#test').length){
        $('a').remove();
    }
    var id = document.getElementById("add_button");
    var a1 = document.createElement("a");
    var canvas = document.getElementById('canvas');
    var canvas = renderer.domElement;
    var imgsrc = canvas.toDataURL('image/png');
    a1.id = "test"
    a1.href = imgsrc;
    a1.download = "picture";
    a1.innerHTML = "download";
    id.appendChild(a1); 
}





