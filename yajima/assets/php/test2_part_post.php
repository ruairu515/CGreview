<?php
//PDOの時の実装
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';
try{
    //データーベースに接続
    $pdo = new PDO($dsn, $user, $password);
    // POSTされたパラメータを受け取る
    $myInput0 =  date("Y-m-d H:i:s");
    $myInput1 = $_POST['word1'];//contributor
    $myInput2 = $_POST['word2'];//part_review
    $myInput3 = $_POST["word3"];//posix
    $myInput4 = $_POST['word4'];//posiy
    $myInput5 = $_POST["word5"];//posiz
    

    $myInput6 = $_POST["word6"];//posiz
    $sql2="SELECT work_info.work_id FROM work_info WHERE(((work_info.work_name)='$myInput6'));"; 
    $stmt2 = $pdo->prepare($sql2);
    $stmt2->execute();
    $result = $stmt2->fetch();



    //INSERT文でテーブルにデータ格納
    $sql = "INSERT INTO part_info(part_date,contributor,part_review,posix,posiy,posiz,work_id) VALUES (:part_date,:contributor,:part_review,:posix,:posiy,:posiz,:work_id)";
    // 挿入する値は空のまま、SQL実行の準備をする
    $stmt = $pdo->prepare($sql);
    // 挿入する値を配列に格納する
    $params = array(':part_date' => $myInput0,':contributor' => $myInput1, ':part_review' => $myInput2, ':posix' => $myInput3, ':posiy' => $myInput4, ':posiz' => $myInput5, ':work_id' => $result[0]);
    // 挿入する値が入った変数をexecuteにセットしてSQLを実行
    $stmt->execute($params);
    // 登録完了のメッセージ
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