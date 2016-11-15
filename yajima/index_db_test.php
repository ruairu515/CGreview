<?php
//mysql_queryの実装
    // // MySQLへ接続する準備。DB名や認証に必要な情報を格納
    // $url = "mysql462.db.sakura.ne.jp";
    // $user = "citnn";
    // $pass = "ilovech11";
    // $db = "citnn_cgpeer";
    // $table = "posttest01";

    // // MySQLへ接続する
    // $connect = mysql_connect($url, $user, $pass) or die("MySQLへの接続に失敗しました。");

    // // 手を加えるデータベースを選択する
    // $sdb = mysql_select_db($db, $connect) or die("データベースの選択に失敗しました。");
      
    // // POSTされたパラメータを受け取る
    // $myInput1 = $_POST['word1'];
    // $myInput2 = $_POST['word2'];
    // $myInput3 = $_POST["word3"];
    // echo "<p>{$myInput1}と{$myInput2}と{$myInput3}を格納しました。</p>";

    // // クエリを送信する
    // $sql = "INSERT INTO $table VALUES('$myInput3', '$myInput1', '$myInput2')";
    // $result = mysql_query($sql, $connect) or die("クエリの送信に失敗しました。<br />SQL:".$sql);
      
    // // MySQLへの接続を閉じる
    // mysql_close($connect) or die("MySQL切断に失敗しました。");




//PDOの時の実装
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';

try{
//データーベースに接続
    $pdo = new PDO($dsn, $user, $password);

    //ここに処理を記載
        print('データベースに接続しました');


    //SELECT文でデータ取得実装
        // // SELECT文を変数に格納
        // $sql = "SELECT * FROM posttest01";
        // // SQLステートメントを実行し、結果を変数に格納
        // $stmt = $pdo->query($sql);
        // // foreach文で配列の中身を一行ずつ出力
        // foreach ($stmt as $row) {
        // // データベースのフィールド名で出力
        // echo $row['id'].'：'.$row['data1'].'人';
        // // 改行を入れる
        // echo '<br>';


    // POSTされたパラメータを受け取る
        $myInput1 = $_POST['word1'];
        $myInput2 = $_POST['word2'];
        $myInput3 = $_POST["word3"];


    //INSERT文でテーブルにデータ格納
        // INSERT文を変数に格納
        $sql = "INSERT INTO test_post(name, coment, camera_position) VALUES (:name, :coment, :camera_position)";
        // 挿入する値は空のまま、SQL実行の準備をする
        $stmt = $pdo->prepare($sql);
        // 挿入する値を配列に格納する
        $params = array(':name' => $myInput1, ':coment' => $myInput2, ':camera_position' => $myInput3);
        // 挿入する値が入った変数をexecuteにセットしてSQLを実行
        $stmt->execute($params);
        // 登録完了のメッセージ
        echo "<p>{$myInput1}と{$myInput2}と{$myInput3}を格納しました。</p>";
   
    //接続終了
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}

 ?>