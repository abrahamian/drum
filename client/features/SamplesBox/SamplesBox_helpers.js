Template.SamplesBox.helpers({
  'samples' : function() {
    return Template.instance().samples();
  },

  'createNewSample' : function() {
    return Template.instance().createNewSample;
  },

  'selectSample' : function() {
    return Template.instance().selectSample;
  },

  'removeSample' : function(){
    return Template.instance().removeSample;
  },

  'samplesListData' : function() {
    return {
      samples: Template.instance().samples(),
      handleSelect: Template.instance().selectSample,
      handleRemove: Template.instance().removeSample
    }
  }
});