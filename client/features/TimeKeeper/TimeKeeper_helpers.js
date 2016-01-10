Template.TimeKeeper.helpers({
  'transportData' : function(){
    return {
      playing: Template.instance().isPlaying.get(),
      handlePlay: Template.instance().play,
      handlePause: Template.instance().pause,
      handleStop: Template.instance().stop,
    }
  }

});