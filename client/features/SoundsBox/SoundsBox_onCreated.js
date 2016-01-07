Template.SoundsBox.onCreated(function(){
  var instance = this;

  instance.subscribe( Template.currentData().subscriptionName );

  instance.sounds = function(){
    return Sounds.find();
  }

  instance.selectSound = function(soundId){
    FlowRouter.setQueryParams({'sound': soundId});
  }

  instance.removeSound = function(soundId){
    Meteor.call('Sound/remove', soundId);
  }

  instance.createNewSound = function(filename){
    Meteor.call(
      'Sounds/new',
      {name: filename},
      function(error, soundId){
        console.log(soundId);
      }
    );
  };
});