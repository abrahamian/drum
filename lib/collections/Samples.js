SimpleSchema.messages({"noSuchSound": "No such sound!"});

SampleSchema = new SimpleSchema({

  'name': {
    type: String,
    max: 200,
    defaultValue: 'New Sample'
  },

  'soundId' : {
    type: String,
    custom: function(){
      var soundId = this.value;
      if(!Sounds.findOne(soundId)){
        return "noSuchSound";
      }
    }
  },

  'startTime' : {
    type: Number,
    decimal: true,
    min: 0,
    defaultValue: 1
  },

  'duration' : {
    type: Number,
    decimal: true,
    min: 0,
    defaultValue: 5
  },

  'fades' : {
    type: Object,
  },

  'fades.in' : {
    type: Object
  },

  'fades.in.duration' : {
    type: Number,
    decimal: true,
    defaultValue: 1
  },

  'fades.in.shape' : {
    type: String,
    defaultValue: 'cosine',
    allowedValues: ['custom', 'linear', 'exponential', 'logarithmic', 'cosine']
  },

  'fades.in.startValue' : {
    type: Number,
    decimal: true,
    defaultValue: 0
  },

  'fades.in.endValue' : {
    type: Number,
    decimal: true,
    defaultValue: 1
  },

  'fades.in.controlPoints' : {
    type: Array,
    maxCount: 2,
    minCount: 2,
    defaultValue: [{},{}],
  },

  'fades.in.controlPoints.$' : {
    type: Object,
  },

  'fades.in.controlPoints.$.x' : {
    type: Number,
    decimal: true,
    defaultValue: 0
  },

  'fades.in.controlPoints.$.y' : {
    type: Number,
    decimal: true,
    defaultValue: 1  
  },

  'fades.out' : {
    type: Object
  },

  'fades.out.duration' : {
    type: Number,
    decimal: true,
    defaultValue: 1
  },

  'fades.out.shape' : {
    type: String,
    defaultValue: 'cosine',
    allowedValues: ['custom', 'linear', 'exponential', 'logarithmic', 'cosine']
  },

  'fades.out.startValue' : {
    type: Number,
    decimal: true,
    defaultValue: 1
  },

  'fades.out.endValue' : {
    type: Number,
    decimal: true,
    defaultValue: 0
  },

  'fades.out.controlPoints' : {
    type: Array,
    maxCount: 2,
    minCount: 2,
    defaultValue: [{},{}],
  },

  'fades.out.controlPoints.$' : {
    type: Object,
  },

  'fades.out.controlPoints.$.x' : {
    type: Number,
    decimal: true,
    defaultValue: 1
  },

  'fades.out.controlPoints.$.y' : {
    type: Number,
    decimal: true,
    defaultValue: 1  
  },

  'filters' : {
    type: Object,
  },

  'filters.highPass' : {
    type: Object,
  },

  'filters.highPass.frequency' : {
    type: Number,
    decimal: true,
    max: 20000,
    min: 0,
    defaultValue: 0,
  },

  'filters.highPass.slope' : {
    type: Number,
    decimal: false,
    min: 12,
    max: 48,
    defaultValue: 24,
    allowedValues: [12, 24, 36, 48]
  },

  'filters.lowPass' : {
    type: Object,
  },

  'filters.lowPass.frequency' : {
    type: Number,
    decimal: true,
    max: 20000,
    min: 0,
    defaultValue: 20000,
  },

  'filters.lowPass.slope' : {
    type: Number,
    decimal: false,
    max: 48,
    min: 12,
    defaultValue: 24,
    allowedValues: [12, 24, 36, 48]
  },

  'creatorId': {
    type: String,
    denyUpdate: true,
    autoValue: function(){
      if(this.isInsert){
        return this.userId;
      }
    }
  }

});

Sample = function (doc) {
  _.extend(this, doc);
};

_.extend(Sample.prototype, {

  sound: function(){
    return Sounds.findOne(this.soundId);
  },

  orphan: function(){
    // if( this.sound() ){ return false; } else { return true; }

    return !!!this.sound();
  },

});

Samples = new Mongo.Collection('samples', {
  transform: function (doc) {
    return new Sample(doc);
  }
});

Samples.attachSchema(SampleSchema, {transform: true});

Meteor.methods({
  'Samples/new' : function(opts) {
    if(this.userId){
      return Samples.insert(opts);
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

Meteor.methods({
  'Sample/remove' : function(sampleId){
    if(this.userId && Samples.findOne(sampleId).creatorId == this.userId){
      Samples.remove(sampleId);
    }
  }
});