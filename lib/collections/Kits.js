Kit = function (doc) {
  _.extend(this, doc);
};

_.extend(Kit.prototype, {
  samples: function(){
    return Samples.find({_id: {$in: this.sampleIds}});
  }
});

Kits = new Mongo.Collection("kits", {
  transform: function (doc) {
    return new Kit(doc);
  }
});

Meteor.methods({
  'Kits/new' : function(opts){
    if(this.userId){
      var userId = this.userId;
      return Kits.insert(
        {
          creatorId: userId,
          sampleIds: []
        }
      );
    }
  }
});