Template._sound.events({
  'click .remove-sound' : function() {
    var soundId = this._id;
    Meteor.call('Sound/remove', soundId);
  },
});