// Handle reset password button click
$('.reset-password').on('click', function () {

  // Prevent multiple clicks
  $('.reset-password').prop('disabled', true);

  // Get the value of the bot trap input
  let bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Get the form values
    let email = $('#form_email').val() || '';

    // Prevent invalid parameter length from being submitted
    if (email.length > 0) {

      // Trigger ajax
      $.ajax({

        // Ajax type
        type: "GET",

        // Ajax URL
        url: 'https://baseball-star.com/backend/handlers/send-password-reset.php',

        // URL parameters
        data: {
          email: email
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
            $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">We weren\'t able to send you a password recovery link. Please try again or contact us.</div>');

            // Enable button
            $('.reset-password').prop('disabled', false);

          }

          // Display success message
          else {

            // Success message
            $('.messages').html('<div class="alert alert-success alert-dismissable mt-2">A password recovery link was sent to that email address. Please check your inbox.</div>');

          }

        }

      });

      return false;

    }

    // Parameter length is not greater than 0
    else {

      // Error message
      $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">You must enter an email if you want to receive a password recovery link. Please try again.</div>');

      // Enable button
      $('.reset-password').prop('disabled', false);

      return false;

    }

  }

  // Bot trap input was filled out.
  else {

    // Error message
    $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">An invalid action was performed. Please contact us or try again.</div>');

    // Enable button
    $('.reset-password').prop('disabled', false);

    return false;

  }

});

// Handle change password button click
$('.change-password').on('click', function () {

  // Prevent multiple clicks
  $('.change-password').prop('disabled', true);

  // Get the value of the bot trap input
  let bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Get the form values
    let email         = $('#form_email').val() || '';
    let old_password  = $('#form_old_password').val() || '';
    let new_password  = $('#form_new_password').val() || '';

    // Prevent invalid parameter length from being submitted
    if (old_password.length >= 30) {

      // Make sure an email is posted
      if (email.length > 0) {

        // Make sure the new password is a valid length
        if (new_password.length >= 6) {

          // Trigger ajax
          $.ajax({

            // Ajax type
            type: "GET",

            // Ajax URL
            url: 'https://baseball-star.com/backend/handlers/reset-password.php',

            // URL parameters
            data: {
              email: email,
              old_password: old_password,
              new_password: new_password
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
                $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">We weren\'t able to set a new password for your account. Please try again or contact us.</div>');

                // Enable button
                $('.change-password').prop('disabled', false);

              }

              // Redirect to the sign out page to prompt a new session
              else {
                window.location.replace(response);
              }

            }

          });

          return false;

        }

        // Parameter length is not greater than 0
        else {

          // Error message
          $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">That password is too short. Make sure the password you\'re setting is at least 6 characters. Please try again.</div>');

          // Enable button
          $('.change-password').prop('disabled', false);

          return false;

        }

      }

      // Parameter length is not greater than 0
      else {

        // Error message
        $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">Please enter a longer email address. Please try again.</div>');

        // Enable button
        $('.change-password').prop('disabled', false);

        return false;

      }

    }

    // Parameter length is not greater than 0
    else {

      // Error message
      $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">There was an error verifying your access. Please try again or contact us.</div>');

      // Enable button
      $('.change-password').prop('disabled', false);

      return false;

    }

  }

  // Bot trap input was filled out.
  else {

    // Error message
    $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">An invalid action was performed. Please contact us or try again.</div>');

    // Enable button
    $('.change-password').prop('disabled', false);

    return false;

  }

});
