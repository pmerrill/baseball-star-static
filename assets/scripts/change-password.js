// Listen for the enter key then "click" the form button
$('.form-group input').keyup(function(event) {
  if (event.keyCode === 13) {
    $('.btn-send').click();
  }
});

// Handle change email button click
$('.btn-send').on('click', function () {

  // Prevent multiple clicks
  $('.btn-send').prop('disabled', true);

  // Get the value of the bot trap input
  let bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Get the form values
    let old_password = $('#form_old_password').val() || '';
    let new_password = $('#form_new_password').val() || '';

    // Prevent invalid parameter length from being submitted
    if (old_password.length == 8) {

      // Make sure the new password is a valid length
      if (new_password.length >= 6) {

        // Trigger ajax
        $.ajax({

          // Ajax type
          type: "GET",

          // Ajax URL
          url: 'https://baseball-star.com/backend/handlers/change-password.php',

          // URL parameters
          data: {
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
              $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">We weren\'t able to change your password. Please try again or contact us.</div>');

              // Enable button
              $('.btn-send').prop('disabled', false);

            }

            // Redirect on success
            else {
              window.location.replace(response);
            }

          }

        });

        return false;

      }

      // Parameter length is not greater than 5
      else {

        // Error message
        $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">Your new password must be at least 6 characters. Please try again.</div>');

        // Enable button
        $('.btn-send').prop('disabled', false);

        return false;

      }

    }

    // Parameter length is not greater than 5
    else {

      // Error message
      $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">The temporary password that you entered doesn\'t match the one that we sent you. Please try again.</div>');

      // Enable button
      $('.btn-send').prop('disabled', false);

      return false;

    }

  }

  // Bot trap input was filled out.
  else {

    // Error message
    $('.messages').html('<div class="alert alert-danger alert-dismissable mt-2">An invalid action was performed. Please contact us or try again.</div>');

    // Enable button
    $('.btn-send').prop('disabled', false);

    return false;

  }

});
