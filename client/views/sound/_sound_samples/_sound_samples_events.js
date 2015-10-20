Template._sound_samples.events({
  'click li a' : function(event){
    event.preventDefault();
    var sample = this;
    Session.set('selectedSampleId', sample._id);
  }
});