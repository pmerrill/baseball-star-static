// Set the ajax URL here
var ajax_url = 'https://baseball-star.com/backend/handlers/start-new-season.php';

// Handle button click
$('.advance-season').on('click', function () {

  // Disable the button until finished with the following processes
  $('.advance-season').prop('disabled', true);

  // Get the value of the bot trap input
  var bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Only proceed if the ajax URL string length is greater than 0
    if (ajax_url.length > 0) {

      // Form data sent to Ajax page
      let team_id         = +$('#team_chooser option:selected').data('teamid') || 0;
      let contract_length = +$('#team_chooser option:selected').data('length') || 0;

      // Trigger ajax
      $.ajax({

        // Ajax type
        type: "GET",

        // Ajax URL
        url: ajax_url,

        // URL parameters
        data: {
          team_id: team_id,
          length: contract_length
        },

        // Prevent caching
        cache: false,

        // Force text format
        dataType: "text",

        // Ajax request was successful. Response is either a redirect URL or 'error'
        success: function(response) {

          // Display an error
          if (response === 'error') {

            // Error message
            $('.form-messages').html('<div class="alert alert-danger alert-dismissable mt-3 mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>There was a problem while creating the new season. Please contact us or try again.</div>');

            // Enable the button
            $('.advance-season').prop('disabled', false);

          }

          // Redirect to the next page in the process
          else {
            window.location.replace(response);
          }
        }
      });

      return false;

    }

    // ajax_url is not greater than 0.
    else {

      // Error message
      $('.form-messages').html('<div class="alert alert-danger alert-dismissable mt-3 mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>There was an issue advancing to the new season. Please contact us or try again.</div>');

      // Enable the button
      $('.advance-season').prop('disabled', false);

      return false;
    }

  }

  // Bot trap input was filled out.
  else {

    // Error message
    $('.form-messages').html('<div class="alert alert-danger alert-dismissable mt-3 mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>An invalid action was performed while advancing to the new season. Please contact us or try again.</div>');

    // Enable the button
    $('.advance-season').prop('disabled', false);

    return false;
  }

});

// Set the ajax URL here
var ajax_endpoint_url = 'https://baseball-star.com/backend/handlers/unretire.php';

// Handle button click
$('.unretire-player').on('click', function () {

  // Disable the button until finished with the following processes
  $('.unretire-player').prop('disabled', true);

  // Get the value of the bot trap input
  var bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Only proceed if the ajax URL string length is greater than 0
    if (ajax_endpoint_url.length > 0) {

      // Trigger ajax
      $.ajax({

        // Ajax type
        type: "GET",

        // Ajax URL
        url: ajax_endpoint_url,

        // URL parameters
        data: {},

        // Prevent caching
        cache: false,

        // Force text format
        dataType: "text",

        // Ajax request was successful. Response is either a redirect URL or 'error'
        success: function(response) {

          // Display an error
          if (response === 'error') {

            // Error message
            $('.form-messages').html('<div class="alert alert-danger alert-dismissable mt-3 mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>There was a problem while creating the new season. Please contact us or try again.</div>');

            // Enable the button
            $('.unretire-player').prop('disabled', false);

          }

          // Redirect to the next page in the process
          else {
            window.location.replace(response);
          }
        }
      });

      return false;

    }

    // ajax_endpoint_url is not greater than 0.
    else {

      // Error message
      $('.form-messages').html('<div class="alert alert-danger alert-dismissable mt-3 mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>There was an issue advancing to the new season. Please contact us or try again.</div>');

      // Enable the button
      $('.unretire-player').prop('disabled', false);

      return false;
    }

  }

  // Bot trap input was filled out.
  else {

    // Error message
    $('.form-messages').html('<div class="alert alert-danger alert-dismissable mt-3 mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>An invalid action was performed while advancing to the new season. Please contact us or try again.</div>');

    // Enable the button
    $('.unretire-player').prop('disabled', false);

    return false;
  }

});
