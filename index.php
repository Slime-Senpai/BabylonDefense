<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Babylone</title>
    <link rel="stylesheet" href="src/css/master.css">

    <?php
    function exploreFichier ($source) {
        foreach (scandir(getcwd()."\\".$source) as $value) {
            $accValue = str_replace(".", "", $value);
            if (strcmp($accValue, $value) === 0 && strcmp($accValue, "") !== 0) {
                exploreFichier ($source . "/" . $value);
            }
            if (strcmp($accValue, $value) !== 0 && strcmp($accValue, "") !== 0)  {
                echo "<script src=\"$source/$value\"></script>";
            }
        }
    }

    exploreFichier ('src/scripts');
    exploreFichier ('src/js');
     ?>
  </head>
  <body>

      <canvas id="canvasBabylon"></canvas>
  </body>
</html>
