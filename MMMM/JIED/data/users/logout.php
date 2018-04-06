<?php
//data/users/logout.php
session_start();
session_unset();
session_destroy();