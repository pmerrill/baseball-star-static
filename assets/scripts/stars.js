// Execute the player stars function
get_player_stars();

// Get player stars count via ajax
function get_player_stars() {

  // Current player ID
  let player_id = $('.switch-player a.current').data('id') || 0;

  // Prevent invalid parameter length from being submitted
  if (player_id > 0) {

    // Set the ajax URL here
    let ajax_url = 'https://baseball-star.com/backend/handlers/stars.php';

    // Set the nav item that displays stars
    let nav_stars = $('li.stars');

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

        //console.log(response);
        //console.log(nav_stars);

        // Return an error
        if (response === 'error') {
          return false;
        }

        // Success. Return the handler data
        else {

          // Rename the response
          let stars = response;

          // If there are stars
          if (stars > 0) {

            // Display the notification nav item and update the number of stars
            nav_stars.find('.star-count').removeClass('d-none').text(stars);

          }

          else {

            // Make sure the star badge is hidden when there aren't any stars
            nav_stars.find('.star-count').addClass('d-none');

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
