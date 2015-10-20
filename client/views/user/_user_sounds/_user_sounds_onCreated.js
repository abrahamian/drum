Template._user_sounds.onCreated(function(){
  var instance = this;
  instance.subscribe('sounds', Template.currentData().userId);
});