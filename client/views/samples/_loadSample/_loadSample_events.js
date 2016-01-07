Template._loadSample.events({
  'change .select-sample' : function(event, instance){
    var sampleId = instance.find('.select-sample').value;
    instance.data.handleLoad(instance.data.sampleIndex, sampleId);
  },
});