Template.SampleSlot.helpers({
  sample: function(){
    return Template.instance().sample();
  },

  sampleBufferLoaded: function(){
    return Template.instance().sampleBufferLoaded.get();
  },
  
  'triggerData': function(){
    return {
      handleTrigger: Template.instance().schedulePlay
    }
  },

  'mute' : function(){
    return Template.instance().mute.get();
  },

  'powerButtonData' : function(){
    return {
      active: Template.instance().mute.get(),
      iconName: 'power-off',
      handleClick: Template.instance().togglePower,
    }
  },

  'gearButtonData' : function(){
    return {
      active: (FlowRouter.getQueryParam('sample') === Template.instance().data.sampleId),
      iconName: 'cog',
      handleClick: Template.instance().selectSample,
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
      selectedSample: Template.instance().sample(),
      sampleIndex: Template.instance().data.sampleIndex,
      handleLoad: Template.instance().data.handleLoad
    }
  },
});