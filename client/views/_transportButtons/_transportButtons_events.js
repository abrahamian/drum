Template._transportButtons.events({
  'click .play' : function(event, instance){
    instance.data.handlePlay();
  },

  'click .pause' : function(event, instance){
    instance.data.handlePause();
  },

  'click .stop' : function(event, instance){
    instance.data.handleStop();
  },
});