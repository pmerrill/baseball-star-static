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

  $season_id = (isset($_GET['season'])) ? intval(format_numeric(escape($_GET['season']))) : 0;

  $logged_in_player_id = !empty(get_player_id()) ? get_player_id() : 0;
  $twig->addGlobal("logged_in_player_id", $logged_in_player_id);

  // Extract the player ID from the id URL parameter
  $player_id = $season_id > 0 ? player_id_by_season_sel($connection, $season_id) : $logged_in_player_id;
  $twig->addGlobal("player_id", $player_id);

  $is_logged_in_player = intval($logged_in_player_id) === intval($player_id) ? 1 : 0;
  $twig->addGlobal("is_logged_in_player", $is_logged_in_player);

  // Get the current session's account ID
  $account_id = get_account_id($connection);

  // Make sure that the ID passed in is one that is owned by the account_id
  $is_owned = player_owned_by_account($connection, $account_id, $player_id);
  $twig->addGlobal("is_account_player", $is_owned);

  $player_info  = get_player_info($connection, $player_id);

  $player_season = (!empty($player_info)) ? (isset($player_info[0]["player_season"]) ? intval($player_info[0]["player_season"]) : 0) : 0;
  $twig->addGlobal("player_season", $player_season);

  $player_firstname = (!empty($player_info)) ? (isset($player_info[0]["player_firstname"]) ? $player_info[0]["player_firstname"] : '') : '';
  $twig->addGlobal("player_firstname", $player_firstname);

  $player_lastname = (!empty($player_info)) ? (isset($player_info[0]["player_lastname"]) ? $player_info[0]["player_lastname"] : '') : '';
  $twig->addGlobal("player_lastname", $player_lastname);

  $season_id = $season_id === 0 ? $player_season : $season_id;
  $twig->addGlobal("season_id", $season_id);

  $team_abbr = (isset($_GET['team'])) ? escape($_GET['team']) : '';
  $twig->addGlobal("team_abbr", $team_abbr);

  $team_id = (isset($_GET['id'])) ? intval(format_numeric(escape($_GET['id']))) : 0;
  $twig->addGlobal("team_id", $team_id);

  $player_team_abbr  = (!empty($player_info)) ? (isset($player_info[0]["player_team"]) ? $player_info[0]["player_team"] : '') : '';
  $player_team_id    = (!empty($player_info)) ? (isset($player_info[0]["team_id"]) ? intval($player_info[0]["team_id"]) : 0) : 0;
  $is_player_team    = $player_team_abbr === $team_abbr || $player_team_id === $team_id ? 1 : 0;
  $twig->addGlobal("is_player_team", $is_player_team);

  if ($team_id > 0 || (strlen($team_abbr) > 0 && strlen($team_abbr) <= 3)) {

    // Pass awards to the template
    if ($season_id > 0) {
      $league_team_by_season_id_sel = intval($team_id) > 0 ? league_team_by_season_id_sel($season_id, $team_id) : league_team_by_season_and_team_abbr_sel($season_id, $team_abbr);
    }
    else {
      $league_team_by_season_id_sel = intval($team_id) > 0 ? league_team_by_team_id_sel($team_id) : league_team_by_team_abbr_sel($team_abbr);
    }
    $twig->addGlobal("league_team_by_season_id_sel", $league_team_by_season_id_sel);

    $team_city = (!empty($league_team_by_season_id_sel)) ? (isset($league_team_by_season_id_sel[0]["team_city"]) ? $league_team_by_season_id_sel[0]["team_city"] : '') : '';
    $twig->addGlobal("team_city", $team_city);

    $team_id = (!empty($league_team_by_season_id_sel)) ? (isset($league_team_by_season_id_sel[0]["team_id"]) ? $league_team_by_season_id_sel[0]["team_id"] : '') : '';
    $twig->addGlobal("team_id", $team_id);

    $team_name = (!empty($league_team_by_season_id_sel)) ? (isset($league_team_by_season_id_sel[0]["team_name"]) ? $league_team_by_season_id_sel[0]["team_name"] : '') : '';
    $twig->addGlobal("team_name", $team_name);

    $team_abbr = (!empty($league_team_by_season_id_sel)) ? (isset($league_team_by_season_id_sel[0]["team_abbr"]) ? $league_team_by_season_id_sel[0]["team_abbr"] : '') : '';
    $twig->addGlobal("team_abbr", $team_abbr);

    // Get the current session's account ID
    $account_id = get_account_id($connection);

    $limit = 10;
    $twig->addGlobal("limit", $limit);

    // Get the pagination page number from the URL
    // Returns 1 as the value if no page URL parameter is found
    $page_number = get_url_pagination();
    $twig->addGlobal("page_number", $page_number);
    $next_page = ($page_number <= 1) ? 2 : $page_number + 1;
    $twig->addGlobal("next_page_number", $next_page);

    $page_offset = ($page_number <= 1) ? 0 : (($page_number - 1) * $limit);
    $twig->addGlobal("offset", $page_offset);

    // Get best players for this team
    $league_team_best_players_sel = league_team_best_players_sel($connection, $account_id, $team_abbr, $limit, $page_offset);
    $twig->addGlobal("league_team_best_players_sel", $league_team_best_players_sel);

    if (empty($league_team_by_season_id_sel)) {
      $twig->addGlobal("error_message", "That team was not found. Please go back or try again.");
    } else {
      $twig->addGlobal("error_message", "");
    }

  } else {
    $twig->addGlobal("error_message", "That team was not found. Please go back or try again.");
  }

  echo $twig->render('public/league/team.html');
?>
