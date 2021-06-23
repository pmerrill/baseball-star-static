// Get the server timezone and the user timezone
let timezone_server = $('main').data('timezone');
let timezone_user   = moment.tz.guess(true);
//let timezone_user    = Intl.DateTimeFormat().resolvedOptions().timeZone;
//console.log(timezone_server + ' - ' + timezone_user);

moment.tz.setDefault(timezone_server);

// Only convert times if the server timezon and the user timezone are set
if (timezone_server.length > 0 && timezone_user.length > 0) {

  // Loop over each timestamp and convert the time to the user's timezone
  $('.timestamp').each(function(){

    // Get the timestamp
    let timestamp   = $(this).data('time');
    timestamp       = moment(timestamp).tz(timezone_user).format();

    // Get the game time format or set the default format
    let time_format = $(this).data('format') || 'h:mm a z';

    // Convert to the user's timezone and format as defined
    timestamp = moment.tz(timestamp, timezone_user).format(time_format);

    // Update the timestamp text with the converted time
    $(this).text(timestamp);

  });

  // Loop over each timeago timestamp and convert the time to the user's timezone
  $('.timeago').each(function(){

    // Get the timestamp
    let timestamp   = $(this).data('time');
    timestamp       = moment(timestamp).tz(timezone_user).format();

    // Convert the timestamp to a moment.js object
    timestamp       = moment.tz(timestamp, timezone_user);

    //  Get the current time in the user's timezone
    let time_now    = moment.tz(timezone_user);

    // Calculate the amount of time that has passed
    let time_ago    = timestamp.from(time_now);

    // Update the timestamp text with the converted time
    $(this).text(time_ago);

  });

  // Loop over each timeto timestamp and convert the time to the user's timezone
  $('.timeto').each(function(){

    // Get the timestamp
    let timestamp   = $(this).data('time');
    timestamp       = moment(timestamp).tz(timezone_user).format();

    // Convert the timestamp to a moment.js object
    timestamp       = moment.tz(timestamp, timezone_user);

    //  Get the current time in the user's timezone
    let time_now    = moment.tz(timezone_user);

    // Calculate the amount of time until
    let time_to     = time_now.to(timestamp);

    // Update the timestamp text with the converted time
    $(this).text(time_to);

  });

}
