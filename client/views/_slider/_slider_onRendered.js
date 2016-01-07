Template._slider.onRendered(function() {
  var instance = this;
  $(document).foundation();

  instance.autorun(function(){
    var dataContext = Template.currentData();
    instance.$('.range-slider').foundation('slider','set_value_without_triggering_change', dataContext.value);
  });
});