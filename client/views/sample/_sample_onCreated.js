Template._sample.onCreated(function() {
  var instance = this;
  instance.sample = function() {
    return Samples.findOne(instance.data);
  }
});