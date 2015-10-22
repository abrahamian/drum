Template._sample.events({
  'click .trigger' : function(event, instance) {
    instance.trigger();
  },

  'input .filter' : function(event, instance) {
    
    var sampleId = instance.data.sampleId;
    var filterType = event.currentTarget.dataset.filterType;
    var modifiers = {};

    if(event.target.classList.contains('frequency')){
      var frequency = event.target.value * 200;
      modifiers[filterType + 'Filter.frequency'] = frequency;  
    }

    if(event.target.classList.contains('slope')){
      var slope = event.target.value;
      modifiers[filterType + 'Filter.slope'] = slope;
    }

    Meteor.call(
      'Sample/update',
      sampleId,
      modifiers
    );
  }
});