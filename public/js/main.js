$(document).ready(function(){
    $('.delete-metric').on('click', function(e){
      $target = $(e.target);
      const id = $target.attr('data-id');
      $.ajax({
        type:'DELETE',
        url: '/metrics/'+id,
        success: function(response){
          alert('Deleting Metric');
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }
      });
    });
  });
