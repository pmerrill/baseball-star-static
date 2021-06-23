// Toggles the visibility of owned player and not owned player plate appearances
$('.toggle-plate-appearance').on('click', function () {
  let hiding_not_owned = $(this).hasClass('hiding-not-owned');
  if (hiding_not_owned) {
    $('.plate-appearance.not-owned').removeClass('d-none');
    $('.inning-label').removeClass('d-none');
    $('.pa-btn').removeClass('col-12').addClass('col-6');
    $('.toggle-plate-appearance').removeClass('hiding-not-owned');
    $('.toggle-plate-appearance span.label-with-name').removeClass('d-none');
    $('.toggle-plate-appearance span.label-no-name').addClass('d-none');
  } else {
    $('.plate-appearance.not-owned').addClass('d-none');
    $('.inning-label').addClass('d-none');
    $('.pa-btn').removeClass('col-6').addClass('col-12');
    $('.toggle-plate-appearance').addClass('hiding-not-owned');
    $('.toggle-plate-appearance span.label-with-name').addClass('d-none');
    $('.toggle-plate-appearance span.label-no-name').removeClass('d-none');
  }
});
