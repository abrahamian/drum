Template._user_kits.helpers({
  userKits: function(){
    return Kits.find({creatorId: Template.instance().data.userId}).fetch();
  }
});