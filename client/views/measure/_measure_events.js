Template._measure.events({

  'keyup .edit-in-place' : function(event, instance) {
    var measureId = Template.currentData().measureId;
    var name = event.target.value;
    var modifiers = {
      name: name
    };

    Meteor.call('Measure/update', measureId, modifiers);

  }
  
});