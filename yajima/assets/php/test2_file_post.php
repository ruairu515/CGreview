<?php
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';
// ファイル名を取得して、ユニークなファイル名に変更
$file_name = $_FILES['up_file']['name'];
// $uniq_file_name = date("YmdHis") . "_" . $file_name;
// 仮にファイルがアップロードされている場所のパスを取得
$tmp_path = $_FILES['up_file']['tmp_name'];
// 保存先のパスを設定
$upload_path = '../work_files/';
if (is_uploaded_file($tmp_path)) {
  // 仮のアップロード場所から保存先にファイルを移動
  if (move_uploaded_file($tmp_path, $upload_path.$file_name)) {
    // ファイルが読出可能になるようにアクセス権限を変更
    chmod($upload_path.$file_name, 0644);
    echo $file_name."をアップロードしました。";
    // echo "&lt;br&gt;&lt;a href='sample.html'&gt;&lt;- TOPへ戻る&lt;/a&gt;";
  } else {
    echo "Error:アップロードに失敗しました。";
  }
} else {
  echo "Error:画像が見つかりません。";
}

echo $tmp_path;
// try{
//     //データーベースに接続
//     $pdo = new PDO($dsn, $user, $password);
//     // POSTされたパラメータを受け取る
//     $myInput1 = $file_name;
//     // $myInput2 = $_POST['word_id1'];
//       // echo $myInput2;

//     //INSERT文でテーブルにデータ格納
//     $sql = "INSERT INTO test2_workinfo(file_name) VALUES (:file_name)";
//     // 挿入する値は空のまま、SQL実行の準備をする
//     $stmt = $pdo->prepare($sql);
//     // 挿入する値を配列に格納する
//     $params = array(':file_name' => $myInput1);
//     // 挿入する値が入った変数をexecuteにセットしてSQLを実行
//     $stmt->execute($params);
//     // 登録完了のメッセージ
//     echo "file_name={$myInput1}を格納しました";
//     //接続終了
//     $pdo = null;
// }
// //接続に失敗した際のエラー処理
// catch (PDOException $e){
//     print('エラーが発生しました。:'.$e->getMessage());
//     die();
// }
?>