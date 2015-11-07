Template._user_drumMachines.onCreated(function(){
  var instance = this;
  instance.subscribe('user/drumMachines', Template.currentData().userId);
});