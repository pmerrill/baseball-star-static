// Set the ajax URL here
var ajax_url = 'https://baseball-star.com/backend/handlers/add-player.php';

// Listen for the enter key then "click" the form button
$('.form-group input').keyup(function(event) {
  if (event.keyCode === 13) {
    $('.btn-send').click();
  }
});

// Handle button click
$('.btn-send').on('click', function () {

  // Disable the button until finished with the following processes
  $('.btn-send').prop('disabled', true);

  // Get the value of the bot trap input
  var bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Only proceed if the ajax URL string length is greater than 0
    if (ajax_url.length > 0) {

      // Form data sent to Ajax page
      let first_name  = $('#form_firstname').val() || '';
      let last_name   = $('#form_lastname').val() || '';
      let position    = $('#form_position').val() || '';
      let team        = $('#form_team').val() || '';

      // Prevent invalid data from being submitted
      if (first_name.length > 0 && last_name.length > 0 && position >= 0 && team >= 0) {

        // Trigger ajax
        $.ajax({

          // Ajax type
          type: "GET",

          // Ajax URL
          url: ajax_url,

          // URL parameters
          data: {
            first_name: first_name,
            last_name: last_name,
            position: position,
            team: team
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
              $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>We couldn\'t create your account. The email you used is most likely in use. Please contact us or try again.</div>');

              // Enable the button
              $('.btn-send').prop('disabled', false);

            }

            // Redirect to the next page in the process
            else {
              window.location.replace(response);
            }
          }
        });

        return false;

      }

      // Required fields are too short in length
      else {

        // Error message
        $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Players must have a first name, last name, position, and team. Please try again.</div>');

        // Enable the button
        $('.btn-send').prop('disabled', false);

        return false;
      }

    }

    // ajax_url is not greater than 0.
    else {

      // Error message
      $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>There was an issue creating this player. Please contact us or try again.</div>');

      // Enable the button
      $('.btn-send').prop('disabled', false);

      return false;
    }

  }

  // Bot trap input was filled out.
  else {

    // Error message
    $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>An invalid action was performed during account creation. Please contact us or try again.</div>');

    // Enable the button
    $('.btn-send').prop('disabled', false);

    return false;
  }

});
