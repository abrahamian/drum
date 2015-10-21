Template._sample_edit.helpers({
  'sample' : function(){
    return Template.instance().sample();
  },
});

Template._sample_edit.onCreated(function() {
  var instance = this;
  
  instance.sample = function(){
    return Samples.findOne(instance.data.sample._id);
  }
});

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

});