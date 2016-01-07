Template.KitRack.onCreated(function() {
  var instance = this;

  instance.autorun(function(){
    instance.subscribe('kit', Template.currentData().kitId);
  });

  instance.kit = function(){
    return Kits.findOne(instance.data.kitId);
  };

  instance.unloadSample = function(sampleIndex){
    var modifiers = {};
    modifiers["sampleIds."+sampleIndex] = null;
    Meteor.call('Kit/update', instance.kit()._id, modifiers);
  };

  instance.loadSample = function(sampleIndex, sampleId){
    var modifiers = {};
    modifiers["sampleIds."+sampleIndex] = sampleId;
    Meteor.call('Kit/update', instance.kit()._id, modifiers);
  };
});