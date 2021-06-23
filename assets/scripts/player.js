$(function() {

  // Toggles the visibility of parent trait children items
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

});
