// limitations in MVP: single drum machine, measure, kit.
// TODO add security/authorization checks on all publications

Meteor.publish("myDrumMachine", function(){
  var userId = this.userId;
  return DrumMachines.find({creatorId: userId },{limit: 1});
});


Meteor.publish("user/sounds", function(){
  var userId = this.userId;
  return Sounds.find({creatorId: userId});
});

Meteor.publish("sound/samples", function(soundId){
  //todo: work out why commentEd out code didn't work (couldn't locate sound even though sound was already created.)

  // console.log('publishing samples for sound with id ', soundId);
  // var sound = Sounds.findOne(soundId);
  // console.log(sound);
  // if(this.userId == sound.creatorId){
    return Samples.find({soundId: soundId});
  // } else {
    // this.ready();
  // }
});

Meteor.publish("kit", function(kitId){
  return Kits.find({_id: kitId});
});

Meteor.publish("sound", function(soundId){
  return Sounds.find({_id: soundId});
});

Meteor.publish("sample", function(sampleId){
  return Samples.find({_id: sampleId});
});

Meteor.publish("measure", function(measureId){
  return Measures.find({_id: measureId});
});