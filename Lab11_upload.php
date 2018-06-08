<?php
if($_FILES['file_upload']){
    $editedFile = $_FILES['file_upload'];
    $editedName = $_POST['edit_name'];
    $editedArtist = $_POST['edit_artist'];
    $editedLrc = $_POST['edit_lyric'];
    if(file_exists("mp3/song".$editedName.".mp3")){
        echo 'override';
    }
    else echo 'success';

    $a = move_uploaded_file($_FILES['file_upload']['tmp_name'],"mp3/song/".$editedName.".mp3");
    if(is_uploaded_file($_FILES['file_upload']['tmp_name']))echo "$editedName";
    $lrcFile = fopen("mp3/lrc/".$editedName.".lrc","w");
    $editedLrc = "[ti:]".$editedName."\r\n[ar:]".$editedArtist."\r\n". $editedLrc;
    fwrite($lrcFile,$editedLrc);
    fclose($lrcFile);

}