<?php
//PDOの時の実装
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';
try{
    $pdo = new PDO($dsn, $user, $password);

    $sql = "SELECT file_name FROM test2_workinfo";

    $stmt = $pdo->query($sql);

    while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
        $row[] = $result["file_name"];   
    }
    echo json_encode($row);
    
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}
?>