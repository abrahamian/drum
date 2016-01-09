Template.KitRack.onCreated(function() {
  var instance = this;

  instance.kit = function(){
    return Kits.findOne(instance.data.kitId);
  };

  instance.sampleIds = new ReactiveDict();
  instance.sampleIds.set({
    0: null,
    1: null,
    2: null
  });

  instance.autorun(function(){
    instance.subscribe('kit', Template.currentData().kitId, function(){
      instance.autorun(function(){
        instance.kit();
        instance.sampleIds.set({
          0: instance.kit().sampleIds[0],
          1: instance.kit().sampleIds[1],
          2: instance.kit().sampleIds[2]
        });
      });
    });
  });

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