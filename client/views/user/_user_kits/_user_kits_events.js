Template._user_kits.events({

  'click ul.user-kits li a.select-kit' : function(event){
    event.preventDefault();
    var kit = this;
    FlowRouter.setQueryParams({'kit': kit._id});
  },

  'click button.new-kit' : function(event, instance){
    Meteor.call(
      'Kits/new',
      {},
      function(error, kitId){
        FlowRouter.setQueryParams({'kit': kitId});
      }
    );
  },

  'click .remove-kit' : function(event, instance){    
    var kitId = this._id;
    Meteor.call('Kit/remove', kitId);
  },

});