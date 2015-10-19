Template.body.events({

  'click button.new-drum-machine' : function(event, instance, c){
    Meteor.call('DrumMachines/new');
  }
  
});