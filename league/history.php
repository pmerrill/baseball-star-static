<?php
  // header.php establishes a connection to the database, contains many session related functions and more
  require_once $_SERVER['DOCUMENT_ROOT'] . '/inc/header.php';
  require_once $_SERVER['DOCUMENT_ROOT'] . '/inc/league.php';
  require_once '../../vendor/autoload.php';

  $loader = new Twig_Loader_Filesystem('../../views/');
  $twig = new Twig_Environment($loader);

  // Determines the session status so that we can render pages differently
  $has_session = get_session();
  $twig->addGlobal("has_session", $has_session ? 1 : 0);

  // Sets the top  navigation items (./views/navigation.html)
  // String must be one of the expected blocks in the aforementioned template
  $nav_left_type = ($has_session) ? 'has_session' : '';
  $nav_right_type = ($has_session) ? 'has_session' : '';

  // Create a global template element out of the navigation items logic
  $twig->addGlobal("nav_left_type", $nav_left_type);
  $twig->addGlobal("nav_right_type", $nav_right_type);

  $player_id = (isset($_GET['id'])) ? intval(format_numeric(escape($_GET['id']))) : 0;
  $twig->addGlobal("player_id", $player_id);

  $league_history_teams_sel = league_history_teams_sel($connection);
  $twig->addGlobal("league_history_teams_sel", $league_history_teams_sel);

  if (empty($league_history_teams_sel)) {
    $twig->addGlobal("error_message", "League history could not be loaded. Please go back or try again.");
  } else {
    $twig->addGlobal("error_message", "");
  }

  echo $twig->render('public/league/history.html');
?>
