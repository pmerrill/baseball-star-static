// Loops over each HTML element with the player_face class then generates and stores a face using faces.js and lockr.js
$('.player_face').each(function() {

  // Get the ID of the player's face
  var face_id = this.id;

  // The face ID must a string greater than 0 characters in length
  if (face_id.length > 0) {

    // Use faces.js to generate a face for the player from their roster ID face string
    var generated_face = faces.generate();

    // Save the generated face in local storage using lockr.js
    Lockr.set(face_id, JSON.stringify(generated_face));

  } // end of face_id length check

});
