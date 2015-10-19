Kits = new Mongo.Collection("kits");

Meteor.methods({
  'Kits/new' : function(){
    if(this.userId){
      var userId = this.userId;
      Kits.insert({creatorId: userId});
    }
  }
});