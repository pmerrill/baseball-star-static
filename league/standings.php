<?php
  // header.php establishes a connection to the database, contains many session related functions and more
  require_once $_SERVER['DOCUMENT_ROOT'] . '/inc/header.php';
  require_once '../../vendor/autoload.php';

  $loader = new Twig_Loader_Filesystem('../../views/');
  $twig = new Twig_Environment($loader);

  // Determines the session status so that we can render pages differently
  $has_session = get_session();
  $twig->addGlobal("has_session", $has_session ? 1 : 0);

  // Redirects users, without a session, to the sign in page
  //redirect_to_signin($has_session);

  // Get the current session's account ID
  $account_id = get_account_id($connection);

  // Sets the top  navigation items (./views/navigation.html)
  // String must be one of the expected blocks in the aforementioned template
  $nav_left_type = ($has_session) ? 'has_session' : '';
  $nav_right_type = ($has_session) ? 'has_session' : '';

  // Create a global template element out of the navigation items logic
  $twig->addGlobal("nav_left_type", $nav_left_type);
  $twig->addGlobal("nav_right_type", $nav_right_type);

  // Extract the player ID from the id URL parameter
  $player_id = (isset($_GET['id'])) ? $_GET['id'] : (!empty(get_player_id()) ? get_player_id() : 0);
  $twig->addGlobal("player_id", $player_id);

  // The ID of the player passed in must be greater than 0 and valid to display the improvement template.
  if ($player_id > 0) {

    // Make sure that the ID passed in is one that is owned by the account_id
    $is_owned = player_owned_by_account($connection, $account_id, $player_id);
    $twig->addGlobal("is_account_player", $is_owned);

    // Only display standings if the account owns the player
    //if ($is_owned) {

      $player_info  = get_player_info($connection, $player_id);

      $player_firstname = (!empty($player_info)) ? (isset($player_info[0]["player_firstname"]) ? $player_info[0]["player_firstname"] : '') : '';
      $twig->addGlobal("player_firstname", $player_firstname);

      $player_lastname = (!empty($player_info)) ? (isset($player_info[0]["player_lastname"]) ? $player_info[0]["player_lastname"] : '') : '';
      $twig->addGlobal("player_lastname", $player_lastname);

      $player_season = (!empty($player_info)) ? (isset($player_info[0]["player_season"]) ? intval($player_info[0]["player_season"]) : 0) : 0;
      $twig->addGlobal("season_id", $player_season);

      $player_position  = (!empty($player_info)) ? (isset($player_info[0]["player_position"]) ? $player_info[0]["player_position"] : '') : '';
      $twig->addGlobal("player_position", $player_position);

      $player_team_city  = (!empty($player_info)) ? (isset($player_info[0]["player_team_city"]) ? $player_info[0]["player_team_city"] : '') : '';
      $twig->addGlobal("player_team_city", $player_team_city);

      $player_team_name  = (!empty($player_info)) ? (isset($player_info[0]["player_team_name"]) ? $player_info[0]["player_team_name"] : '') : '';
      $twig->addGlobal("player_team_name", $player_team_name);

      // Pass the league standings array to the template
      $league_standings = league_standings_page_sel($connection, $player_id);
      $twig->addGlobal("league_standings_array", $league_standings);
      //echo json_encode($league_standings);

      // Get the win/loss record for the last playoff team in each conference
      if (!empty($league_standings)) {
        foreach($league_standings as $team => $item) {
          if (intval($item['conference_id']) === 1 && intval($item['playoff_seed']) === 5) {
            $twig->addGlobal("al_last_playoff_wins", intval($item['wins']));
          }
          else if (intval($item['conference_id']) === 2 && intval($item['playoff_seed']) === 5) {
            $twig->addGlobal("nl_last_playoff_wins", intval($item['wins']));
          }
        }
      }

    /*
    }

    // Display an error message if trying to view a player not owned by the account
    else {

      $twig->addGlobal("error_message", 'You can\'t view the standings for the league of a player you don\'t own. Please contact us or go back and try again.');

    }
    */

  }

  // Redirect to account player list if an invalid player ID was passed in
  else {

    redirect_to_player_list();

  }

  echo $twig->render('public/league/standings.html');

?>
