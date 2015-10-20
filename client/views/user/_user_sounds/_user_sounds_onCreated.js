Template._user_sounds.onCreated(function(){
  var instance = this;
  instance.subscribe('user/sounds', Template.currentData().userId);
});