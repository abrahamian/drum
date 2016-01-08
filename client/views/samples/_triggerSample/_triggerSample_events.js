Template._triggerSample.events({
  'schedule .trigger' : function(event, instance, data) {
    instance.data.handleTrigger(data.destination, data.time, data.velocity);
  },

  'click' : function(event, instance){
    instance.data.handleTrigger(DrumApp.audioContext.destination, DrumApp.audioContext.currentTime, 3);
  }

});