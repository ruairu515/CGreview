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
    // $stmt = $pdo->query("SELECT * FROM workinfo");
    $sql = "SELECT test1_part.part_date, test1_part.contributor, test1_part.partreview FROM test1_part WHERE (((test1_part.posix)=$myInput1) AND ((test1_part.posiy)=$myInput2));";
    // SQLステートメントを実行し、結果を変数に格納
    $stmt = $pdo->query($sql);
    // foreach文で配列の中身を一行ずつ出力
    $result = $stmt->fetch(PDO::FETCH_NUM);
    echo json_encode($result);
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}
?>