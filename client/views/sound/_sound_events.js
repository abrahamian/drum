Template._sound.events({
  'click .new-sample' : function(){
    var sound = this;

    Meteor.call(
      'Samples/new', 
      {soundId: sound._id}, 
      function(error, sampleId) {
        if (error) {
          // show a nice error message
          alert(error.reason)
        } else {
          Session.set('selectedSampleId', sampleId);  
        }
      }
    );
  },
});