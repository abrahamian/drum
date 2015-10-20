Template._user_sounds.helpers({
  userSounds: function(){
    return Sounds.find({creatorId: Template.instance().data.userId}).fetch();
  }
});