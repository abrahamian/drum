Template._kit.events({

  'click li a.select-sample' : function(event, instance){
    event.preventDefault();
    var sampleId = this.toString(); //todo: avoid situations where we must convert a primitive to a string.
    Session.set('selectedSampleId', sampleId);
  },

  'click .remove-sample-from-kit' : function(event, instance){
    var kitId = Template.currentData().kitId;
    var sampleId = this.toString();

    //workaround while $addToSet and $pull modifiers are not supported by collection2 package.
    var sampleIds = _.without( Kits.findOne(kitId).sampleIds, sampleId );
    var modifiers = {
      $set : {
        sampleIds: sampleIds
      }
    };

    Meteor.call('Kit/update', kitId, modifiers);
  },

  'click .add-sample-to-kit' : function(event, instance){
    var kitId = Template.currentData().kitId;
    var sampleId = Template.instance().find('select').value;

    //workaround while $addToSet and $pull modifiers are not supported by collection2 package.
    var sampleIds = _.uniq( _.union(Kits.findOne(kitId).sampleIds, [sampleId]) );
    var modifiers = {
      $set : {
        sampleIds: sampleIds
      }
    };

    Meteor.call('Kit/update', kitId, modifiers);
  },

});