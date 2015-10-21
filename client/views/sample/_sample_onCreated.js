Template._sample.onCreated(function() {
  var instance = this;

  instance.sample = function() {
    return Samples.findOne(instance.data.sampleId);
  }

  instance.autorun(function() {
    //subscribe to this instance's Sample.
    instance.subscribe('sample', Template.currentData().sampleId, function() {
      //once subscribed to sample, subscribe to its sound.
      instance.subscribe('sound', instance.sample().soundId, function() {
        //store the sound's audioBuffer promise in this instance.
        instance.soundPromise = instance.sample().sound().requestTape();
      });
    });
  });

});