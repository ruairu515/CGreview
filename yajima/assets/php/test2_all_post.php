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



    $myInput3 = $_POST["word3"];//posiz
    $sql2="SELECT work_info.work_id FROM work_info WHERE(((work_info.work_name)='$myInput3'));"; 
    $stmt2 = $pdo->prepare($sql2);
    $stmt2->execute();
    $result = $stmt2->fetch();



    //INSERT文でテーブルにデータ格納
    $sql = "INSERT INTO all_info(modeling, material,work_id) VALUES (:modeling, :material,:work_id)";
    // 挿入する値は空のまま、SQL実行の準備をする
    $stmt = $pdo->prepare($sql);
    // 挿入する値を配列に格納する
    $params = array(':modeling' => $myInput1, ':material' => $myInput2, ':work_id' => $result[0]);
    // 挿入する値が入った変数をexecuteにセットしてSQLを実行
    $stmt->execute($params);
    // 登録完了のメッセージ
    // echo "modeling={$myInput1}:material={$myInput2}を格納しました";
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