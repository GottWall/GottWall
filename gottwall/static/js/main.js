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


(function($, nv){
  var chart_container = $('#chart');
  // Load metrics tree
  nv.addGraph(function() {
  var chart = nv.models.lineChart();

  chart.xAxis
      .axisLabel('Time (ms)')
      .tickFormat(d3.format(',r'));

  chart.yAxis
      .axisLabel('Voltage (v)')
      .tickFormat(d3.format('.02f'));

  d3.select('#chart svg')
      .datum(sinAndCos())
    .transition().duration(500)
      .call(chart);

  nv.utils.windowResize(function() { d3.select('#chart svg').call(chart) });

  return chart;
});




/**************************************
 * Simple test data generator
 */


function sinAndCos() {
  var sin = [],
      cos = [];

  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }

  return [
    {
      values: sin,
      key: 'Sine Wave',
      color: '#ff7f0e'
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    }
  ];
}

})(jQuery, nv);