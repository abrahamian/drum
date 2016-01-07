SimpleSchema.messages({"noSuchSample": "No such sample!"});

KitSchema = new SimpleSchema({

  'name': {
    type: String,
    max: 200,
    defaultValue: 'New Kit'
  },

  'sampleIds' : {
    type: [String],
    maxCount: 3,
    defaultValue: [],
    custom: function(){
    }
  },

  'samplesIds.$' : {
    type: String,
  },

  'creatorId': {
    type: String,
    denyUpdate: true,
    autoValue: function(){
      if(this.isInsert){
        return this.userId;
      }
    }
  },

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
      return Kits.insert(opts);
    }
  }
});

Meteor.methods({
  'Kit/update' : function(kitId, args){
    if(this.userId && Kits.findOne(kitId).creatorId == this.userId){
      return Kits.update(
        kitId,
        {$set: args}
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