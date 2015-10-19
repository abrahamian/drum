DrumMachines = new Mongo.Collection("drum-machines");

Meteor.methods({  
  'DrumMachines/new' : function(){
    if(this.userId){
      var userId = this.userId;
      DrumMachines.insert({creatorId: userId});
    }
  }
});

// DrumMachines.after.insert(function (userId, doc) {
//   Roles.addUsersToRoles(userId, 'owner', doc._id);
// });