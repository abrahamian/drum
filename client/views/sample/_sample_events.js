Template._sample.events({
  'click .trigger' : function(event, instance) {
    instance.trigger();
  },

  'input .filter' : function(event, instance) {
    var sampleId = instance.data.sampleId;
    var filterType = event.currentTarget.dataset.filterType;
    var frequency = event.target.value * 200;
    
    var modifiers = {};
    modifiers[filterType + 'Filter.frequency'] = frequency;
    
    Meteor.call(
      'Sample/update',
      sampleId,
      modifiers
    );

  }

});