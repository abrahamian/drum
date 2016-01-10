Template.SampleLoader.onCreated(function(){
  var instance = this;
  window.SOUND_PROMISES = window.SOUND_PROMISES || {};

  var extractSample = function(tape, sample){
    return tape.slice(sample.startTime - sample.fades.in.duration, sample.duration + sample.fades.out.duration).render();
  };

  instance.autorun(function(){
    var sample = Template.currentData().sample();
    instance.subscribe('sound', sample.soundId, function(){
      var sound = Sounds.findOne(sample.soundId);
      var soundPromise;
      if(window.SOUND_PROMISES[sample.soundId]){
        soundPromise = window.SOUND_PROMISES[sample.soundId];
      } else {
        soundPromise = sound.requestTape();
        window.SOUND_PROMISES[sample.soundId] = soundPromise;
      }
      soundPromise.then(function(tape){
        var samplePromise = extractSample(tape, sample);          
        samplePromise.then(function(sampleBuffer) {
          instance.data.setBuffer(sampleBuffer);
        });
      });
    });
  });
});