<?php

if (empty($_POST['name'])) {
  $_POST['name'] = 'saved';
}

if (strpos($_POST['name'], '.') !== false || strpos($_POST['name'], '/') !== false) {
  echo '<p>characters "." and "/" are not allowed for the filename!</p>';
  exit;
}

if (!empty($_POST['results'])) {
  file_put_contents(__DIR__ . '/data/' . $_POST['name'] . '.json', str_replace("\r\n", "\n", $_POST['results']));
  echo '<p>saved</p>';
}

echo '<p><a href="./test.html">back to the test</a></p>';
echo '<p><a href="./test.html?manual=1">investigate test file</a></p>';
