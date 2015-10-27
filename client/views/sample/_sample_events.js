Template._sample.events({
  'click .trigger' : function(event, instance) {
    instance.schedulePlay(DrumApp.audioContext.destination, 0, 3);
  },

  'input .filter' : function(event, instance) {
    
    var sampleId = instance.data.sampleId;
    var filterType = event.currentTarget.dataset.filterType;
    var modifiers = {};

    if(event.target.classList.contains('frequency')){
      var frequency = event.target.value * 200;
      modifiers['filters.' + filterType + '.frequency'] = frequency;  
    }

    if(event.target.classList.contains('slope')){
      var slope = event.target.value;
      modifiers['filters.' + filterType + '.slope'] = slope;
    }

    Meteor.call(
      'Sample/update',
      sampleId,
      modifiers
    );
  },

  'change .fade' : function(event, instance){
    var sampleId = instance.data.sampleId;
    var fadeType = event.currentTarget.dataset.fadeType;
    var modifiers = {};

    if(event.target.classList.contains('shape')){
      var shape = event.target.value;
    }

    modifiers["fades."+fadeType+".shape"] = shape;

    Meteor.call(
      'Sample/update',
      sampleId,
      modifiers
    );
  },

  'draw-curve .fade' : function(event, instance, options){
    var sampleId = instance.data.sampleId;
    var fadeType = event.currentTarget.dataset.fadeType;
    var modifiers = {};

    modifiers["fades."+fadeType+".controlPoints.0"] = options.controlPoints[0];
    modifiers["fades."+fadeType+".controlPoints.1"] = options.controlPoints[1];
    
    Meteor.call(
      'Sample/update',
      sampleId,
      modifiers
    );
  },


});