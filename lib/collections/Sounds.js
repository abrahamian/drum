Sound = function (doc) {
  _.extend(this, doc);
};

Sounds = new Mongo.Collection('sounds', {
  transform: function (doc) {
    return new Sound(doc);
  }
});

Meteor.methods({
  'Sounds/new' : function(opts){
    check(opts.name, String);
    if(this.userId){
      opts.creatorId = this.userId;
      Sounds.insert(opts);
    } else {
      throw new Meteor.Error("logged-out", "The user must be logged in to create a sound.");
    }
  }
});