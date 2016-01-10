Template.TimeKeeper.onCreated(function(){
  var instance = this;

  var audioContext = DrumApp.audioContext;
  var lookahead = Template.currentData().lookahead;
  var scheduleAheadTime = Template.currentData().scheduleAheadTime;
  var scheduleNotes = Template.currentData().scheduleNotes;
  var nextNoteTime = 0.0;

  instance.isPlaying = new ReactiveVar(false);

  var tempo = Template.currentData().tempo;
  var secondsPerBeat;
  var subdivision;

  instance.autorun(function(){
    tempo = Template.currentData().tempo;
    secondsPerBeat = 60.0 / tempo;
    subdivision = 0.25 * secondsPerBeat;
  });

  // ** COUNTER ** //

  var counter = new ReactiveDict();
  counter.set({beat: 0, tick: 0, t: 1});

  counter.increment = function() {
    if(this.get('t') >= 16) { 
      this.set({'t': 1});
    } else {
      this.set({'t': this.get('t')+1 });
    }
  };

  counter.reset = function() {
    this.set({'t': 1});
  };

  instance.autorun(function() {
    var ticky = counter.get('t') - 1;
    var beat = Math.floor(ticky/4);
    var tick = ticky % 4;
    counter.set({beat: beat, tick: tick});
  });
  
  // ** SCHEDULER ** //

  var nextNote = function() {
    nextNoteTime += subdivision;
    counter.increment();
  };

  var scheduler = function() {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
      scheduleNotes( nextNoteTime, counter.get('beat'), counter.get('tick'));
      nextNote();
    }
  };

  var metronomeWorker = new Worker("/metronomeworker.js");
  metronomeWorker.postMessage({"interval": lookahead});

  metronomeWorker.onmessage = function(e) {
    if (e.data == "tick") {
      scheduler();
    } else {
      console.log("message: " + e.data);
    }
  };

  // ** PUBLIC INTERFACE ** //

  instance.play = function() {
    if(! instance.isPlaying.get()) {
      nextNoteTime = audioContext.currentTime + subdivision;
      metronomeWorker.postMessage("start"); 
      instance.isPlaying.set(true);
    }
  };

  instance.pause = function() {
    metronomeWorker.postMessage("stop");
    instance.isPlaying.set(false);
  };

  instance.stop = function() {
    instance.pause();
    counter.reset();
  };

});