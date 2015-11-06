Template._user_drumMachines.helpers({
  userDrumMachines: function(){
    return DrumMachines.find({creatorId: Template.instance().data.userId}).fetch();
  }
});