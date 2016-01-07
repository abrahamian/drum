Template.SampleSlot.helpers({
  sample: function(){
    return Template.instance().sample();
  },
  
  'triggerData': function(){
    return {
      handleTrigger: Template.instance().schedulePlay
    }
  },

  'unloadData' : function(){
    return {
      sampleIndex: Template.instance().data.sampleIndex,
      handleUnload: Template.instance().data.handleUnload
    }
  },

  'loadData' : function(){
    return {
      samples: Samples.find(),
      sampleIndex: Template.instance().data.sampleIndex,
      handleLoad: Template.instance().data.handleLoad
    }
  },
});