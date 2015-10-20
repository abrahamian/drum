Samples = new Mongo.Collection('samples');

Meteor.methods({
  'Samples/new' : function(opts){
    if(this.userId){
      opts.creatorId = this.userId;
      return Samples.insert(opts);
    }
  }
});