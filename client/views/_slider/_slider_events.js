Template._slider.events({
  'change.fndtn.slider' : function(event, instance) {
    var newValue = parseInt($(event.target).attr('data-slider'));
    instance.data.handleUpdate(newValue);
  }
});