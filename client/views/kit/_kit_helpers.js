Template._kit.helpers({
  
  'kit' : function() {
    return Template.instance().kit();
  },

  'samplesCanBeAdded' : function(){
    return Template.instance().kit().sampleIds.length < 3;
  },

  'userSamplesNotInKit' : function() {
    return Samples.find(
      {
        _id: { $nin: Template.instance().kit().sampleIds }
      }
    );
  },

  'thereAreAnySamplesToBeAdded' : function(){
    return Samples.find(
      {
        _id: { $nin: Template.instance().kit().sampleIds }
      }
    ).count() > 0;
  }
  
});