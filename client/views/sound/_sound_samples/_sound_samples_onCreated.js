Template._sound_samples.onCreated(function(){
  var instance = this;
  instance.subscribe('sound/samples', Template.currentData().soundId);
});