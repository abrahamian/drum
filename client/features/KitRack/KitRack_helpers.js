Template.KitRack.helpers({
  'kit' : function(){
    return Template.instance().kit();
  },

  'generateSampleSlotData' : function(sampleIndex){
    return {
      sampleSlotData: {
        sampleIndex: sampleIndex,
        sampleId: Template.instance().sampleIds.get(sampleIndex),
        handleUnload: Template.instance().unloadSample,
        handleLoad: Template.instance().loadSample,
      }
    };
  }
});