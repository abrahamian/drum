Template.SampleSlot.onCreated(function(){
  var instance = this;
  console.log(this);

  instance.sample = function(){
    return Samples.findOne(instance.data.sampleId);
  };

  instance.selectSample = function() {
    FlowRouter.setQueryParams({ 'sample': instance.data.sampleId });
  };

  instance.sampleBufferLoaded = new ReactiveVar(false);

  instance.bufferNode = DrumApp.audioContext.createBufferSource();

  instance.onOffNode = DrumApp.audioContext.createGain();
  
  instance.bufferNode.connect(instance.onOffNode);
  instance.onOffNode.connect(DrumApp.audioContext.destination);

  instance.mute = new ReactiveVar(false);
  
  instance.togglePower = function(){
    instance.mute.set(!instance.mute.get());
  };

  instance.autorun(function(){
    if(instance.mute.get()){
      instance.onOffNode.gain.value = 0;
    } else {
      instance.onOffNode.gain.value = 1;
    }
  });

  instance.schedulePlay = function(destination, time, velocity){
    instance.bufferNode = destination.context.createBufferSource();

    var fadeNode = destination.context.createGain();

    instance.bufferNode.disconnect();
    instance.bufferNode.buffer = instance.sampleBuffer;
    instance.bufferNode.connect(fadeNode);
    fadeNode.connect(instance.highPassFilter.input());
    
    
    fadeNode.gain.setValueCurveAtTime(
      instance.sample().fadeCurve("in"),
      (time - instance.sample().fades.in.duration),
      Math.max(0.001, instance.sample().fades.in.duration)
    );

    fadeNode.gain.setValueCurveAtTime(
      instance.sample().fadeCurve("out"),
      (time + instance.sample().duration),
      Math.max(0.001, instance.sample().fades.out.duration)
    );

    instance.bufferNode.start((time - instance.sample().fades.in.duration));
  };

  var reactivelyControlFilters = function() {
    instance.HPF = new ReactiveDict();
    instance.LPF = new ReactiveDict();

    instance.autorun(function(){
      instance.HPF.set('frequency', instance.sample().filters.highPass.frequency);
      instance.HPF.set('slope', instance.sample().filters.highPass.slope);
      instance.LPF.set('frequency', instance.sample().filters.lowPass.frequency);
      instance.LPF.set('slope', instance.sample().filters.lowPass.slope);
    });

    instance.autorun(function(){
      instance.highPassFilter.setSlope(instance.HPF.get('slope'));
    });

    instance.autorun(function(){
      instance.highPassFilter.setFrequency(instance.HPF.get('frequency'));
    });

    instance.autorun(function(){
      instance.lowPassFilter.setSlope(instance.LPF.get('slope'));
    });

    instance.autorun(function(){
      instance.lowPassFilter.setFrequency(instance.LPF.get('frequency'));
    });
  };

  var initializeFilters = function() {
    instance.highPassFilter = new DrumApp.CustomFilter({context: DrumApp.audioContext, type: "highpass", bypassedFrequency: 0, frequency: instance.sample().filters.highPass.frequency, slope: instance.sample().filters.highPass.slope});
    instance.lowPassFilter = new DrumApp.CustomFilter({context: DrumApp.audioContext, type: "lowpass",  bypassedFrequency: 20000, frequency: instance.sample().filters.lowPass.frequency, slope: instance.sample().filters.highPass.slope});
    instance.highPassFilter.output().connect(instance.lowPassFilter.input());
    // instance.lowPassFilter.output().connect(DrumApp.audioContext.destination);
    instance.lowPassFilter.output().connect(instance.onOffNode);
  };

  instance.autorun(function() {
    //subscribe to this instance's Sample.
    instance.subscribe('sample', Template.currentData().sampleId, function() {

      if(instance.sample()){
        
        initializeFilters();
        reactivelyControlFilters();      

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
              instance.samplePromise = tape.slice(instance.sample().startTime - instance.sample().fades.in.duration, instance.sample().duration + instance.sample().fades.out.duration).render();
              
              instance.samplePromise.then(function(buffer) {
                instance.sampleBuffer = buffer;
                instance.sampleBufferLoaded.set(true);
              });
            });

          });

        });

      }

    });

  });
});