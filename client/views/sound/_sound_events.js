Template._sound.events({
  'click .new-sample' : function(){
    var sound = this;

    Meteor.call(
      'Samples/new', 
      {soundId: sound._id}, 
      function(error, sampleId) {
        Session.set('selectedSampleId', sampleId);
      }
    );
  },
});