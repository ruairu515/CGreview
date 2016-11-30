// var camera_position;
// var requestId;
// var width1 = 600;
// var height1 = 400;
// var DB_jsonfile = "cycle2color.js"//DBデータ仮



// //関数_作品表示
// function Domdata(data2, whith2, height2,mate_switch){

//     //scene
//     var scene = new THREE.Scene();
    
//     //オブジェクト格納グローバル変数
//     var targetList = []; 


//     //Cube
//     var geometry = new THREE.CubeGeometry(2000,500,4000);
//     //ワイヤー切り替え
//     if(mate_switch == 0){
//         //マテリアル指定
//         var material = new THREE.MeshLambertMaterial({color : 'silver'});
//     }else if(mate_switch == 1){
//         //マテリアル指定
//         var material = new THREE.MeshLambertMaterial({color : 'silver'});
//     }else if(mate_switch == 2){
//         //ワイヤーフレーム指定
//         var material = new THREE.MeshPhongMaterial({                              
//             color: 0x990000, //球の色
//             wireframe: true //ワイヤーフレーム有効
//         });
//     }
//     var cube = new THREE.Mesh(geometry,material);
//     cube.position.set(0, -250, 0);
//     scene.add(cube);


//     // targetList.push(cube);
//     targetList[0] = cube;


//     // // JSONObj
//     // var jsonObj,faceMaterial;
//     // loader = new THREE.JSONLoader();
//     // loader.load(data2, function( geometry, materials ) {
//     // //ワイヤー切り替え
//     // if(mate_switch == 0){
//     //     //マテリアル指定
//     //     faceMaterial = new THREE.MeshFaceMaterial( materials );
//     // }else if(mate_switch == 1){
//     //     //マテリアル指定
//     //     faceMaterial = new THREE.MeshFaceMaterial( materials );
//     // }else if(mate_switch == 2){
//     //     //ワイヤーフレーム指定
//     //     var faceMaterial = new THREE.MeshPhongMaterial({                              
//     //         color: 0x990000, //球の色
//     //         wireframe: true //ワイヤーフレーム有効
//     //     });
//     // }
//     // for(var i = 0, len = materials.length; i < len; i++){
//     //     materials[i].side = THREE.DoubleSide;
//     // }
//     // jsonObj = new THREE.Mesh( geometry, faceMaterial );
//     // jsonObj.position.set( 50, -25, 0);
//     // jsonObj.scale.set( 15, 15, 15 );
//     // scene.add( jsonObj );
//     // });

//     // var aaa = [];
//     // aaa[0] = jsonObj;
//     // targetList.push(aaa[0]);
//     // targetList[1] = jsonObj;
//     // console.log(aaa);




//     //Dom作成
//     var id = document.getElementById("work_screen");
//     var div = document.createElement("div");

//     div.id = "three_id";

//     id.appendChild(div); 

//     //width　heightのサイズ取得
//     var width = whith2;
//     var height = height2;

//     //light
//     var color = 'white';
//     var directionalLight = new THREE.DirectionalLight(color, 1.0);
//     directionalLight.position.set(-2, 1, 1).normalize(); // 光源の角度を設定
//     scene.add(directionalLight); // シーンに追加
//     var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
//     scene.add( hemisphereLight );

//     //camera
//     var camera;
//     var cameraActive = true;
//     camera = new THREE.PerspectiveCamera(75,width/height,1,8000);
//     camera.position.set(2000, 2000, 2000); // (x, y, z)
//     camera.lookAt(cube.position);
//     scene.add(camera);


//     // var meshs = [];
//     // for( var i = 0; i > cube.length; i++ )
//     // {
//     //   // 読み込んだ obj モデルから Object3D を取り出す
//     //   var obj3d = object.cube[ i ];
//     //   for( var j = 0; j > cube.length; j++ )
//     //   {
//     //     // Object3D から Mesh を取得し配列に入れる
//     //     meshs.push( obj3d.cube[ j ] );
//     //   }
//     // }


//     //renderer
//     var renderer = new THREE.WebGLRenderer({antialias: true})
//     renderer.setSize(width,height);
//     renderer.setClearColor(0xdddddd,1);
//     document.getElementById("three_id").appendChild(renderer.domElement);
//     renderer.render(scene,camera);
//     convert();



//     var projector = new THREE.Projector();
//     //マウスのグローバル変数
//     var mouse = { x: 0, y: 0 }; 



//     // camera に Raycaster を作成して下方向に ray を向ける
//     // var ray = new THREE.Raycaster(camera.position, new THREE.Vector3(0, 0, -1));
//     // // intersectObjects に衝突判定対象のメッシュのリストを渡す
//     // var obj = ray.intersectObjects(targetList);
    
//     // console.log(obj.length);

//     // if ( obj.length > 0 ){                             
//     //     alert("click!!");
//     // } 

//     // //マウスが押された時
//     // window.onmousedown = function (ev){
//     //     if (ev.target == renderer.domElement) { 
        
//     //         //マウス座標2D変換
//     //         var rect = ev.target.getBoundingClientRect();    
//     //         mouse.x =  ev.clientX - rect.left;
//     //         mouse.y =  ev.clientY - rect.top;
            
//     //         //マウス座標3D変換 width（横）やheight（縦）は画面サイズ
//     //         mouse.x =  (mouse.x / width) * 2 - 1;           
//     //         mouse.y = -(mouse.y / height) * 2 + 1;
            
//     //         // マウスベクトル
//     //         var vector = new THREE.Vector3( mouse.x, mouse.y ,1);

//     //        // vector はスクリーン座標系なので, オブジェクトの座標系に変換
//     //         vector.unproject(camera);
//     //         // projector.unprojectVector( vector, camera );

//     //         // 始点, 向きベクトルを渡してレイを作成
//     //         var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
            
//     //          // クリック判定
//     //         // var obj = ray.intersectObjects( targetList );
//     //         var obj = ray.intersectObjects(targetList);
           
            
//     //          // クリックしていたら、alertを表示  
//     //         if ( obj.length > 0 ){                       
//     //           console.log(obj[0].object.position);
//     //        } 
//     //     }
//     // }; 




  

//         //HTML要素の位置による補正量の取得
//         var elementOffsetLeft, elementOffsetTop; 
//         //マウスポインタの位置
//         var mouse = new THREE.Vector2();
//         //光線発射オブジェクト
//         var raycaster = new THREE.Raycaster();

//         //マウスダウンイベント
//         canvasFrame.addEventListener( 'mousedown', onDocumentMouseDown, false );
//         function onDocumentMouseDown( event ) {

//             //canvas要素の絶対座標の取得
//             elementOffsetLeft = canvasFrame.getBoundingClientRect( ).left; 
//             elementOffsetTop = canvasFrame.getBoundingClientRect( ).top; 

//             //クリップ座標系におけるマウスポインタの位置座標の取得
//             mouse.x = ( (event.clientX-elementOffsetLeft) / canvasFrame.clientWidth) * 2 - 1;
//             mouse.y = -( (event.clientY-elementOffsetTop) / canvasFrame.clientHeight) * 2 + 1;

//             //マウスポインタの位置をと現時点のカメラ関連パラメータを設定
//             raycaster.setFromCamera( mouse, camera );

//             //光線と交わるオブジェクトを収集
//             var intersects = raycaster.intersectObjects( targetList );

//             //交わるオブジェクトが１個以上の場合
//             if ( intersects.length > 0 ) {

//                 console.log( intersects[0] );

//                 //最も近いオブジェクトの名前をアラート表示する
//                 alert( intersects[0].object.name + "がクリックされました！");
//                 console.log("カメラ位置座標からの距離：" + intersects[0].distance);
//                 console.log("光線との交差座標(" + intersects[0].point.x + ", " + intersects[0].point.y + ", " + intersects[0].point.z + ")" );
//             }
//         }
    







    

    
//     function convert(){
        
//         var controls = new THREE.OrbitControls(camera,renderer.domElement);
//         controls.minDistance =  10;   //近づける距離の最小値
//         controls.maxDistance = 8000;   //遠ざかれる距離の最大値
//         render();
        

//         function render(){
//             requestId = requestAnimationFrame(render);
//             renderer.render(scene,camera);
//             controls.update();//コントローラーを更新

//             var x,y,z,xz,xyz,Radian,Dgr;
//             x = camera.position.x;
//             y = camera.position.y;
//             z = camera.position.z;
//             xz = Math.sqrt(Math.pow(x,2) + Math.pow(z,2));
//             xyz = Math.sqrt(Math.pow(xz,2) + Math.pow(y,2));//カメラまでの距離
//             var Radian = Math.asin(xz/xyz);
//             var Dgr = Radian/(Math.PI/180);
//             if(x>=0 && z>=0 && Dgr>=15){
//                 console.log("x,z"); 
//                 camera_position = "x+z+";
//             }   
//             else if(x>=0 && z<0 && Dgr>=15){
//                 console.log("x,-z"); 
//                 camera_position = "x+z-";
//             }
//             else if(x<0 && z<0 && Dgr>=15){
//                 console.log("-x,-z"); 
//                 camera_position = "x+z-";
//             }
//             else if(x<0 && z>=0 && Dgr>=15){
//                 console.log("-x,z"); 
//                 camera_position = "x-z+";
//             }
//             else if(Dgr<15){
//                 console.log("top_camera");
//                 camera_position = "topcamera";
//             }   
//         }   
//     }
// }







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
    initObject(); //オブジェクト初期化関数の実行
    initCamera(); //カメラ初期化関数の実行
    initEvent();  //イベント準備関数の実行
    loop();       //無限ループ関数の実行
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
    canvasFrame = document.getElementById('canvas-frame');
    //レンダラーオブジェクトの生成
    renderer = new THREE.WebGLRenderer({ antialias: true });
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
// var trackball; //トラックボールオブジェクト
var orbit; //orbitcontrolsのオブジェクト
function initCamera() {
    //カメラオブジェクトの生成
    camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth / canvasFrame.clientHeight, 1, 10000);
    //カメラの位置の設定
    camera.position.set(100, 100, 100);
    //カメラの上ベクトルの設定
    camera.up.set(0, 1, 0);
    //カメラの中心位置ベクトルの設定
    camera.lookAt({ x: 0, y: 0, z: 0 }); //トラックボール利用時は自動的に無効

    //トラックボールオブジェクトの宣言
    // trackball = new THREE.TrackballControls(camera, canvasFrame);

    //orbitcontrlosの宣言
    orbit = new THREE.OrbitControls(camera,renderer.domElement);
    orbit.minDistance =  10;   //近づける距離の最小値
    orbit.maxDistance = 8000;   //遠ざかれる距離の最大値



    // //トラックボールの回転無効化と回転速度の設定
    // trackball.noRotate = false;
    // trackball.rotateSpeed = 4.0;

    // //トラックボールの拡大無効化と拡大速度の設定
    // trackball.noZoom = false;
    // trackball.zoomSpeed = 4.0;

    // //トラックボールのカメラ中心移動の無効化と中心速度の設定
    // trackball.noPan = false;
    // trackball.panSpeed = 1.0;
    // trackball.target = new THREE.Vector3(0, 0, 0);

    // //トラックボールのスタティックムーブの有効化
    // trackball.staticMoving = true;
    // //トラックボールのダイナミックムーブ時の減衰定数
    // trackball.dynamicDampingFactor = 0.3;

    // //トラックボールを有効化
    // trackball.enabled = false;

}

////////////////////////////////////////////////////////////////////
// オブジェクト初期化関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
// var axis; //軸オブジェクト
var cubes = []; //直方体オブジェクト
var rayReceiveObjects = []; //光線を受けるオブジェクト配列
function initObject() {
    // //Cube
    // var geometry = new THREE.CubeGeometry(100,25,200);
    // var material = new THREE.MeshLambertMaterial({color : 'blue'});
    // var material = new THREE.MeshNormalMaterial();
    // var cube = new THREE.Mesh(geometry,material);
    // cube.position.set(0, 0, 0);
    // scene.add(cube);




    // //軸オブジェクトの生成
    // axis = new THREE.AxisHelper(1000);
    // //軸オブジェクトのシーンへの追加
    // scene.add(axis);
    // //軸オブジェクトの位置座標を設定
    // axis.position.set(0, 0, 0);

    /////////////直方体の形状と材質の定義//////////////////
    // 形状オブジェクトの宣言と生成
    var geometry = new THREE.CubeGeometry(100, 25, 200);
    // 材質オブジェクトの宣言と生成
    var material = new THREE.MeshNormalMaterial();
    // var material = new THREE.MeshLambertMaterial({color : 'blue'});


    ///////////直方体オブジェクトの準備//////////////////
    // 直方体オブジェクトの生成
    cubes[0] = new THREE.Mesh(geometry, material);
    // 直方体オブジェクトのシーンへの追加
    scene.add(cubes[0]);
    // 直方体オブジェクトの位置座標を設定
    cubes[0].position.set(0, -50, 0);

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
    cubes[0].name = "cube";
    // cubes[1].name = "箱２";
    // cubes[2].name = "箱３";

    // 光線受信オブジェクト配列へ追加
    rayReceiveObjects.push( cubes[0] );
    // rayReceiveObjects.push( cubes[1] );
    // rayReceiveObjects.push( cubes[2] );

}
////////////////////////////////////////////////////////////////////
// イベント準備関数
////////////////////////////////////////////////////////////////////
function initEvent() {

    //HTML要素の位置による補正量の取得
    var elementOffsetLeft, elementOffsetTop; 
    //マウスポインタの位置
    var mouse = new THREE.Vector2();
    //光線発射オブジェクト
    var raycaster = new THREE.Raycaster();

    //マウスダウンイベント
    canvasFrame.addEventListener( 'mousedown', onDocumentMouseDown, false );
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

            console.log( intersects[0] );

            //最も近いオブジェクトの名前をアラート表示する
            alert( intersects[0].object.name + "がクリックされました！");
            console.log("カメラ位置座標からの距離：" + intersects[0].distance);
            console.log("光線との交差座標(" + intersects[0].point.x + ", " + intersects[0].point.y + ", " + intersects[0].point.z + ")" );
        }
    }
}
////////////////////////////////////////////////////////////////////
// 無限ループ関数の定義
////////////////////////////////////////////////////////////////////
//グローバル変数の宣言
var step = 0; //ステップ数
function loop() {
    //トラックボールによるカメラオブジェクトのプロパティの更新
    // trackball.update();
    orbit.update();


    //ステップ数のインクリメント
    step++;
    //各直方体の角度の変更
    // cubes[0].rotation.set(step / 100, 0, 0);
    // cubes[1].rotation.set(0, step / 100, 0);
    // cubes[2].rotation.set(0, 0, step / 100);

    //レンダリング
    renderer.render(scene, camera);

    //画像生成
    makePicture();

    //「loop()」関数の呼び出し
    requestAnimationFrame(loop);
}

//////////////////////////////////////////////
// 画像作成用    
//////////////////////////////////////////////
var makePictureFlag = false;

//画像作成用イベント
window.addEventListener('keydown', function (e) {

    //キーボードイベント時のキー取得
    var keyChar = String.fromCharCode( e.keyCode ).toLowerCase();

    //キーボードの「s」が押された場合
    if(keyChar == "s") {
        makePictureFlag = true;
    }

}); 
//画像作成関数
function makePicture(){

    if( !makePictureFlag ) return;

    //グラフィックスが描画されたcanvas要素
    var canvas = renderer.domElement;

    //a要素の生成
    var a = document.createElement("a");
    //canvas要素→DataURL形式
    a.href = canvas.toDataURL("image/png");
    //PNGファイル名の命名
    a.download = "picture";
    a.innerHTML = "ダウンロード";

    //id="thumbnails"のdiv要素の子要素にa要素を追加  
    document.getElementsByTagName( "body" )[0].appendChild(a);

    makePictureFlag = false;

}






