var FadeCurveBufferCreators = {

  cosine: function(direction, phase, length) {
    var phase = phase || Math.PI/2;
    var length = length || 100;
    var curve = new Float32Array(length+1);

    for (var i = 0; i <= length; i++) {
      var index = direction > 0 ? (i) : (length - i);
      curve[i] = (Math.sin((Math.PI * index / length) - phase)) /2 + 0.5;
      // if(curve[i]==0){curve[i = 0.000001]} 
    }

    return curve;
  },

  linear: function(direction, length) {
    var length = length || 100;
    var curve = new Float32Array(length+1);
    
    for(var i=0; i<= length; i++){
      var index = direction > 0 ? (i) : (length - i);
      curve[i] = index/length;
      // if(curve[i]==0){curve[i = 0.000001]}
    }
    return curve;
  },

  exponential: function(direction, factor, length) {
    var factor = factor || 2;
    var length = length || 100;
    var curve = new Float32Array(length+1);
    
    for (var i = 0; i <= length; i++) {
      var index = direction > 0 ? (i) : (length - i);
      curve[i] = Math.pow( (index/length), factor);
      // if(curve[i]==0){curve[i = 0.000001]}
    }

    return curve;
  },

  logarithmic: function(direction, base, length) {
    var base = base || 10;
    var length = length || 100;
    var curve = new Float32Array(length+1);
    
    for (var i = 0; i <= length; i++) {
      var index = direction > 0 ? (i) : (length - i);
      var percent = index / length;
      curve[i] = Math.log(1 + base*percent) / Math.log(1 + base);
      // if(curve[i]==0){curve[i = 0.000001]}
    }
    return curve;
  },
};

DrumApp.FadeCurveBufferCreators = FadeCurveBufferCreators;