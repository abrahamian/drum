Template._unloadSample.events({
  'click .unload' : function(event, instance) {
    instance.data.handleUnload(instance.data.sampleIndex);
  },
});