Template.DrumMachineBox.helpers({
  
  'drumMachine' : function(){
    return Template.instance().drumMachine();
  },

  'transportData' : function(){
    return {
      playing: Template.instance().isPlaying.get(),
      handlePlay: Template.instance().play,
      handlePause: Template.instance().pause,
      handleStop: Template.instance().stop,
    }
  },

  'tempoSliderData' : function(){
    var drumMachine = Template.instance().drumMachine();
    return {
      className: "tempo-slider",
      value: Template.instance().drumMachine().tempo,
      handleUpdate: function(value){ 
        Meteor.call('DrumMachine/update', drumMachine._id, {tempo: value});
      }
    }
  }
});