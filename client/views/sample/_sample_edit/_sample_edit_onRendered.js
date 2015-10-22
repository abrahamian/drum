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

    var initializeSampleRegion = function() {
      instance.sampleRegion = instance.wavesurfer.addRegion({
        start: instance.sample().startTime, 
        end: instance.sample().startTime + instance.sample().duration,
        id: "sample-region",
        resize: true,
      });
      instance.sampleRegion.element.classList.add('sample');

      instance.sampleRegion.duration = function(){
        return this.end - this.start;
      }
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

      instance.sampleRegion.duration = function(){
        return this.end - this.start;
      };
    };

    var initializeFadeInRegion = function(){
      instance.fadeInRegion = instance.wavesurfer.addRegion({
        start: instance.sample().startTime - instance.sample().fadeIn.duration,
        end: instance.sample().startTime,
        drag: false,
        resize: true,
        id: "fade-in-region",
        color: "rgba(255, 192, 203,0.5)"        
      });

      instance.fadeInRegion.duration = function(){
        return this.end - this.start;
      };

      instance.fadeInRegion.element.classList.add('fade');
      instance.fadeInRegion.element.classList.add('fade-in');

    };

    var initializeFadeOutRegion = function(){
      instance.fadeOutRegion = instance.wavesurfer.addRegion({
        start: instance.sample().startTime + instance.sample().duration,
        end: instance.sample().startTime + instance.sample().duration + instance.sample().fadeOut.duration,
        drag: false,
        resize: true,
        id: "fade-out-region",
        color: "rgba(255, 192, 203,0.5)"        
      });

      instance.fadeOutRegion.duration = function(){
        return this.end - this.start;
      };

      instance.fadeInRegion.element.classList.add('fade');
      instance.fadeOutRegion.element.classList.add('fade-out');
    };

    var updateBothFadeRegionsWithSampleRegionData = function() {
      instance.fadeInRegion.update({
        start: instance.sampleRegion.start - instance.fadeInRegion.duration(),
        end: instance.sampleRegion.start
      });

      instance.fadeOutRegion.update({
        start: instance.sampleRegion.end,
        end: instance.sampleRegion.end + instance.fadeOutRegion.duration(),
      });
    };

    var updateBothFadeRegionsWithSampleData = function(){
      instance.fadeInRegion.update({
        start: instance.sample().startTime - instance.sample().fadeIn.duration,
        end: instance.sample().startTime
      });

      instance.fadeOutRegion.update({
        start: instance.sample().startTime + instance.sample().duration,
        end: instance.sample().startTime + instance.sample().duration + instance.sample().fadeOut.duration
      });
    }

    var updateSampleFromRegions = function() {
      Meteor.call(
        'Sample/update',
        instance.data.sample._id,
        {
          'startTime' : instance.sampleRegion.start,
          'duration': instance.sampleRegion.end - instance.sampleRegion.start,
          'fadeIn.duration' : (instance.fadeInRegion.end - instance.fadeInRegion.start),
          'fadeOut.duration' : (instance.fadeOutRegion.end - instance.fadeOutRegion.start)
        }
      );
    };

    initializeSampleRegion();
    initializeFadeInRegion();
    initializeFadeOutRegion();

    instance.wavesurfer.on('region-created', function(newRegion) {
      replaceSampleRegion(newRegion);
    });

    instance.wavesurfer.on('region-update-end', function(regionUpdated) {
      updateSampleFromRegions();
    });

    instance.wavesurfer.on('region-updated', function(region){
      if( region == instance.sampleRegion ) {
        updateBothFadeRegionsWithSampleData();
        updateBothFadeRegionsWithSampleRegionData();
      }
    });

    instance.autorun(function(){
      var sampleData = Template.currentData().sample;
      updateSampleRegion(sampleData);
    });

  });

});