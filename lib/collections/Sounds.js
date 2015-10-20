Sound = function (doc) {
  _.extend(this, doc);
};

_.extend(Sound.prototype, {
  directUrl: function(){
    var baseUrl = "https://s3.amazonaws.com/drummy/users/"
    return baseUrl + this.creatorId + "/sounds/" + this.name;
  },
});

Sounds = new Mongo.Collection('sounds', {
  transform: function (doc) {
    return new Sound(doc);
  }
});

Meteor.methods({
  'Sounds/new' : function(opts){
    if(this.userId){
      var userId = this.userId;
      opts.creatorId = userId;
      Sounds.insert(opts);
    }
  }
});