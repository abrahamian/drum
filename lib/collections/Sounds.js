Sounds = new Mongo.Collection('sounds');

Meteor.methods({
  'Sounds/new' : function(){
    if(this.userId){
      var userId = this.userId;
      Sounds.insert({creatorId: userId});
    }
  }
});