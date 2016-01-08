Template.SoundsBox.helpers({
  sounds: function() {
    return Template.instance().sounds;
  },

  selectSound: function(){
    return Template.instance().selectSound;
  },

  removeSound: function(){
    return Template.instance().removeSound;
  },

  soundsListData: function(){
    return {
      sounds: Template.instance().sounds,
      handleSelect: Template.instance().selectSound,
      handleRemove: Template.instance().removeSound,
    }
  },

  soundUploaderData: function() {
    return {
      title: "Upload New Sound",
      className: "new-sound",
      slingshotDirective: "uploadSound",
      success: Template.instance().createNewSound,
      error: function(error){
        console.log(error);
      }
    }
  }
});