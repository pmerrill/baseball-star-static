// Handle button click
$('.player-list').on('click', function () {

  let site_url = 'https://baseball-star.com';

  // Set the ajax URL here
  let ajax_url = site_url + '/backend/handlers/player-list.php';

  // Only proceed if the ajax URL string length is greater than 0
  if (ajax_url.length > 0) {

    let $modal = $('#playerListModal');
    $modal.addClass('show').attr('style', 'display:block').removeClass('d-none');

    $('body').addClass('modal-open');
    $('.modal-backdrop').removeClass('d-none').addClass('show');

    // Show the loading indicator
    $modal.find('.modal-body .progress').removeClass('d-none');

    // Remove any existing messages or player lists
    $modal.find('ul.playerContainer').remove();
    $modal.find('.modalMessages').empty();

    // Trigger ajax
    $.ajax({

      // Ajax type
      type: "GET",

      // Ajax URL
      url: ajax_url,

      // URL parameters
      data: {},

      // Prevent caching
      cache: false,

      // Force JSON format
      dataType: "json",

      // Ajax request was successful. Response is either a redirect URL or 'error'
      success: function(response) {

        if (response.length > 0) {
          //console.log(response);

          let playerList = '<ul class="playerContainer list-group">';

          // Loop over each result
          for(let key in response) {

            let season_id = response[key].season_id || 0;
            let player_id = response[key].player_id || 0;
            let player_firstname = response[key].player_firstname || '';
            let player_lastname = response[key].player_lastname || '';
            let position_abbr = response[key].position_abbr || '';
            let position_name = response[key].position_name || '';
            let team_id = response[key].team_id || 0;
            let team_name = response[key].team_name || '';
            let team_city = response[key].team_city || '';
            let team_abbr = response[key].team_abbr || '';
            let unread_notifications = response[key].unread_notifications || 0;
            let star_value = response[key].star_value || 0;
            let is_retired = response[key].is_retired || 0;

            playerList += '<li class="list-group-item text-primary playerLogin" data-id="' + player_id + '" data-name="' + player_firstname + ' ' + player_lastname + '">';
            playerList += '<span class="fs16 font-weight-bold">' + player_firstname + ' ' + player_lastname + '</span>';
            playerList += ' <span class="badge badge-light fs11">' + team_abbr + '</span>';

            if (is_retired == 1) {
              playerList += ' <span class="badge badge-secondary fs11">Retired</span>';
            }
			
			else {
				if (unread_notifications > 0) {
				  playerList += ' <span class="badge badge-danger fs11"><i class="far fa-bell mr-1"></i> ' + unread_notifications + '</span>';
				}
				
				if (star_value > 0) {
				  playerList += ' <span class="badge badge-warning fs11"><i class="far fa-star mr-1"></i> ' + star_value + '</span>';
				}
			}

            playerList += '</li>';

          }

          playerList += '</ul>';

          // Hide the loading indicator
          $modal.find('.modal-body .progress').addClass('d-none');

          $modal.find('.modal-body').append(playerList);

        }

        // If no players were found, or in the event of an error, redirect user to the player list page
        else {
          $modal.find('.close').addClass('d-none');
          $modal.find('.modal-body').html('Please wait a moment while your player list loads. If you are not automatically redirected within a second or two then please <a href="' + site_url + '/player/list.php" class="font-weight-bold">click here</a>.');

          setTimeout(function() {
            window.location.replace(site_url + '/player/list.php');
          }, 500);

        }

      }
    });

    return false;

  }

  // ajax_url is not greater than 0.
  else {

    console.log('error');

    return false;
  }

});

// Handle button click
$(document).on('click', '.playerLogin', function() {

  let site_url = 'https://baseball-star.com';

  // Set the ajax URL here
  let ajax_url = site_url + '/backend/handlers/continue.php';

  // Only proceed if the ajax URL string length is greater than 0
  if (ajax_url.length > 0) {

    // Form data sent to Ajax page
    let player_id   = $(this).data('id') || 0;
    let player_name = $(this).data('name') || '';

    // Prevent invalid parameter length from being submitted
    if (player_id > 0 && player_name.length > 0) {

      // Trigger ajax
      $.ajax({

        // Ajax type
        type: "GET",

        // Ajax URL
        url: ajax_url,

        // URL parameters
        data: {
          player_id: player_id,
          player_name: player_name
        },

        // Prevent caching
        cache: false,

        // Force text format
        dataType: "text",

        // Ajax request was successful. Response is either a redirect URL or 'error'
        success: function(response) {

          // Display an error
          if (response === 'error') {
            $('.modalMessages').html('<div class="alert alert-danger alert-dismissable">We weren\'t able to process that request. Please <a href="' + site_url + '/player/list.php" class="font-weight-bold">click here</a> to go to the "My Players" page.</div>');
          }

          // Redirect to the next page in the process
          else {
            $('#playerListModal').find('.progress-bar').text('Just a sec. Loading...');
            $('#playerListModal').find('ul.playerContainer').addClass('d-none');
            $('#playerListModal').find('.progress').removeClass('d-none');
            window.location.replace(response);
          }

        }
      });

      return false;

    }

    // parameter length is not greater than 0
    else {
      $('.modalMessages').html('<div class="alert alert-danger alert-dismissable">We weren\'t able to continue with that player. Please <a href="' + site_url + '/player/list.php" class="font-weight-bold">click here</a> to go to the "My Players" page.</div>');
      return false;
    }

  }

  // ajax_url is not greater than 0.
  else {
    $('.modalMessages').html('<div class="alert alert-danger alert-dismissable">There was an issue continuing with that player. Please <a href="' + site_url + '/player/list.php" class="font-weight-bold">click here</a> to go to the "My Players" page.</div>');
    return false;
  }
});


// Close the modal
$(document).on('click', '#playerListModal .close', function() {
  $('#playerListModal').addClass('d-none').removeClass('show');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').addClass('d-none').removeClass('show');
});

$(document).click(function(event) {
  //if you click on anything except the modal itself or the "open modal" link, close the modal
  if (!$(event.target).closest(".playerListModalContent").length) {
    $('#playerListModal').addClass('d-none').removeClass('show');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').addClass('d-none').removeClass('show');
  }
});
