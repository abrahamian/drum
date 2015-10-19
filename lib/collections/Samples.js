Samples = new Mongo.Collection('samples');

Meteor.methods({
  'Samples/new' : function(){
    if(this.userId){
      var userId = this.userId;
      Samples.insert({creatorId: userId});
    }
  }
});