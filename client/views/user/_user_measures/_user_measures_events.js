Template._user_measures.events({

  'click ul.user-measures li a.select-measure' : function(event){
    event.preventDefault();
    var measure = this;
    FlowRouter.setQueryParams({'measure': measure._id});
  },

  'click button.new-measure' : function(event, instance){
    Meteor.call(
      'Measures/new',
      {},
      function(error, measureId){
        FlowRouter.setQueryParams({'measure': measureId});
      }
    );
  },

  'click .remove-measure' : function(event, instance){    
    var measureId = this._id;
    Meteor.call('Measure/remove', measureId);
  },

});