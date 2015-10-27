Template._kit.helpers({
  
  'kit' : function() {
    return Template.instance().kit();
  },

  'userSamplesNotInKit' : function() {
    return Samples.find(
      {
        _id: { $nin: Template.instance().kit().sampleIds }
      }
    );
  }

});