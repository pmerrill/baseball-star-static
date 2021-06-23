// Handle change username click
$('.change-username').on('click', function () {

  //console.log('clicked');

  // Prevent multiple clicks
  $('.change-username').prop('disabled', true);

  // Get the value of the bot trap input
  var bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    //console.log('valid');

    var username = $('#form_username').val() || '';

    //console.log(username);

    // Trigger ajax
    $.ajax({

      // Ajax type
      type: "GET",

      // Ajax URL
      url: 'https://baseball-star.com/backend/handlers/change-username.php',

      // URL parameters
      data: {
        username: username
      },

      // Prevent caching
      cache: false,

      // Force text format
      dataType: "text",

      // Ajax request was successful. Response is either a redirect URL or 'error'
      success: function(response) {

        //console.log(response);

        // Username is taken
        if (response === 'taken') {
          $('.messages.change-username').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0 fs14">That username is taken. Please try a different one.</div>');
          $('.change-username').prop('disabled', false);
        }

        // Query exception
        else if (response === 'exception') {
          $('.messages.change-username').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0 fs14">We couldn\'t save your username. Please contact us.</div>');
          $('.change-username').prop('disabled', false);
        }

        // Invalid parameters
        else if (response === 'invalid') {
          $('.messages.change-username').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0 fs14">The username is not long enough. It must be at least 3 characters.</div>');
          $('.change-username').prop('disabled', false);
        }

        // No posted data
        else if (response === 'data') {
          $('.messages.change-username').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0 fs14">There was an issue processing your username. Please contact us.</div>');
          $('.change-username').prop('disabled', false);
        }

        // Error accessing
        else if (response === 'error') {
          $('.messages.change-username').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0 fs14">There was a problem saving your username. Please contact us.</div>');
          $('.change-username').prop('disabled', false);
        }

        // Success
        else {
          window.location.replace(response);
        }

      }

    });

    return false;

  }

  // Bot trap input was filled out.
  else {

    //console.log('invalid');

    // Error message
    $('.messages.change-username').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">An invalid action was performed. Please contact us or try again.</div>');

    // Enable button
    $('.change-username').prop('disabled', false);

    return false;

  }

});

// Handle change password click
$('.change-password').on('click', function () {

  // Prevent multiple clicks
  $('.change-password').prop('disabled', true);

  // Get the value of the bot trap input
  let bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Trigger ajax
    $.ajax({

      // Ajax type
      type: "GET",

      // Ajax URL
      url: 'https://baseball-star.com/backend/handlers/send-new-password.php',

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
          $('.messages.change-password').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">We weren\'t able to change your password. Please try again or contact us.</div>');

          // Enable button
          $('.change-password').prop('disabled', false);

        }

        // Redirect on success
        else {
          window.location.replace(response);
        }

      }

    });

    return false;

  }

  // Bot trap input was filled out.
  else {

    // Error message
    $('.messages.change-email').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">An invalid action was performed. Please contact us or try again.</div>');

    // Enable button
    $('.change-email-address').prop('disabled', false);

    return false;

  }

});

// Handle change email button click
$('.change-email-address').on('click', function () {

  // Prevent multiple clicks
  $('.change-email-address').prop('disabled', true);

  // Get the value of the bot trap input
  let bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Get the value of the bot trap input
    let new_email = $('#form_email').val() || '';
    let password  = $('#form_password').val() || '';

    // Prevent invalid parameter length from being submitted
    if (new_email.length > 0 && password.length > 0) {

      // Trigger ajax
      $.ajax({

        // Ajax type
        type: "GET",

        // Ajax URL
        url: 'https://baseball-star.com/backend/handlers/change-email.php',

        // URL parameters
        data: {
          new_email: new_email,
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
            $('.messages.change-email').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">We weren\'t able to change your email address. Please try again or contact us.</div>');

            // Enable button
            $('.change-email-address').prop('disabled', false);

          }

          // Redirect on success
          else {
            window.location.replace(response);
          }

        }

      });

      return false;

    }

    // parameter length is not greater than 0
    else {

      // Error message
      $('.messages.change-email').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">We weren\'t able to process that request. Please try again.</div>');

      // Enable button
      $('.change-email-address').prop('disabled', false);

      return false;

    }

  }

  // Bot trap input was filled out.
  else {

    // Error message
    $('.messages.change-email').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">An invalid action was performed. Please contact us or try again.</div>');

    // Enable button
    $('.change-email-address').prop('disabled', false);

    return false;

  }

});

// Handle newsletter button click
$('.toggle-newsletter-email').on('click', function () {

  // Prevent multiple clicks
  $('.toggle-newsletter-email').prop('disabled', true);

  // Get the value of the bot trap input
  let bot_trap = $('#form_trap').val() || '';

  // Only proceed if the bot trap value is 0.
  // Unsophisticated bots will fill out all inputs on a page.
  // The bot trap is hidden to humans
  if (bot_trap.length == 0) {

    // Get the email status that the button wants to set
    let is_subscribed   = +$(this).data('canemail');

    // Prevent invalid parameter length from being submitted
    if (is_subscribed >= 0) {

      // Trigger ajax
      $.ajax({

        // Ajax type
        type: "GET",

        // Ajax URL
        url: 'https://baseball-star.com/backend/handlers/toggle-account-emails.php',

        // URL parameters
        data: {
          is_subscribed: is_subscribed
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
            $('.messages.change-newsletter').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">We weren\'t able to change your newsletter subscription status. Please try again or contact us.</div>');

            // Enable button
            $('.toggle-newsletter-email').prop('disabled', false);

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

      // Error message
      $('.messages.change-newsletter').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">We weren\'t able to process that request. Please try again.</div>');

      // Enable button
      $('.toggle-newsletter-email').prop('disabled', false);

      return false;

    }

  }

  // Bot trap input was filled out.
  else {

    // Error message
    $('.messages.change-newsletter').html('<div class="alert alert-danger alert-dismissable mt-2 mb-0">An invalid action was performed. Please contact us or try again.</div>');

    // Enable button
    $('.toggle-newsletter-email').prop('disabled', false);

    return false;

  }

});
