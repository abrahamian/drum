Template.DrumMachineBox.helpers({
  
  'drumMachine' : function(){
    return Template.instance().drumMachine();
  },

  'timeKeeperData' : function(){
    return {
      scheduleNotes: Template.instance().scheduleNotes,
      tempo: Template.instance().drumMachine().tempo,
      lookahead: 20.0,
      scheduleAheadTime: 0.30,
    }
  },

  'tempoSliderData' : function(){
    return {
      className: "tempo-slider",
      value: Template.instance().drumMachine().tempo,
      handleUpdate: Template.instance().updateTempo,
    }
  }

});