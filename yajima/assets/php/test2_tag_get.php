<?php
//PDOの時の実装
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';
try{
    //データーベースに接続
    $pdo = new PDO($dsn, $user, $password);
    $sql = "SELECT posix, posiy, posiz FROM test1_part";
    // SQLステートメントを実行し、結果を変数に格納
    $stmt = $pdo->query($sql);
    // foreach文で配列の中身を一行ずつ出力
    $result = $stmt->fetchALL(PDO::FETCH_NUM);
    echo json_encode($result);
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}
?>