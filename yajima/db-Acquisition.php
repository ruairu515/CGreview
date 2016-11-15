<html>
<head>
<title>PHP TEST</title>
</head>
<body>

<?php

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


    //INSERT文でテーブルにデータ格納
        // INSERT文を変数に格納
        $sql = "INSERT INTO test_post(name, coment, camera_position) VALUES (:name, :coment, :camera_position)";
         print('データベースに接続しました2');
        // 挿入する値は空のまま、SQL実行の準備をする
        $stmt = $pdo->prepare($sql);
         print('データベースに接続しました3');
        // 挿入する値を配列に格納する
        $params = array(':name' => 'yajima', ':coment' => '84000', ':camera_position' => '84000');
         print('データベースに接続しました4');
        // 挿入する値が入った変数をexecuteにセットしてSQLを実行
        $stmt->execute($params);
         print('データベースに接続しました5');
        // 登録完了のメッセージ
        echo '登録完了しました';

    //接続終了
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}

?>

</body>
</html>