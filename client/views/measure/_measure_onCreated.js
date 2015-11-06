Template._measure.onCreated(function(){
  
  var instance = this;

  instance.measure = function() {
    return Measures.findOne(instance.data.measureId);
  };

  instance.subscribe('measure', Template.currentData().measureId, function(){});

});