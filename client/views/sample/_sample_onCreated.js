Template._sample.onCreated(function() {
  var instance = this;

  instance.sample = function() {
    return Samples.findOne(instance.data.sampleId);
  };

  instance.sampleBufferLoaded = new ReactiveVar(false);

  instance.trigger = function() {
    var bufferNode = DrumApp.audioContext.createBufferSource();
    bufferNode.buffer = instance.sampleBuffer;
    bufferNode.connect(DrumApp.audioContext.destination);
    bufferNode.start(0);
  };

  instance.autorun(function() {
    //subscribe to this instance's Sample.
    instance.subscribe('sample', Template.currentData().sampleId, function() {
      //once subscribed to sample, subscribe to its sound.
      instance.subscribe('sound', instance.sample().soundId, function() {
        //store the sound's audioBuffer promise in this instance.
        instance.soundPromise = instance.sample().sound().requestTape();
      
        instance.autorun(function() {
          //when sample data changes, update this instance's samplePromise
          instance.sample();
          instance.sampleBufferLoaded.set(false);

          instance.soundPromise.then(function(tape){
            instance.samplePromise = tape.slice(instance.sample().startTime, instance.sample().duration).render();
            
            instance.samplePromise.then(function(buffer) {
              //store the sample's audioBuffer in this instance.
              instance.sampleBuffer = buffer;
              instance.sampleBufferLoaded.set(true);
            });

          });
        });
      });
    });
  });

});