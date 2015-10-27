Template._kit.events({

  'click li a.select-sample' : function(event, instance){
    event.preventDefault();
    var sampleId = this.toString(); //todo: avoid situations where we must convert a primitive to a string.
    Session.set('selectedSampleId', sampleId);
  },

  'click .remove-sample-from-kit' : function(event, instance){
    var kitId = Template.currentData().kitId;
    var sampleId = this.toString();

    var modifiers = {
      $pull : {
        sampleIds: sampleId,
      }
    };

    Meteor.call('Kit/update', kitId, modifiers);
  },

  'click .add-sample-to-kit' : function(event, instance){
    var kitId = Template.currentData().kitId;
    var sampleId = Template.instance().find('select').value;

    var modifiers = {
      $push : {
        sampleIds: sampleId,
      }
    };

    Meteor.call('Kit/update', kitId, modifiers);
  },

});