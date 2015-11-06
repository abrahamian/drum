Meteor.publish("user", function(userId){
  if (this.userId) {
    if(this.userId == userId){
      return Meteor.users.find({_id: userId});
    } else {
      return Meteor.users.find({_id: userId}, {fields: {'_id': 1} });
    }
  } else {
    this.ready();
  }
});

Meteor.publish("user/sounds", function(userId){
  if(this.userId == userId){
    return Sounds.find({creatorId: userId});
  } else {
    this.ready();
  }
});

Meteor.publish("user/kits", function(userId){
  if(this.userId == userId){
    return Kits.find({creatorId: userId});
  } else {
    this.ready();
  }
});

Meteor.publish("user/drumMachines", function(userId){
  if(this.userId == userId){
    return DrumMachines.find({creatorId: userId});
  } else {
    this.ready();
  }
});


Meteor.publish("sound/samples", function(soundId){
  var sound = Sounds.findOne(soundId);
  if(this.userId == sound.creatorId){
    return Samples.find({soundId: soundId, creatorId: this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish("drumMachine", function(drumMachineId){
    // TODO add security/authorization checks
  return DrumMachines.find({_id: drumMachineId});
});

Meteor.publish("kit", function(kitId){
    // TODO add security/authorization checks
  return Kits.find({_id: kitId});
});

Meteor.publish("sound", function(soundId){
    // TODO add security/authorization checks
  return Sounds.find({_id: soundId});
});

Meteor.publish("sample", function(sampleId){
    // TODO add security/authorization checks
  return Samples.find({_id: sampleId});
});