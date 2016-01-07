Template._newSample.events({
  'click .new-sample' : function(event, instance) {
    event.preventDefault();
    instance.data.handleClick();
  }
});