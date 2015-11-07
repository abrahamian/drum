SoundSchema = new SimpleSchema({

  'name': {
    type: String,
    max: 200,
    defaultValue: 'New Sound'
  },

  'creatorId' : {
    type: String,
    denyUpdate: true,
    autoValue: function(){
      if(this.isInsert){
        return this.userId;
      }
    }
  }
    
});

Sound = function (doc) {
  _.extend(this, doc);
};

Sounds = new Mongo.Collection('sounds', {
  transform: function (doc) {
    return new Sound(doc);
  }
});

Sounds.attachSchema(SoundSchema, {transform: true});

Meteor.methods({
  'Sounds/new' : function(opts){
    if(this.userId){
      return Sounds.insert(opts);
    } else {
      throw new Meteor.Error("logged-out", "The user must be logged in to create a sound.");
    }
  }
});

Meteor.methods({
  'Sound/update' : function(soundId, args){
    if(this.userId && Sounds.findOne(soundId).creatorId == this.userId){
      Sounds.update(soundId, {$set: args});
    }
  }
});

Meteor.methods({
  'Sound/remove' : function(soundId){
    if(this.userId && Sounds.findOne(soundId).creatorId == this.userId) {
      return Sounds.remove(soundId);
    }
  }
});