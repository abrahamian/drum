Template._sound_samples.events({

  'click .new-sample' : function(){
    var soundId = this.soundId;
    console.log(this);

    Meteor.call(
      'Samples/new', 
      {soundId: soundId}, 
      function(error, sampleId) {
        if (error) {
          // show a nice error message
          alert(error.reason)
        } else {
          FlowRouter.setQueryParams({'sample': sampleId});
        }
      }
    );
  },

  'click li a' : function(event){
    event.preventDefault();
    var sample = this;
    FlowRouter.setQueryParams({'sample': sample._id});
  },

  'click .remove-sample' : function(event, instance){    
    var sampleId = this._id;
    Meteor.call('Sample/remove', sampleId);
  }

});