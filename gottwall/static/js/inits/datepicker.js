
define(['jquery', 'bootstrap-datepicker'], function($){
  $('.datepicker').datepicker()
    .on('changeDate', function(ev){
      $('.datepicker').datepicker('hide');
    });
  return {};
});