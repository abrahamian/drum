Template._user_kits.onCreated(function(){
  var instance = this;
  instance.subscribe('user/kits', Template.currentData().userId);
});