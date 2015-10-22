function CustomFilter(args) {
  this.context = args.context;
  this.type = args.type;
  this.bypassedFrequency = args.bypassedFrequency;
  this.frequency = args.frequency;
  this.slope = args.slope;
  this.components = this.buildComponents();
};

_.extend(CustomFilter.prototype, {
  buildComponents : function() {
    var self = this;

    var numFilters = 4;
    var components = [];

    _.each(_.range(numFilters), function(index) {
      var filter = self.context.createBiquadFilter();
      filter.frequency.value = self.frequency;
      filter.type = self.type;
      filter.active = true;
      components[index] = filter;
      if(index > 0){ components[index-1].connect(filter); }
    });

    return components;
  },

  input: function() {
    return _.first(this.components);
  },

  output: function() {
    return _.last(this.components);
  },

  setFrequency: function(frequency) {
    var self = this;
    self.frequency = frequency;
    
    _.each(this.components, function(filter){
      if(filter.active) { 
        filter.frequency.value = frequency;
      }
    });      
  },

  setSlope: function(slope) {
    var self = this;
    self.slope = slope;
    
    _.each(this.components, function(filter, index) {
      if( index < (self.slope/12) ) {
        filter.active = true;
        filter.frequency.value = self.frequency 
      } else {
        filter.active = false;
        filter.frequency.value = self.bypassedFrequency; 
      }
    });
  }
});

DrumApp = {};
DrumApp.CustomFilter = CustomFilter;