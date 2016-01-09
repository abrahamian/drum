Template.SampleSlot.onCreated(function(){
  var instance = this;

  instance.sampleLoaded = new ReactiveVar(false);  

  instance.selectSample = function() {
    FlowRouter.setQueryParams({ 'sample': instance.data.sampleId });
  };

  instance.sample = function(){
    return Samples.findOne(instance.data.sampleId);
  };

  instance.setBuffer= function(buffer){
    instance.sampleBuffer = buffer;
    instance.sampleLoaded.set(true);
  };

  instance.mute = new ReactiveVar(false);
  instance.onOffNode = DrumApp.audioContext.createGain();
  instance.onOffNode.connect(DrumApp.audioContext.destination);

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
    // console.log(instance);
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
    instance.lowPassFilter.output().connect(instance.onOffNode);
  };

  instance.autorun(function() {
    //subscribe to this instance's Sample.
    instance.subscribe('sample', Template.currentData().sampleId, function(){

      if(instance.sample()){
        initializeFilters();
        reactivelyControlFilters();
      };

      instance.autorun(function(){
        instance.sample();
        instance.sampleLoaded.set(false);
      });

    });
  });
});