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

    // Get the current session's account ID
    $account_id = get_account_id($connection);

    // Make sure that the ID passed in is one that is owned by the account_id
    $is_owned = player_owned_by_account($connection, $account_id, $player_id);
    $twig->addGlobal("is_account_player", $is_owned);

    // Only display standings if the account owns the player
    //if ($is_owned) {

      // Retrieve player info from the database
      $player_info = get_player_info($connection, $player_id);

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

      $is_postseason  = (!empty($player_info)) ? (isset($player_info[0]["is_postseason"]) ? intval($player_info[0]["is_postseason"]) : 0) : 0;
      $twig->addGlobal("is_postseason", $is_postseason);

      // Create an empty array for the league playoffs
      // The template will display an error message if the array is not filled by the time it is passed in
      $league_playoffs = array();

      // Only access the array if it isn't empty
      if (!empty($player_info)) {

        // Loop over each item returned in the player info array
        foreach ($player_info as $key => $value) {

          // Extract data from the player info array
          $playoff_round = $value['playoff_round'];
          $is_postseason = $value['is_postseason'];

        }

        // Add the season playoff round to the template
        $twig->addGlobal("season_playoff_round", $playoff_round);

        // Retrieve the league playoffs
        // We need to pass in the postseason flag to change the SQL routine this function executes
        $league_playoffs = league_playoffs_page_sel($connection, $player_id, $is_postseason);

      }

      // Pass the league playoffs array to the template
      // Display an error message if the array is empty
      $twig->addGlobal("league_playoffs_array", $league_playoffs);

    /*
    }

    // Display an error message if trying to view a player not owned by the account
    else {

      $twig->addGlobal("error_message", 'You can\'t view the playoff race for the league of a player you don\'t own. Please contact us or go back and try again.');

    }
    */

  }

  // Redirect to account player list if an invalid player ID was passed in
  else {

    redirect_to_player_list();

  }

  echo $twig->render('public/league/playoffs.html');

?>
