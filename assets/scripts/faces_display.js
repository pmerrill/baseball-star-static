// Loops over each HTML element with the player_face class and attempts to retrieve, then display, the faces.js face
$('.player_face').each(function() {

  // Get the ID of the player's face
  // The ID is used to extract the face's string from local storage
  var face_id = this.id;

  // The face ID must a string greater than 0 characters in length
  if (face_id.length > 0) {

    // Get the face SVG for the player
    var face_svg = $('#' + face_id).find('svg');

    // Find the player's team
    var team = $('#' + face_id).data('team');

    // Check if a player face SVG has already been generated for this face ID
    if (face_svg.length === 0) {
      //console.log(face_id + ' SVG does not exist');

      // Get the face string from local storage using lockr.js
      var face_get = Lockr.get(face_id);

      // Generate, display, then store a player face if the local storage (face_get) variable is undefined/not found
      if (face_get === undefined) {
        //console.log(face_id + ' does not exist in local storage. Generate face.');

        // Use faces.js to generate a face for the player from their roster ID face string
        // faces.generate(face_id) generates a face and also displays it in the HTML element with the same ID
        var generated_face = faces.generate(face_id);

        // Change the player's jersey to match their current team
        if ('jersey' in generated_face) {
          generated_face['jersey']['id'] = team;
        }

        //console.log(generated_face);

        // Save the generated face in local storage using lockr.js
        Lockr.set(face_id, JSON.stringify(generated_face));

        // Display the saved face
        faces.display(face_id, generated_face);

      }

      // The face ID was found in local storage.
      // Convert the face item to a JSON object and display it using faces.js
      else {
        //console.log(face_id + ' was found in local storage.');

        // Convert the local storage string to a JSON object
        var face_json = JSON.parse(face_get);

        // Change the player's jersey to match their current team
        if ('jersey' in face_json) {
          face_json['jersey']['id'] = team;
        }

        //console.log(face_json);

        // Display the saved face
        faces.display(face_id, face_json);

      } // end of face_get undefined check

    }

    // If the face SVG has already been generated then clone it so we can reuse it elsewhere on the page
    else {
      //console.log(face_id + ' SVG exists');

      //console.log(face_svg);

      // Add the face SVG to each of the player face classes on the page
      $('.player_face.' + face_id).html(face_svg);

    } // end of face_svg length check

  } // end of face_id length check

});
