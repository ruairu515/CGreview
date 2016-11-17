<?php
//PDOの時の実装
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';

$options = array();

try{
//データーベースに接続
    $pdo = new PDO($dsn, $user, $password,$options);
  
    // 実行するqueryの作成（testテーブルの全データ取得）
    $query = "SELECT * FROM partreviewinfo";
    //クエリを実行
    $res = $pdo->query($query);
    //取得したデータを全てフェッチする
    $data = $res->fetch(PDO::FETCH_ASSOC);
    //データを表示する
    // print($data[title]);
    // while($result = $res->fetch(PDO::FETCH_ASSOC)){
        // print($result['workid']);
        // print($result['filename'].'<br>');
    // }

    echo json_encode($data);
    
    //接続終了
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}

?>