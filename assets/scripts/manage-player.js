// Handle button click
$('.toggle-results-email').on('click', function () {

  // Get the value of the bot trap input
  let bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Form data sent to Ajax page
    let player_id   = +$('#player_id').val() || 0;

    // Get the email status that the button wants to set
    let can_email   = +$(this).data('canemail');

    // Prevent invalid parameter length from being submitted
    if (player_id > 0 && can_email >= 0) {

      // Trigger ajax
      $.ajax({

        // Ajax type
        type: "GET",

        // Ajax URL
        url: 'https://baseball-star.com/backend/handlers/toggle-player-emails.php',

        // URL parameters
        data: {
          player_id: player_id,
          can_email: can_email
        },

        // Prevent caching
        cache: false,

        // Force text format
        dataType: "text",

        // Ajax request was successful. Response is either a redirect URL or 'error'
        success: function(response) {

          // Display an error
          if (response === 'error') {
            $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">We weren\'t able to change the status of this player\'s email alerts. Please try again or contact us.</div>');
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
      $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">We weren\'t able to process that request. Please try again.</div>');
      return false;
    }

  }

  // Bot trap input was filled out.
  else {
    $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">An invalid action was performed. Please contact us or try again.</div>');
    return false;
  }

});

// Handle button click
$('.toggle-simulation').on('click', function () {

  // Get the value of the bot trap input
  let bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Form data sent to Ajax page
    let player_id   = +$('#player_id').val() || 0;

    // Get the simulation status that the button wants to set
    let can_sim   = +$(this).data('cansim');

    // Prevent invalid parameter length from being submitted
    if (player_id > 0 && can_sim >= 0) {

      // Trigger ajax
      $.ajax({

        // Ajax type
        type: "GET",

        // Ajax URL
        url: 'https://baseball-star.com/backend/handlers/toggle-simulation.php',

        // URL parameters
        data: {
          player_id: player_id,
          can_sim: can_sim
        },

        // Prevent caching
        cache: false,

        // Force text format
        dataType: "text",

        // Ajax request was successful. Response is either a redirect URL or 'error'
        success: function(response) {

          // Display an error
          if (response === 'error') {
            $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">We weren\'t able to change the status of your game. Please try again or contact us.</div>');
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
      console.log('player_id ' + player_id + ' can_sim ' + can_sim);
      $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">We weren\'t able to process that request. Please try again.</div>');
      return false;
    }

  }

  // Bot trap input was filled out.
  else {
    $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">An invalid action was performed. Please contact us or try again.</div>');
    return false;
  }

});
