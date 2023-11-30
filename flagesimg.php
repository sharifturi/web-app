<?php
define('IMAGEPATH', 'assets/flag-images/');

if (is_dir(IMAGEPATH)){
    $handle = opendir(IMAGEPATH);
}
else{
    echo 'No image directory';
}

foreach(glob(IMAGEPATH.'*') as $filename){
 $currency_code = basename(substr($filename, 0, -4));
 //echo '&lt;option class="'.strtolower($currency_code).'" value="'.$currency_code.'"&gt;'.$currency_code.'&lt;/option&gt;<br>';
 //echo '&lt;option value="'.$currency_code.'" data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag '.strtolower($currency_code).'" data-title="'.$currency_code.'"&gt;'.$currency_code.'&lt;/option&gt;<br>';
 $filename = basename($filename);
 echo '#select3_title .'.strtolower($currency_code).'{ background:url(../../flag-images/'.$filename.') no-repeat left center;background-size:75px;}';
}
closedir($handle);
?>