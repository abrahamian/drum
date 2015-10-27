var FadeCurveBufferCreators = {

  custom: function(direction, controlPoints, length){
    var length = 100;

    var ppp = function (p) {
      p.setup = function() {};
    };
    
    vvv = new p5(ppp);

    var cp1 = controlPoints[0];
    var cp2 = controlPoints[1];

    var curve = new Float32Array(length+1);

    for (i = 0; i <= length; i++) {

      var index = direction > 0 ? (i) : (length - i);

      var t = i / length;
      var x = vvv.bezierPoint(0, cp1.x, cp2.x, 100, t);
      var y = 100 - vvv.bezierPoint(100, cp1.y, cp2.y, 0, t);
      var yy = y/100;

      curve[index] = yy;
    }

    return curve;
  },

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