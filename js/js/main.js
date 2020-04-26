"use strict";

$(document).ready(function () {
  $('.delete-metric').on('click', function (e) {
    $target = $(e.target);
    var id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/metrics/' + id,
      success: function success(response) {
        alert('Deleting Metric');
        window.location.href = '/';
      },
      error: function error(err) {
        console.log(err);
      }
    });
  });
});