Sample = function (doc) {
  _.extend(this, doc);
};

_.extend(Sample.prototype, {
  sound: function(){
    return Sounds.findOne(this.soundId);
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
        opts.startTime = opts.startTime || 1;
        opts.duration = opts.duration || 5;

        opts.fades = {
          "in": {
            duration: 1,
            shape: 'linear',
            duration: 1,
            startValue: 0,
            endValue: 1,
            controlPoints: [
              {
                x: 0,
                y: 1,
              },
              {
                x: 0,
                y: 1,
              }
            ],
          },

          "out": {
            duration: 1,
            shape: 'linear',
            duration: 1,
            startValue: 1,
            endValue: 0,
            controlPoints: [
              {
                x: 1,
                y: 1,
              },
              {
                x: 1,
                y: 1,
              }
            ],
          },
        };

        opts.filters = {
          "highPass" : {
            frequency: 0,
            slope: 24
          },

          "lowPass" : {
            frequency: 20000,
            slope: 24,
          }
        };

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
