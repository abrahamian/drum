Template._sound_samples.helpers({
  'samples' : function(){
    console.log(Template.currentData());
    return Samples.find({soundId: Template.currentData().soundId});
  }
});