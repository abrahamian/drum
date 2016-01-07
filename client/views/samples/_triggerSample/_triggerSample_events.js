Template._triggerSample.events({
  'schedule .trigger' : function(event, instance, data) {
    instance.data.handleTrigger(data.destination, data.time, data.velocity);
  },
});