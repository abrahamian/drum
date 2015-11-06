Template._user_drumMachines.onCreated(function(){
  var instance = this;
  instance.subscribe('user/drumMachines', Template.currentData().userId);
});

Template._user_drumMachines.helpers({
  userDrumMachines: function(){
    return DrumMachines.find({creatorId: Template.instance().data.userId}).fetch();
  }
});

Template._user_drumMachines.events({

  'click ul.user-drum-machines li a.select-drum-machine' : function(event){
    event.preventDefault();
    var drumMachine = this;
    console.log(this);
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