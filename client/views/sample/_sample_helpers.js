Template._sample.helpers({
  'sample' : function() {
    return Template.instance().sample();
  },

  'sampleBufferLoaded' : function() {
    return Template.instance().sampleBufferLoaded.get();
  },

  'soundPromise' : function() {
    return Template.instance().soundPromise;
  }
});