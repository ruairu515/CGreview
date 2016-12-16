<?php
//PDOの時の実装
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';
try{
    //データーベースに接続
    $pdo = new PDO($dsn, $user, $password);
    // POSTされたパラメータを受け取る
    $myInput1 = $_POST['word1'];
    $myInput2 = $_POST['word2'];
    //INSERT文でテーブルにデータ格納
    $sql = "INSERT INTO test1_all(modeling, material) VALUES (:modeling, :material)";
    // 挿入する値は空のまま、SQL実行の準備をする
    $stmt = $pdo->prepare($sql);
    // 挿入する値を配列に格納する
    $params = array(':modeling' => $myInput1, ':material' => $myInput2);
    // 挿入する値が入った変数をexecuteにセットしてSQLを実行
    $stmt->execute($params);
    // 登録完了のメッセージ
    echo "modeling={$myInput1}:material={$myInput2}を格納しました";
    //接続終了
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}
?>