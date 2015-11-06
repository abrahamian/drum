Template._user_measures.helpers({
  userMeasures: function(){
    return Measures.find({creatorId: Template.instance().data.userId}).fetch();
  }
});