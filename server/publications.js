Meteor.publish("user", function(userId){
  if (this.userId) {
    if(this.userId == userId){
      return Meteor.users.find({_id: userId});
    } else {
      return Meteor.users.find({_id: userId}, {fields: {'_id': 1} });
    }
  } else {
    this.ready();
  }

});