define( ["jquery", "js/class", "js/bars/bar", "js/utils/guid", "rickshaw"], function($, Class, Bar, GUID, Rickshaw){

  var Widget = Class.extend({
    init: function(gottwall, id){
      this.id = id;
      this.type = "widget";
      this.gottwall = gottwall;
      this.selectors_node = null;
      this.palette = new Rickshaw.Color.Palette();
    },
    show_loader: function(){
      this.node.find('svg').hide();
      this.node.find('.alert').hide();
      this.node.find('.loader').show();
    },
    hide_loader: function(){
      this.node.find('svg').show();
      this.node.find('.loader').hide();
      this.node.find('.alert').hide();
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
      this.selectors_node.append(bar.render());
      bar.render_selectors();
      bar.add_bindings();
    },
    setup: function(){},
    add_bindings: function(){
      var self = this;
      this.node.on('click', '.chart-controls .add-bar', function(){
	var button = $(this);
	var bar = new Bar(self.gottwall, self, GUID(), self.palette.color());
	self.add_bar(bar);
	self.render_bar(bar);
      });

      this.node.on(
	'click', '.widget-bar .remove-chart', function(){
	  var button = $(this);
	  $.log("Remove chart");
	  self.remove();
	});
      this.node.on(
	'click', '.chart-controls .share-chart', function(){
	  var params = self.to_dict();
	  params['period'] = self.gottwall.current_period;
	  self.gottwall.make_embedded(JSON.stringify(params),
				      function(data){
					return self.links_loaded(data);
				      });
	});
    },
    remove: function(){
      this.gottwall.remove_chart(this);
    },
    node_key: function(){
      return "chart-"+this.id;
    },
    links_loaded: function(data){
      this.render_share_modal_body(data);
      $('#share-modal').modal();
    },
    render_share_modal_body: function(data){
      var template = swig.compile($("#share-modal-body").text());
      $("#share-modal .modal-body").html(template(data));
    }
  });
  return Widget;
});
