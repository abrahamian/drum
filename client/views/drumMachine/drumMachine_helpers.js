Template._drumMachine.helpers({

  'drumMachine' : function(){
    return Template.instance().drumMachine();
  },

  //todo set top-level helpers for access to user's assets. 
  'userKits': function(){
    return Kits.find({creatorId: Meteor.userId()}).fetch();
  }

});