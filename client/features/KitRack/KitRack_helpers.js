Template.KitRack.helpers({
  'kit' : function(){
    return Template.instance().kit();
  },

  'sampleIndices' : function(){
    return [0,1,2];
  },

  'generateSampleSlotData' : function(sampleIndex){
    return {
      sampleSlotData: {
        sampleIndex: sampleIndex,
        sampleId: Template.instance().kit().sampleIds[sampleIndex],
        handleUnload: Template.instance().unloadSample,
        handleLoad: Template.instance().loadSample,
      }
    };
  }
});