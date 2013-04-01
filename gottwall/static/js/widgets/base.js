define( ["jquery", "js/class", "js/bars/bar", "js/utils/guid"], function($, Class, Bar, GUID){

  var Widget = Class.extend({
    init: function(gottwall, id){
      console.log("Initialize widget");
      this.id = id;
      this.type = "widget";
      this.gottwall = gottwall;
      this.selectors_node = null;
    },
    show_loader: function(){
      console.log("Show loader");
      this.node.find('svg').hide();
      this.node.find('.loader').show();
    },
    hide_loader: function(){
      console.log("Hide loader");
      this.node.find('svg').show();
      this.node.find('.loader').hide();
    },
    get_class_by_type: function(type){
      if(type=="table"){
	return Table;
      } else if (type=="chart"){
	return Chart;
      }
      return null;
    },
    render_bar: function(bar){
      // Render bar on Chart area
      if(!this.renders_selector){
	console.log("Render chart area before");
      }
      this.selectors_node.append(bar.render());
      bar.render_selectors();
      bar.add_bindings();
    },
    setup: function(){},
    add_bindings: function(){
      var self = this;
      this.node.on('click', '.chart-controls .add-bar', function(){
	var button = $(this);
	var bar = new Bar(self.gottwall, self, GUID());
	self.add_bar(bar);
	self.render_bar(bar);
      });

      this.node.on(
	'click', '.widget-bar .remove-chart', function(){
	  var button = $(this);
	  $.log("Remove chart");
	  self.remove();
	});
    },
    remove: function(){
      this.gottwall.remove_chart(this);
    },
    node_key: function(){
      return "chart-"+this.id;
    },
  });
  return Widget;
});
