Measures = new Mongo.Collection("measures");

Meteor.methods({
  'Measures/new' : function(){
    if(this.userId){
      var userId = this.userId;
      Measures.insert({creatorId: userId});
    }
  }
});