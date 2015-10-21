Template._sample_edit.onRendered(function() {
  var instance=this;

  instance.wavesurfer = Object.create(WaveSurfer);

  instance.wavesurfer.init({
    container: instance.find('.wave'),
    waveColor: 'black',
    progressColor: 'black',
    scrollParent: true,
    cursorWidth:0,
  });

  Template.currentData().soundPromise.then( function(tape) { 
    tape.render().then( function(buffer) {
      instance.wavesurfer.loadDecodedBuffer(buffer);
    });
  });

  instance.wavesurfer.on('ready', function() {
    instance.wavesurfer.enableDragSelection();

    var updateSample = function(sampleRegion) {
      console.log('calling Sample/update');
      Meteor.call(
        'Sample/update',
        instance.data.sample._id,
        {
          'startTime' : sampleRegion.start,
          'duration': sampleRegion.end - sampleRegion.start
        }
      );
    };

    var initializeSampleRegion = function() {
      instance.sampleRegion = instance.wavesurfer.addRegion({
        start: instance.sample().startTime, 
        end: instance.sample().startTime + instance.sample().duration,
        id: "sample-region",
        resize: true,
      });
      instance.sampleRegion.element.classList.add('sample');
    };

    var updateSampleRegion = function(sample) {
      instance.sampleRegion.update({
        start: sample.startTime,
        end: sample.startTime + sample.duration 
      });
    };

    var replaceSampleRegion = function(newRegion) {
      instance.sampleRegion.remove();
      instance.sampleRegion = newRegion;
      instance.sampleRegion.element.classList.add('sample');
    };

    initializeSampleRegion();

    instance.wavesurfer.on('region-created', function(newRegion) {
      console.log('replacing sample region');
      replaceSampleRegion(newRegion);
    });

    instance.wavesurfer.on('region-update-end', function(regionUpdated) {
      if(regionUpdated == instance.sampleRegion){
        updateSample(instance.sampleRegion);
      }
    });

    instance.autorun(function(){
      var dataContext = Template.currentData();
      updateSampleRegion(dataContext.sample);
    });

  });

});