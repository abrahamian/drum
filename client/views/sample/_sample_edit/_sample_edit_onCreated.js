Template._sample_edit.onCreated(function() {
  var instance = this;
  
  instance.sample = function(){
    return Samples.findOne(instance.data.sample._id);
  }

});