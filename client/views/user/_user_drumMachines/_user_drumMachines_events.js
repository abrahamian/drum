Template._user_drumMachines.events({

  'click ul.user-drum-machines li a.select-drum-machine' : function(event){
    event.preventDefault();
    var drumMachine = this;
    FlowRouter.setQueryParams({'drumMachine': drumMachine._id});
  },

  'click button.new-drum-machine' : function(event, instance){
    Meteor.call(
      'DrumMachines/new',
      {},
      function(error, drumMachineId){
        FlowRouter.setQueryParams({'drumMachine': drumMachineId});
      }
    );
  },

  'click .remove-drum-machine' : function(event, instance){    
    var drumMachineId = this._id;
    Meteor.call('DrumMachine/remove', drumMachineId);
  },

});