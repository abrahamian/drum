Template.DrumMachineBox.onCreated(function(){
  var instance = this;
  instance.subscribe('myDrumMachine');

  instance.drumMachine = function(){
    return DrumMachines.findOne();
  };

  instance.updateTempo = function(value){ 
    Meteor.call('DrumMachine/update', instance.drumMachine()._id, {tempo: value});
  };

  var audioContext = DrumApp.audioContext;

  var triggerCell = function(index, time, velocity) {
    $($('div.sample-slot')[index])
      .find('.trigger')
        .trigger(
          'schedule',
          {
            destination: audioContext.destination,
            time: time,
            velocity: velocity
          }
        );
  };

  instance.scheduleNotes = function(time, beat, tick) {
    _.each(
      instance.drumMachine().measure().beats[beat].ticks[tick].cells,
      function(cell, index) {
        if( cell.velocity>0 ){ triggerCell(index, time, cell.velocity); }
      }
    );
  };

});