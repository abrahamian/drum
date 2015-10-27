Template._kit.onCreated(function() {

  var instance = this;

  instance.kit = function() {
    return Kits.findOne(instance.data.kitId);
  };

  instance.subscribe('kit', Template.currentData().kitId, function(){});

});