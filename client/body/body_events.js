Template.body.events({

  'click button.new-drum-machine' : function(event, instance, c){
    Meteor.call(
      'DrumMachines/new',
      {},
      function(error, drumMachineId){
        console.log(drumMachineId);
      }
    );
  },
  
  'click button.new-kit' : function(event, instance, c){
    Meteor.call(
      'Kits/new',
      {},
      function(error, kitId){
        console.log(kitId);
      }

    );
  },

});