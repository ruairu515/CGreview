<?php
//PDOの時の実装
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';
try{
    
    //データーベースに接続
    $pdo = new PDO($dsn, $user, $password);

    $myInput1=$_POST['word1'];//work_name

    $sql = "SELECT 
    avg(modeling),
    count(modeling=5 or null),
    count(modeling=4 or null),
    count(modeling=3 or null),
    count(modeling=2 or null),
    count(modeling=1 or null),
    avg(material), 
    count(material=5 or null),
    count(material=4 or null),
    count(material=3 or null),
    count(material=2 or null),
    count(material=1 or null)
    FROM work_info INNER JOIN all_info ON work_info.work_id = all_info.work_id WHERE (((work_info.work_name)='$myInput1'));";

    // $sql="SELECT all_info.modeling, all_info.material FROM work_info INNER JOIN all_info ON work_info.work_id = all_info.work_id WHERE (((work_info.work_name)="sycle2.js"));";


      // $sql="SELECT part_info.posix, part_info.posiy, part_info.posiz FROM work_info INNER JOIN part_info ON work_info.work_id = part_info.work_id WHERE (((work_info.work_name)='$myInput1'));";



    // SQLステートメントを実行し、結果を変数に格納
    $stmt = $pdo->query($sql);


    $result = $stmt->fetch(PDO::FETCH_NUM);
    // echo $result[0];

    // while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
    //     $row[] = $result["material"];   
    // }
    echo json_encode($result);


    // foreach文で配列の中身を一行ずつ出力
    // $result = $stmt->fetchALL(PDO::FETCH_NUM);
    // echo json_encode($result);
    


    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}
?>