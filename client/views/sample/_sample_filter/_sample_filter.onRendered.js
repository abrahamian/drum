Template._sample_filter.onRendered(function() {
  var instance = this;

  instance.autorun(function() {
    var dataContext = Template.currentData();
    instance.find('input.frequency').value = dataContext.frequency/200;
    instance.find('select.slope').value = dataContext.slope;
  });
  
});