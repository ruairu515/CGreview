<?php
// $hostname="localhost";
// $username="root";
// $password="root";
// $dbname="CGreview";

// $s = mysqli_connect($hostname, $username, $password) or die ("サーバーに接続できません");
// print "サーバに接続";

// mysqli_select_db($dbname,$s);
// print "データベースに接続";

// mysql_query("INSERT INTO workinfo VALUES(1,'yajima')");
// print "クエリ実装";

// mysqli_close($s);






// // PDOの時の実装
// $dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
// $user = 'root';
// $password = 'root';

// // try{
// //データーベースに接続
//     $pdo = new PDO($dsn, $user, $password);
//    print "データベース接続";

//    //  $pdo->query("INSERT INTO workinfo VALUES(1,'yajiam')";

//    // print "クエリ実装";
//     //接続終了
//     $pdo = null;
// }
// //接続に失敗した際のエラー処理
// catch (PDOException $e){
//     print('エラーが発生しました。:'.$e->getMessage());
//     die();
// }




// // PDOの時の実装
// $dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
// $user = 'root';
// $password = 'root';

// try{
// //データーベースに接続
//     $pdo = new PDO($dsn, $user, $password);
//     print "クエリ実装";

//     // $pdo->query("INSERT INTO workinfo VALUES(1,'yajiam')");
//     $stmt = $pdo->query("SELECT * FROM workinfo");

//     // $result = $stmt->fetch();
//     // print $result[0];
//     // print $result[1]; 

//     // $result = $stmt->fetch();
//     // print $result[0];
//     // print $result[1]; 



// while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
//   echo '<p>' . $result['workid'] . ':' . $result['title'] . "</p>\n";
// }


//     //接続終了
//     $pdo = null;
// }
// //接続に失敗した際のエラー処理
// catch (PDOException $e){
//     print('エラーが発生しました。:'.$e->getMessage());
//     die();
// }



// SELECT partreview.positionx, partreview.positiony, partreview.positionz, partreview.date1, partreview.date1, partreview.review1, partreview.name1
// FROM partreview
// WHERE (((partreview.positionx)=3) AND ((partreview.positiony)=400));




// PDOの時の実装
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';

try{
//データーベースに接続
    $pdo = new PDO($dsn, $user, $password);
    // // prepareメソッドでSQLをセット
    $stmt = $pdo->prepare("select title from workinfo where workid  = ? ");
    // and studentid = ?
    //bindValueメソッドでパラメータをセット
    $stmt->bindValue(1,1);
    // $stmt->bindValue(2,3);
    //executeでクエリを実行
    $stmt->execute();
    //結果を表示
    $result = $stmt->fetch();
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