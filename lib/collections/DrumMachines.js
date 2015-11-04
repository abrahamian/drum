DrumMachineSchema = new SimpleSchema({

  'name': {
    type: String,
    max: 200,
    defaultValue: 'New Drum Machine'
  },

  'measureId' : {
    type: String,
    defaultValue: 'fictionalMeasureId'
  },

  'kitId' : {
    type: String,
    defaultValue: 'fictionalKitId'
  },

  'tempo' : {
    type: Number,
    decimal: false,
    min: 20,
    max: 200,
    defaultValue: 90,
  },

  'collaboratorIds' : {
    type: Array,
    defaultValue: [],
  },

  'collaboratorIds.$' : {
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
  }

});

DrumMachine = function (doc) {
  _.extend(this, doc);
};

_.extend(DrumMachine.prototype, {
  measure: function(){},
  kit: function(){},
  collaborators: function(){}
});

DrumMachines = new Mongo.Collection("drum-machines", {
  transform: function(doc) {
    return new DrumMachine(doc);
  }
});

DrumMachines.attachSchema(DrumMachineSchema, {transform:true});

Meteor.methods({  
  'DrumMachines/new' : function(opts){
    if(this.userId){
      return DrumMachines.insert(opts);
    }
  }
});

Meteor.methods({  
  'DrumMachine/update' : function(drumMachineId, args){
    console.log(drumMachineId, args);
    if(this.userId &&  DrumMachines.findOne(drumMachineId).creatorId == this.userId ){
      return DrumMachines.update(drumMachineId, {$set: args});
    }
  }
});

Meteor.methods({
  'DrumMachine/remove' : function(drumMachineId){
    if(this.userId && DrumMachines.findOne(drumMachineId).creatorId == this.userId){
      DrumMachines.remove(drumMachineId);
    }
  }
});