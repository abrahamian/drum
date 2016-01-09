Template.SampleLoader.onCreated(function(){
  var instance = this;

  var extractSample = function(tape, sample){
    return tape.slice(sample.startTime - sample.fades.in.duration, sample.duration + sample.fades.out.duration).render();
  };

  instance.autorun(function(){
    var sample = Template.currentData().sample();
    instance.subscribe('sound', sample.soundId, function(){
      var sound = Sounds.findOne(sample.soundId);
      var soundPromise = sound.requestTape();
      soundPromise.then(function(tape){
        var samplePromise = extractSample(tape, sample);          
        samplePromise.then(function(sampleBuffer) {
          instance.data.setBuffer(sampleBuffer);
        });
      });
    });
  });
});