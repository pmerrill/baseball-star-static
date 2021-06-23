// Set the navigation item that contains the switch player item
let switch_player   = $('.switch-player');

// Get the account session cookie
let account_session_cookie  = getCookie("baseball_star_session");

// Get the account verified cookie
let account_verified_cookie  = getCookie("baseball_star_account_verified");

// Get the player ID cookie
let player_id_cookie  = getCookie("baseball_star_player_id");

// Get the player name cookie
let player_name_cookie  = getCookie("baseball_star_player_name");

// Set the 'Switch Player' navigation item to show the player cookie value
if (player_name_cookie.length > 0) {
  switch_player.removeClass('d-none');
  switch_player.find('a.current').attr('data-id', player_id_cookie).text(player_name_cookie);
}

// Hide navigation items and do other things if the account hasn't set a player ID cookie
if (player_id_cookie.length <= 0) {

  // Loop over the header navigation and hide specific items
  $('#header li.nav-item:not(.logo, .account, .no-session)').each(function() {
    $(this).addClass('d-none');
  });

  // Display a link to the player list if the user hasn't set a player ID cookie
  $('#header li.choose-player').removeClass('d-none');

}

// Toggle the alert that warns users about their account verification status
if (account_verified_cookie == 0 && account_session_cookie.length > 0) {

  // Display the site message container
  //$('.site-messages').removeClass('d-none');

  // Display the account verification message
  $('.account-verified').removeClass('d-none');

  // Handle button click that sends verification email
  $('.send-verify-email').on('click', function () {

    // The button should be disabled if it was clicked once already. Check if it has the disabled class
    let disabled = $(this).hasClass('disabled');

    // Only send an email if the button isn't disabled
    if (!disabled) {

      // Prevent multiple clicks without refreshing the page
      $(this).addClass('disabled').removeClass('text-primary');

      // Trigger ajax
      $.ajax({

        // Ajax type
        type: "GET",

        // Ajax URL
        url: 'https://baseball-star.com/backend/handlers/send-verify-email.php',

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
            $('.response-container').removeClass('d-none').html('<div class="col-12 alert alert-danger alert-dismissable mb-0"><strong>We weren\'t able to send you a new verification email.</strong> Please try again or contact us.</div>');
          }

          // Display a success message
          else {
            $('.account-verified').addClass('d-none');
            $('.response-container').removeClass('d-none').html('<div class="col-12 rounded-0 alert alert-success alert-dismissable mb-0"><strong>A verification email was sent to ' + response + '.</strong> Please click the link to finish verifying or let us know if you don\'t get an email.</div>');
          }
        }
      });

      return false;

    }

    // Bot trap input was filled out.
    else {
      $('.response-container').removeClass('d-none').html('<div class="col-12 rounded-0 alert alert-danger alert-dismissable mb-0"><strong>You can\'t request a new verification email yet.</strong> Please refresh the page or contact us.</div>');
      return false;
    }

  });

}

// Get a cookie by name
function getCookie(cname) {

  var name = cname + "=";

  var decodedCookie = decodeURIComponent(document.cookie);

  var ca = decodedCookie.split(';');

  for(var i = 0; i <ca.length; i++) {

      var c = ca[i];

      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        if (cname === 'baseball_star_player_name') {
          return c.substring(name.length, c.length).split('+').join(' ');
        } else {
          return c.substring(name.length, c.length).replace(/\W/g, ' ');
        }
      }

  }

  return "";

}
