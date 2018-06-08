<?php
header('content="text/html;charset=utf-8"');
if($_GET['method']){
    $method = $_GET['method'];
    if ($method == 'getList') {
        $list = [];
        $files = scandir('mp3/song');
        foreach ($files as $key => $value) {
            if ($value == '.' || $value == '..') {
                continue;
            }
            $list[] = explode('.',iconv("gb2312", "utf-8", $value))[0];
        }
        echo json_encode(['name'=>$list]);
    } elseif ($method == 'getLrc') {
        $name = iconv("utf-8", "gb2312", $_GET['name'].'.lrc');
        $path = './mp3/lrc/'.$name;
        $lrc = fopen($path,'r');
        $data = array();
        $i = 0;
        while(!feof($lrc)){
            $data[$i] = fgets($lrc);
            $i++;
        }
        echo json_encode(['lrc'=>$data]);
    }
}