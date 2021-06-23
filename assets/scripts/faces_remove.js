// Loops over each HTML element with the player_face class and empties the lockr.js local storage object with the corresponding ID
$('.player_face').each(function() {

  // Get the ID of the player's face
  var face_id = this.id;

  // The face ID must a string greater than 0 characters in length
  if (face_id.length > 0) {

    // Empty the local storage object by face ID
    Lockr.rm(face_id);

  } // end of face_id length check

});
