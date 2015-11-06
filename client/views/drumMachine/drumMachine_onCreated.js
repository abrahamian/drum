Template._drumMachine.onCreated(function(){

  var instance = this;

  instance.drumMachine = function() {
    return DrumMachines.findOne(instance.data.drumMachineId);
  };

  instance.subscribe('drumMachine', Template.currentData().drumMachineId, function(){});

});
