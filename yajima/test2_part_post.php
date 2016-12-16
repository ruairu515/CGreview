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
    $myInput2 = $_POST['word2'];//partreview
    $myInput3 = $_POST["word3"];//posix
    $myInput4 = $_POST['word4'];//posiy
    $myInput5 = $_POST["word5"];//posiz
    //INSERT文でテーブルにデータ格納
    $sql = "INSERT INTO test1_part(part_date,contributor,partreview,posix,posiy,posiz) VALUES (:part_date,:contributor,:partreview,:posix,:posiy,:posiz)";
    // 挿入する値は空のまま、SQL実行の準備をする
    $stmt = $pdo->prepare($sql);
    // 挿入する値を配列に格納する
    $params = array(':part_date' => $myInput0,':contributor' => $myInput1, ':partreview' => $myInput2, ':posix' => $myInput3, ':posiy' => $myInput4, ':posiz' => $myInput5);
    // 挿入する値が入った変数をexecuteにセットしてSQLを実行
    $stmt->execute($params);
    // 登録完了のメッセージ
    echo "contributor={$myInput1}partreview={$myInput2}posix={$myInput3}posiy={$myInput4}posiz={$myInput5}を格納しました。</p>";
    //接続終了
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}
?>