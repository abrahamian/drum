Template._user_measures.onCreated(function(){
  var instance = this;
  instance.subscribe('user/measures', Template.currentData().userId);
});