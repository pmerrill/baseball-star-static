// Set the ajax URL here
var ajax_url = 'https://baseball-star.com/backend/handlers/continue.php';

// Handle button click
$('.btn-send').on('click', function () {

  // Get the value of the bot trap input
  var bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Only proceed  if the ajax URL string length is greater than 0
    if (ajax_url.length > 0) {

      // Form data sent to Ajax page
      let player_id   = $(this).data('id') || 0;
      let player_name = $('table tr.player[data-id="' + player_id + '"] th.player span.name').text() || '';

      // Prevent invalid parameter length from being submitted
      if (player_id > 0 && player_name.length > 0) {

        // Trigger ajax
        $.ajax({

          // Ajax type
          type: "GET",

          // Ajax URL
          url: ajax_url,

          // URL parameters
          data: {
            player_id: player_id,
            player_name: player_name
          },

          // Prevent caching
          cache: false,

          // Force text format
          dataType: "text",

          // Ajax request was successful. Response is either a redirect URL or 'error'
          success: function(response) {

            // Display an error
            if (response === 'error') {
              $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>We weren\'t able to process that request. Please try again or contact us.</div>');
            }

            // Redirect to the next page in the process
            else {
              window.location.replace(response);
            }
          }
        });

        return false;

      }

      // parameter length is not greater than 0
      else {
        $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>We weren\'t able to continue with that player. Please try again.</div>');
        return false;
      }

    }

    // ajax_url is not greater than 0.
    else {
      $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>There was an issue continuing with that player. Please contact us or try again.</div>');
      return false;
    }

  }

  // Bot trap input was filled out.
  else {
    $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>An invalid action was performed during sign in. Please contact us or try again.</div>');
    return false;
  }

});

// Set the ajax URL here
var to_game_ajax_url = 'https://baseball-star.com/backend/handlers/continue-to-game.php';

// Handle button click
$('.btn-send-to-game').on('click', function () {

  // Get the value of the bot trap input
  var bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Only proceed  if the ajax URL string length is greater than 0
    if (to_game_ajax_url.length > 0) {

      // Form data sent to Ajax page
      let game_id     = $(this).data('gameid') || 0;
      let player_id   = $(this).data('id') || 0;
      let player_name = $('table tr.player[data-id="' + player_id + '"] th.player span.name').text() || '';

      // Prevent invalid parameter length from being submitted
      if (player_id > 0 && player_name.length > 0) {

        // Trigger ajax
        $.ajax({

          // Ajax type
          type: "GET",

          // Ajax URL
          url: to_game_ajax_url,

          // URL parameters
          data: {
            game_id: game_id,
            player_id: player_id,
            player_name: player_name
          },

          // Prevent caching
          cache: false,

          // Force text format
          dataType: "text",

          // Ajax request was successful. Response is either a redirect URL or 'error'
          success: function(response) {

            // Display an error
            if (response === 'error') {
              $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>We weren\'t able to process that request. Please try again or contact us.</div>');
            }

            // Redirect to the next page in the process
            else {
              window.location.replace(response);
            }
          }
        });

        return false;

      }

      // parameter length is not greater than 0
      else {
        $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>We weren\'t able to continue with that player. Please try again.</div>');
        return false;
      }

    }

    // ajax_url is not greater than 0.
    else {
      $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>There was an issue continuing with that player. Please contact us or try again.</div>');
      return false;
    }

  }

  // Bot trap input was filled out.
  else {
    $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>An invalid action was performed during sign in. Please contact us or try again.</div>');
    return false;
  }

});
