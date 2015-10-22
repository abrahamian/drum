Template._sample.onCreated(function() {
  var instance = this;

  instance.sample = function() {
    return Samples.findOne(instance.data.sampleId);
  };

  instance.sampleBufferLoaded = new ReactiveVar(false);

  instance.trigger = function() {
    var bufferNode = DrumApp.audioContext.createBufferSource();
    bufferNode.buffer = instance.sampleBuffer;
    bufferNode.connect(instance.highPassFilters[0]);
    bufferNode.start(0);
  };

  var initializeFilters = function() {
    instance.highPassFilters = [];
    instance.lowPassFilters = [];

    //todo DRY this code up.
    //use cascading filters for slopes steeper than 12dB/octave.
    _.each(_.range(4), function(i) {
      var hpf = DrumApp.audioContext.createBiquadFilter();
      hpf.type = "highpass";
      instance.highPassFilters[i] = hpf;

      if(i>0){ instance.highPassFilters[i-1].connect(hpf); }

      var lpf = DrumApp.audioContext.createBiquadFilter();
      lpf.type = "lowpass";
      instance.lowPassFilters.push(lpf);

      if(i>0){ instance.lowPassFilters[i-1].connect(lpf); }
    });

    _.last(instance.highPassFilters).connect( _.first(instance.lowPassFilters));
    _.last(instance.lowPassFilters).connect(DrumApp.audioContext.destination);
  };

  var updateFilters = function(){
    //todo DRY this code up, as above.
    var numHPFs = (instance.sample().highPassFilter.slope / 12);
    _.each(instance.highPassFilters, function(filter, index) {
      var frequency = index < numHPFs ? instance.sample().highPassFilter.frequency : 0 ;
      filter.frequency.value = frequency;
    });

    var numLPFs = (instance.sample().lowPassFilter.slope / 12);
    _.each(instance.lowPassFilters, function(filter, index) {
      var frequency = index < numLPFs ? instance.sample().lowPassFilter.frequency : 20000 ;
      filter.frequency.value = frequency;
    });
  };

  initializeFilters();

  instance.autorun(function() {
    //subscribe to this instance's Sample.
    instance.subscribe('sample', Template.currentData().sampleId, function() {
      
      //once subscribed to sample, reactively update filters.
      instance.autorun(function() {
        instance.sample();
        updateFilters();
      });

      //once subscribed to sample, subscribe to its sound.
      instance.subscribe('sound', instance.sample().soundId, function() {
        //store the sound's audioBuffer promise in this instance.
        instance.soundPromise = instance.sample().sound().requestTape();
      
        instance.autorun(function() {
          //when sample data changes, update this instance's samplePromise
          instance.sample();
          instance.sampleBufferLoaded.set(false);

          //slice out the sample and store its audioBuffer in this instance.
          instance.soundPromise.then(function(tape){
            instance.samplePromise = tape.slice(instance.sample().startTime, instance.sample().duration).render();
            
            instance.samplePromise.then(function(buffer) {
              instance.sampleBuffer = buffer;
              instance.sampleBufferLoaded.set(true);
            });
          });

        });

      });
    });
  });
});