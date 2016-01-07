Template._measure.events({
  
  'keyup .edit-in-place' : function(event, instance) {
    var measureId = Template.currentData().measure._id;
    var name = event.target.value;
    var modifiers = {
      name: name
    };

    Template.currentData().handleUpdate(modifiers);
  },

  'click .cell' : function(event, instance){
    var measure = Template.currentData().measure;
    var velocity = parseInt(event.target.dataset['velocity']);

    var newVelocity;
    if( velocity>2 ){ newVelocity=0; } else { newVelocity = velocity+1; };

    var cellIndex = event.target.dataset['index'];
    var tickIndex = event.target.closest('.tick').dataset['index'];
    var beatIndex = event.target.closest('.beat').dataset['index'];

    var modifiers = {};
    modifiers['beats.'+beatIndex+'.ticks.'+tickIndex+'.cells.'+cellIndex+'.velocity'] = newVelocity;
    
    Template.currentData().handleUpdate(modifiers);
  }

});