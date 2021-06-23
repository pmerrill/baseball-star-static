$(function() {

  // Toggles the visibility  of parent trait children items
  $('.toggle_trait_children').on('click', function() {

    // Get the ID of the parent trait
    let parent_trait_id = $(this).data('id') || 0;

    // Parent trait ID must be greater than 0
    if (parent_trait_id > 0) {

      // Get the current state of the button
      let pre_text = $(this).find('.pre-text') || '';

      // Loop over the children of the parent trait
      $('.trait_parent.' + parent_trait_id + ':not(.is-parent)').each(function() {

        // Remove hidden children if the button is currently set to hide
        if (pre_text.text() === 'Show') {

          // Remove the class that hides the child item from view
          $(this).removeClass('d-none');

        }

        // Hide child items if the button is currently set to show
        else {

            // Add the class that hides the child item from view
            $(this).addClass('d-none');

        }

      });

      // Set the state of the trait children
      if (pre_text.text() === 'Show') {
        pre_text.text('Hide');
      } else {
        pre_text.text('Show');
      }

    }

    // Parent trait ID was not valid
    else {
      return false;
    }

  });

  // Get the player's stars
  let stars_left = +$('.player_stars b').text() || 0;

  // Players must have stars to spend
  if (stars_left > 0) {

    // Toggle buttons based on affordability
    toggle_buttons(stars_left);

    // Handle clicks on the improve button
    $('.improve-trait').on('click', function() {

      // Set the ajax URL here
      let ajax_url = 'https://baseball-star.com/backend/handlers/improve.php';

      // Remove any visible error message
      $('.messages .alert').remove();

      // Hide any visible stars left button counters
      $('.stars_left').addClass('d-none');

      // Get the current number of player stars
      stars_left = +$('.player_stars b').text() || 0;

      // Get the ID of the trait clicked
      let trait_id  = +$(this).data('id') || 0;

      // Only proceed if a stars left is greater than 0 and a trait was selected
      if (stars_left > 0 && trait_id > 0) {

        // Get the trait progress bar
        let progress_bar      = $('.progress-bar.trait.' + trait_id);

        // Get the original value of the progress bar
        let original_value    = +progress_bar.text() || 0;

        // Get the player trait value
        let trait_value       = +progress_bar.data('playervalue') || 0;

        // Get the master value for the trait
        let master_value      = +progress_bar.data('basevalue') || 0;

        // Set the new trait value if successfully improved
        let new_trait_value   = (trait_value * 1.0) + 1.0;

        // Get the cost of improvement
        // 5/01/20: Commented out: let improvement_cost  = (trait_value + ((100.0 - master_value) * ((trait_value - master_value) + 1.0))).toFixed(0) || 0;
        let improvement_cost  = (trait_value + ((100.0 - master_value) * ((trait_value - master_value) / 2.0))).toFixed(0) || 0;

        // Only proceed if a trait is being improved more than 0 and the cost is more than 0
        if (new_trait_value > 0 && improvement_cost > 0) {

          // Make sure the minimum cost of improving a trait is 75 stars
          // 5/01/20: Changed from 100 to 75
          improvement_cost = (improvement_cost < 100) ? 75 : improvement_cost;

          // Update the number of stars left
          let player_stars = ((stars_left * 1.0) - (improvement_cost * 1.0));

          // Only allow improvements that will leave a star balance of 0 or greater
          if (player_stars >= 0) {

            // Get the value of the disabled inputs
            var bot_trap  = $('#form_trap').val() || '';
            let player_id = +$('#player_id').val() || '';
            let season_id = +$('#season_id').val() || '';

            // Only proceed if the bot trap value is 0.
            // Unsophisticated bots will fill out all inputs on a page.
            // The bot trap is hidden to humans
            if (bot_trap.length == 0 || player_id.length == 0 || season_id.length == 0) {

              // Only proceed if the ajax URL string length is greater than 0
              if (ajax_url.length > 0) {

                // Trigger ajax
                $.ajax({

                  // Ajax type
                  type: "GET",

                  // Ajax URL
                  url: ajax_url,

                  // URL parameters
                  data: {
                    player_id         : player_id,
                    season_id         : season_id,
                    trait_id          : trait_id,
                    trait_value       : new_trait_value,
                    improvement_cost  : improvement_cost,
                  },

                  // Prevent caching
                  cache: false,

                  // Force text format
                  dataType: "text",

                  // Ajax request was successful. Response is either a redirect URL or 'error'
                  success: function(response) {

                    // The improvement was succesful. Update the progress bar and the star counter
                    if (response === 'success') {

                      // Set the value that users see on the trait progress bar
                      let trait_display_value = ((original_value * 1.0) + 1.0) || 0;

                      // Calculate the percent a trait has improved and use to set the progress bar width
                      let improvement_pct = (trait_display_value / (new_trait_value + trait_display_value)) * 100.0;

                      // Apply the trait display value to the progress bar element
                      progress_bar.data('playervalue', new_trait_value).width(improvement_pct + '%').text(trait_display_value);

                      // Update the display that shows the player's stars
                      $('.player_stars b').text(player_stars);

                      // Remove the hide class from the "Stars Left" message for this trait
                      $('.stars_left.' + trait_id).removeClass('d-none');

                      // Sync the "Stars Left" success message with the player star count
                      $('.stars_left.' + trait_id + ' span').text(player_stars);

                      // Set the cost of the next improvement for this trait
                      // 5/01/20: Commented out: let new_improvement_cost = (new_trait_value + ((100.0 - master_value) * ((new_trait_value - master_value) + 1.0))).toFixed(0) || 0;
                      let new_improvement_cost = (new_trait_value + ((100.0 - master_value) * ((new_trait_value - master_value) / 2.0))).toFixed(0) || 0;

                      // Make sure the minimum cost of improving a trait is  75 stars
                      // 5/01/20: Changed from 100 to 75
                      new_improvement_cost = (new_improvement_cost < 100) ? 75 : new_improvement_cost;

                      // Display the cost of the next improvement for this trait
                      $('.improve-trait.' + trait_id + ' span.cost').text(new_improvement_cost);
                      $('.improve-trait.' + trait_id).data('original', new_improvement_cost);

                      // Toggle buttons based on affordability
                      toggle_buttons(player_stars);

                    }

                    // The handler page could not complete the request
                    else {
                      if (response === 'not-enough') {
                        $('.messages.' + trait_id).html('<div class="alert alert-danger alert-dismissable mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>You don\'t have enough stars to purchase this upgrade.</div>');
                      } else {
                        $('.messages.' + trait_id).html('<div class="alert alert-danger alert-dismissable mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>The handler could not complete your request. Please contact us or try again.</div>');
                      }

                      // Toggle buttons based on affordability
                      toggle_buttons(player_stars);

                    }

                  }
                });

              }

              // The ajax url is an invalid length
              else {
                $('.messages.' + trait_id).html('<div class="alert alert-danger alert-dismissable mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>A valid endpoint for your request could not be found. Please contact us or try again.</div>');

                // Toggle buttons based on affordability
                toggle_buttons(stars_left);

              }

            }

            // The hidden inputs aren't a valid number
            else {
              $('.messages.' + trait_id).html('<div class="alert alert-danger alert-dismissable mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>An invalid action occurred while processing your request. Please contact us or try again.</div>');

              // Toggle buttons based on affordability
              toggle_buttons(stars_left);

            }

          }

          // The player would have a negative number of stars if they improved this trait
          else {
            $('.messages.' + trait_id).html('<div class="alert alert-danger alert-dismissable mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>The player doesn\'t have enough stars to complete this improvement. Please contact us or try again.</div>');

            // Toggle buttons based on affordability
            toggle_buttons(stars_left);

          }

        }

        // The trait was either not improved more than 0 or the cost is not more than 0
        else {
          $('.messages.' + trait_id).html('<div class="alert alert-danger alert-dismissable mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>An trait must be increased by 1 or more. Please contact us or try again.</div>');

          // Toggle buttons based on affordability
          toggle_buttons(stars_left);

        }

      }

      // The stars left aren't more than 0 or the trait wasn't selected correctly.
      else {

        // Display an error message
        $('.messages.' + trait_id).html('<div class="alert alert-danger alert-dismissable mb-0"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>A valid trait wasn\'t selected or the player doesn\'t have enough stars. Please contact us or try again.</div>');

        // Toggle buttons based on affordability
        toggle_buttons(stars_left);

      }

    });

  }

  // The player doesn't have any stars to spend.
  else {

    // Toggle buttons based on affordability
    toggle_buttons(stars_left);

  }

  function toggle_buttons(stars_left) {

    // Update the navigation stars counter so it matches the form
    $('.nav-item.stars .star-count').text(stars_left);

    // Toggle the status of the improve trait buttons on the page
    $('.improve-trait').each(function( index ) {

      // Get the cost for improving this trait
      let cost = +$(this).data('original') || 0;

      // Disable buttons for traits if the player can't afford to improve
      if (cost > stars_left) {

        // Change the button class and status
        $(this).removeClass('btn-primary').removeClass('d-none').addClass('btn-secondary').attr('disabled', true);

        // Change the "pre" cost text
        $(this).find('span.pre-text').text('Need');
        $(this).find('span.post-text').text('More Stars');

        // Get the difference in cost
        let difference = (stars_left > 0) ? (cost - stars_left) : cost;

        // Change the cost text
        $(this).find('span.cost').text(difference);

      }

      // Player can afford to improve this trait
      else {

        // Remove the class that hides buttons
        $(this).removeClass('d-none');

        return true;
      }

    });

  }

});
