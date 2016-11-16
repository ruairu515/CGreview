<?php
//PDOの時の実装
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';

$options = array();

try{
//データーベースに接続
    $pdo = new PDO($dsn, $user, $password,$options);
    //ここに処理を記載
        // print('データベースに接続しました');

    // PDOオブジェクトの生成
    // $pdo = new PDO("mysql:dbname=test;host=localhost",USERNAME,PASSWORD);








    // // prepareメソッドでSQLをセット
    // $stmt = $pdo->prepare("select title from workinfo where workid  = ? ");
    // // and studentid = ?
    // //bindValueメソッドでパラメータをセット
    // $stmt->bindValue(1,3);
    // // $stmt->bindValue(2,3);
    // //executeでクエリを実行
    // $stmt->execute();
    // //結果を表示

    // $result = $stmt->fetch();
    // echo $result[0];









    // 配列で取得
    // データベースに接続
    // $db = new PDO($dsn, $username, $password, $options);

    // 実行するqueryの作成（testテーブルの全データ取得）
    $query = "SELECT * FROM workinfo";
    //クエリを実行
    $res = $pdo->query($query);
    //取得したデータを全てフェッチする
    $data = $res->fetch(PDO::FETCH_ASSOC);
    //データを表示する
    // print($data[title]);
    // while($result = $res->fetch(PDO::FETCH_ASSOC)){
        // print($result['workid']);
        // print($result['filename'].'<br>');
    // }

    echo json_encode($data);










    //PDO Statementオブジェクトをそのままforeachへ
    // foreach($stmt as $loop){
    //     //結果を表示
    //     echo "ncamera_positioname = ".$loop['camera_position'].PHP_EOL;
    // }


    // // SELECT文でデータ取得実装
    //     // SELECT文を変数に格納
    //     $sql = "SELECT filename FROM workinfo";
    //     // SQLステートメントを実行し、結果を変数に格納
    //     $stmt = $pdo->query($sql);
    //     $stmt->execute();
    //     $rows = array();
    //     // while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    //     //     $rows[] = $row;
    //     // }

    //     // 宣言｢このファイルphpではなく､jsonとして扱いなさい！｣
    //     // header('Content-Type:application/json');
    //     // データをjsonに変換して出力
    //     // echo json_encode($rows);
    //     // echo $rows;
        
    //     // foreach文で配列の中身を一行ずつ出力
    //     $test = [];
    //     foreach ($stmt as $key => $row) {
    //         // データベースのフィールド名で出力
    //         echo $key.$row[filename];
    //         // $test[] = $row(filename);
    //         // 改行を入れる
    //         // echo '<br>';
    //     }





    // POSTされたパラメータを受け取る
        // $myInput1 = $_POST['word1'];
        // $myInput2 = $_POST['word2'];
        // $myInput3 = $_POST["word3"];


    //INSERT文でテーブルにデータ格納
        // // INSERT文を変数に格納
        // $sql = "INSERT INTO test_post(name, coment, camera_position) VALUES (:name, :coment, :camera_position)";
        // // 挿入する値は空のまま、SQL実行の準備をする
        // $stmt = $pdo->prepare($sql);
        // // 挿入する値を配列に格納する
        // $params = array(':name' => $myInput1, ':coment' => $myInput2, ':camera_position' => $myInput3);
        // // 挿入する値が入った変数をexecuteにセットしてSQLを実行
        // $stmt->execute($params);
        // // 登録完了のメッセージ
        // echo "<p>格納しました。</p>";
   
    //接続終了
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}

?>