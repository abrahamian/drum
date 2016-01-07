Template._samplesList.events({
  'click .select-sample' : function(event, instance) {
    event.preventDefault();
    var sampleId = this._id;
    instance.data.handleSelect(sampleId);
  },

  'click .remove-sample' : function(event, instance) {
    event.preventDefault();
    var sampleId = this._id;
    instance.data.handleRemove(sampleId);
  }
});