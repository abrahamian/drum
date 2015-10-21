Template._sound_samples.helpers({
  'samples' : function(){
    return Samples.find({soundId: Template.currentData().soundId});
  }
});