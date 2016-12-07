<?php

//PDOの時の実装
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';

try{
//データーベースに接続
    $pdo = new PDO($dsn, $user, $password);

    //ここに処理を記載



    // POSTされたパラメータを受け取る
        $myInput0 =  date("Y-m-d H:i:s");

        $myInput1 = $_POST['word1'];//contributor
        $myInput2 = $_POST['word2'];//partreview
        $myInput3 = $_POST["word3"];//posix
        // $myInput4 = $_POST['word4'];//posiy
        // $myInput5 = $_POST["word5"];//posiz

    $stmt = $pdo->query("SELECT * FROM workinfo");


    // SELECT文でデータ取得実装
        // SELECT文を変数に格納
        // $sql = "SELECT * FROM posttest01";




        // $sql = "SELECT test1_part.posix, test1_part.posiy, test1_part.posiz, test1_part.part_date, test1_part.contributor, test1_part.partreview FROM test1_part WHERE (((test1_part.posix)=$myInput1) AND ((test1_part.posiy)=$myInput2));";


        $sql = "SELECT test1_part.part_date, test1_part.contributor, test1_part.partreview FROM test1_part WHERE (((test1_part.posix)=$myInput1) AND ((test1_part.posiy)=$myInput2));";

        // SQLステートメントを実行し、結果を変数に格納
        $stmt = $pdo->query($sql);
        // foreach文で配列の中身を一行ずつ出力
        $result = $stmt->fetch(PDO::FETCH_NUM);

        echo json_encode($result);
        // echo $result;


        // foreach ($stmt as $row) {
        //     // データベースのフィールド名で出力
        //     // echo $row['contributor'].'：'.$row['partreview'];


        //     // 改行を入れる
        //     echo "<p>contributor = {$row['contributor']}<br/>partreview = {$row['partreview']}<br/>date = {$row['part_date']}
        //     格納しました。</p>";;
        // }









    // //INSERT文でテーブルにデータ格納
    //     // INSERT文を変数に格納
    //     $sql = "INSERT INTO test1_part(posix,posiy,posiz) VALUES (:posix,:posiy,:posiz)";

    //     // 挿入する値は空のまま、SQL実行の準備をする
    //     $stmt = $pdo->prepare($sql);
    //     // 挿入する値を配列に格納する
    //     $params = array(':posix' => $myInput1, ':posiy' => $myInput2, ':posiz' => $myInput3);
    //     // 挿入する値が入った変数をexecuteにセットしてSQLを実行
    //     $stmt->execute($params);
    //     // 登録完了のメッセージ
    //     echo "<p>contributor={$myInput1}<br/>partreview={$myInput2}<br/>posix={$myInput3}<br/>格納しました。</p>";
    //     // echo json_encode($params);;
    //     echo $myInput5;
    //接続終了
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}

 ?>