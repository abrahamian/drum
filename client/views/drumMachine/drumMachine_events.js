Template._drumMachine.events({
  'change .select-drumMachine-kit' : function(event, instance){
    var drumMachineId = Template.currentData().drumMachineId;
    var kitId = Template.instance().find('.select-drumMachine-kit').value;

    var modifiers = {
      kitId: kitId
    };

    Meteor.call('DrumMachine/update', drumMachineId, modifiers);
  },

  'change .select-drumMachine-measure' : function(event, instance){
    var drumMachineId = Template.currentData().drumMachineId;
    var measureId = Template.instance().find('.select-drumMachine-measure').value;

    var modifiers = {
      measureId: measureId
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