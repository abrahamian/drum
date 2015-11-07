MeasureSchema = new SimpleSchema({

  'name': {
    type: String,
    max: 200,
    defaultValue: 'New Measure'
  },

  'numberOfBeats' : {
    type: Number,
    decimal: false,
    min: 3,
    max: 4,
    defaultValue: 4,
  },

  'beats' : {
    type: Array,
    minCount: 3,
    maxCount: 4,
    defaultValue: [{},{},{},{}],
  },

  'beats.$' : {
    type: Object,
  },

  'beats.$.ticks' : {
    type: Array,
    defaultValue: [{},{},{},{}],
    minCount: 3,
    maxCount: 4,
  },

  'beats.$.ticks.$' : {
    type: Object,
  },

  'beats.$.ticks.$.cells' : {
    type: Array,
    defaultValue: [{},{},{}],
    maxCount: 3,
    minCount: 3,
  },

  'beats.$.ticks.$.cells.$' : {
    type: Object,
  },

  'beats.$.ticks.$.cells.$.velocity' : {
    type: Number,
    decimal: false,
    defaultValue: 0,
    allowedValues: [0,1,2,3],
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

Measure = function (doc) {
  _.extend(this, doc);
};

_.extend(Measure.prototype, {
});

Measures = new Mongo.Collection('Measures', {
  transform: function (doc) {
    return new Measure(doc);
  }
});

Measures.attachSchema(MeasureSchema, {transform: true});

Meteor.methods({
  'Measures/new' : function(opts){
    if(this.userId){
      Measures.insert(opts);
    }
  }
});

Meteor.methods({  
  'Measure/update' : function(measureId, args){
    if(this.userId &&  Measures.findOne(measureId).creatorId == this.userId ){
      return Measures.update(measureId, {$set: args});
    }
  }
});

Meteor.methods({
  'Measure/remove' : function(measureId){
    if(this.userId && Measures.findOne(measureId).creatorId == this.userId){
      Measures.remove(measureId);
    }
  }
});