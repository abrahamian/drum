KitSchema = new SimpleSchema({
  'name': {
    type: String,
    max: 200
  },

  'sampleIds' : {
    type: [String],
    maxCount: 3,
  },

  'creatorId': {
    type: String,
    denyUpdate: true
  }
});

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

Kits.attachSchema(KitSchema, {transform:true});

Meteor.methods({
  'Kits/new' : function(opts){
    if(this.userId){
      var userId = this.userId;
      return Kits.insert(
        {
          creatorId: userId,
          name: 'New kit',
          sampleIds: []
        }
      );
    }
  }
});

Meteor.methods({
  'Kit/update' : function(kitId, modifiers){
    if(this.userId && Kits.findOne(kitId).creatorId == this.userId){
      return Kits.update(
        kitId,
        modifiers
      );
    }
  }
});

Meteor.methods({
  'Kit/remove' : function(kitId) {
    if(this.userId && Kits.findOne(kitId).creatorId == this.userId){
      return Kits.remove(
        kitId
      );
    }
  }
});