Sample = function (doc) {
  _.extend(this, doc);
};

_.extend(Sample.prototype, {
  sound: function(){
    return Sounds.findOne(this.soundId);
  },

  increaseStartTime: function(){
    Samples.update(this._id, {$inc: {startTime: 1}});
  }
});

Samples = new Mongo.Collection('samples', {
  transform: function (doc) {
    return new Sample(doc);
  }
});

Meteor.methods({
  'Samples/new' : function(opts) {
    if(this.userId){      
      check(opts.soundId, String);
      if(Sounds.findOne(opts.soundId)){
        opts.creatorId = this.userId;
        opts.name = opts.name || 'New sample';
        opts.startTime = opts.startTime || 0;
        opts.duration = opts.duration || Infinity;

        opts.fadeIn = opts.fadeIn || {duration: 0, shape: 'linear'};
        opts.fadeOut = opts.fadeIn || {duration: 0, shape: 'linear'};

        opts.highPassFilter = opts.highPassFilter || {frequency: 0, slope: 24};
        opts.lowPassFilter = opts.lowPassFilter || {frequency: 20000, slope: 24};
        return Samples.insert(opts);
      } else {
        throw new Meteor.Error("sound-not-found", "No sound found with id "+ opts.soundId);
      }
    } else {
      throw new Meteor.Error("logged-out", "The user must be logged in to create a sample.");
    }
  }
});

Meteor.methods({
  'Sample/update' : function(sampleId, args){
    if(this.userId && Samples.findOne(sampleId).creatorId == this.userId){
      Samples.update(sampleId, {$set: args});
    }
  }
});
