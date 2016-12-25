<?php
$dsn = 'mysql:dbname=CGreview;host=localhost;charset=utf8';
$user = 'root';
$password = 'root';

// ファイル名を取得して、ユニークなファイル名に変更
$file_name1 = $_FILES['up_file']['name'][0];
// 仮にファイルがアップロードされている場所のパスを取得
$tmp_path = $_FILES['up_file']['tmp_name'][0];
// 保存先のパスを設定
$upload_path = '../work_files/';
if (is_uploaded_file($tmp_path)) {
  // 仮のアップロード場所から保存先にファイルを移動
  if (move_uploaded_file($tmp_path, $upload_path.$file_name1)) {
    // ファイルが読出可能になるようにアクセス権限を変更
    chmod($upload_path.$file_name1, 0644);
    echo $file_name1."をアップロードしました。";
  } else {
    echo $file_name1."Error:アップロードに失敗しました。";
  }
} else {
  echo $file_name1."Error:画像が見つかりません。";
}

// ファイル名を取得して、ユニークなファイル名に変更
$file_name2 = $_FILES['up_file']['name'][1];
// 仮にファイルがアップロードされている場所のパスを取得
$tmp_path = $_FILES['up_file']['tmp_name'][1];
// 保存先のパスを設定
$upload_path = '../work_files/';
if (is_uploaded_file($tmp_path)) {
  // 仮のアップロード場所から保存先にファイルを移動
  if (move_uploaded_file($tmp_path, $upload_path.$file_name2)) {
    // ファイルが読出可能になるようにアクセス権限を変更
    chmod($upload_path.$file_name2, 0644);
    echo $file_name2."をアップロードしました。";
  } else {
    echo $file_name2."Error:アップロードに失敗しました。";
  }
} else {
  echo $file_name2."Error:画像が見つかりません。";
}









try{
    //データーベースに接続
    $pdo = new PDO($dsn, $user, $password);
    // POSTされたパラメータを受け取る
    $myInput1 = $file_name1;
    $myInput2 = $file_name2;

    // $myInput2 = $_POST['word_id1'];
      // echo $myInput2;

    //INSERT文でテーブルにデータ格納
    $sql = "INSERT INTO test2_workinfo(file_name,thumbnail) VALUES (:file_name,:thumbnail)";
    // 挿入する値は空のまま、SQL実行の準備をする
    $stmt = $pdo->prepare($sql);
    // 挿入する値を配列に格納する
    $params = array(':file_name' => $myInput1,':thumbnail' => $myInput2);
    // 挿入する値が入った変数をexecuteにセットしてSQLを実行
    $stmt->execute($params);
    // 登録完了のメッセージ
    echo "file_name={$myInput1}を格納しました";
    //接続終了
    $pdo = null;
}
//接続に失敗した際のエラー処理
catch (PDOException $e){
    print('エラーが発生しました。:'.$e->getMessage());
    die();
}



?>




