// Execute the player notification function
get_player_notifications();

// Get player notification count via ajax
function get_player_notifications() {

  // Current player ID
  let player_id = $('.switch-player a.current').data('id') || 0;

  // Prevent invalid parameter length from being submitted
  if (player_id > 0) {

    // Set the ajax URL here
    let ajax_url = 'https://baseball-star.com/backend/handlers/notifications.php';

    // Set the nav item that displays notifications
    let nav_notifications = $('li.notifications');

    // Trigger ajax
    $.ajax({

      // Ajax type
      type: "GET",

      // Ajax URL
      url: ajax_url,

      // URL parameters
      data: {
        player_id: player_id
      },

      // Prevent caching
      cache: false,

      // Force text format
      dataType: "text",

      // Ajax request was successful. Response is either a redirect URL or 'error'
      success: function(response) {

        // Return an error
        if (response === 'error') {
          return false;
        }

        // Success. Return the handler data
        else {

          // Rename the response
          let notifications = response;

          // If there are unread notifications
          if (notifications > 0) {

            // Display the notification nav item and update the number of unread notifications
            nav_notifications.find('.notification-count').removeClass('d-none').text(notifications);

          }

          else {

            // Make sure the unread notification badge is hidden when there aren't any unread notifications
            nav_notifications.find('.notification-count').addClass('d-none');

          }

          return true;

        }

      }
    });

  }

  // parameter length is not greater than 0
  else {
    return false;
  }

}
