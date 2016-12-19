<?php
// PDOの時の実装
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';
try{
    //データーベースに接続
    $pdo = new PDO($dsn, $user, $password);
    // // prepareメソッドでSQLをセット
    $stmt = $pdo->prepare("select title from workinfo where workid  = ? ");
    // and studentid = ?
    //bindValueメソッドでパラメータをセット
    $stmt->bindValue(1,1);
    // $stmt->bindValue(2,3);
    //executeでクエリを実行
    $stmt->execute();
    //結果を表示
    $result = $stmt->fetch();
    echo $result[0];   
    //接続終了
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}
?>