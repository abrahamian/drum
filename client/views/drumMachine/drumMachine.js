Template._drumMachine.onCreated(function(){

  var instance = this;

  instance.drumMachine = function() {
    return DrumMachines.findOne(instance.data.drumMachineId);
  };

  instance.subscribe('drumMachine', Template.currentData().drumMachineId, function(){});

});

Template._drumMachine.helpers({

  'drumMachine' : function(){
    return Template.instance().drumMachine();
  },

  //todo set top-level helpers for access to user's assets. 
  'userKits': function(){
    return Kits.find({creatorId: Meteor.userId()}).fetch();
  }

});

Template._drumMachine.events({
  'change .select-drumMachine-kit' : function(event, instance){
    var drumMachineId = Template.currentData().drumMachineId;
    var kitId = Template.instance().find('.select-drumMachine-kit').value;

    var modifiers = {
      kitId: kitId
    };

    Meteor.call('DrumMachine/update', drumMachineId, modifiers);
  },

  'keyup .edit-in-place' : function(event, instance){
    var drumMachineId = Template.currentData().drumMachineId;

    var name = event.target.value;
    var modifiers = {
      name: name
    };

    Meteor.call('DrumMachine/update', drumMachineId, modifiers);

  },

});