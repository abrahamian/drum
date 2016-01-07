Template.MeasureBox.onCreated(function() {
  console.log(Template.currentData());
  var instance = this;

  instance.autorun(function(){
    instance.subscribe('measure', Template.currentData().measureId);
  });

  instance.measure = function(){
    return Measures.findOne(instance.data.measureId);
  };

  instance.updateMeasure = function(modifiers){
    Meteor.call('Measure/update', instance.measure()._id, modifiers);
  };

});