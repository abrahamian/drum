Template._soundsList.events({
  'click a.select-sound' : function(event, instance) {
    event.preventDefault();
    var soundId = this._id;
    instance.data.handleSelect(soundId);
  },

  'click .remove-sound' : function(event, instance) {
    event.preventDefault();
    var soundId = this._id;
    console.log('trying to remove sound', this);
    instance.data.handleRemove(soundId);
  }
});