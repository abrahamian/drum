Template.user.onCreated(function() {

  var instance = this;

  instance.user = function(){
    return Meteor.users.findOne(instance.data.userId);
  }

  instance.subscribe('user', Template.currentData().userId);

});