(function($) {
  $.log = function (obj, params) {
    if ((typeof(console) != 'undefined') && (typeof(console.log) == 'function'))
    {
      console.log(obj, (params)?params:'');
    };
    return this;
  };
  $.fn.debug = function () {
    return this.each(function(){
      $.log(this);
    });
  };
})(jQuery);


(function($){
  var chart_container = $('#chart');
  // Load metrics tree


})(jQuery);