Template._sample_fade.onRendered(function() {
  var instance = this;

  instance.autorun(function() {
    var dataContext = Template.currentData();
    instance.find('select.shape').value = dataContext.shape;
  });
  
});