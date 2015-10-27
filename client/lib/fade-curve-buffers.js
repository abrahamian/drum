var FadeCurveBufferCreators = {

  custom: function(args){
    var controlPoints = args.controlPoints; //required
    
    var startValue = args.startValue //required
    var endValue = args.endValue //required
    var direction = ( startValue < endValue ) ? 1 : -1;

    var resolution = args.resolution || 100;

    //any way to remove dependency on p5? perhaps its internal bezierPoint function.
    var ppp = function (p) {  
      p.setup = function() {};
    };
    vvv = new p5(ppp); 

    var curve = new Float32Array(resolution+1);

    for (i = 0; i <= resolution; i++) {
      var index = direction > 0 ? (i) : (resolution - i);
      var t = index / resolution;
      var x = vvv.bezierPoint(0, controlPoints[0].x, controlPoints[1].x, 1, t);
      var y = vvv.bezierPoint(startValue, controlPoints[0].y, controlPoints[1].y, endValue, t);
      curve[index] = y;
    }

    return curve;
  },

  cosine: function(args) {
    var phase = Math.PI/2;
    
    var startValue = args.startValue //required
    var endValue = args.endValue //required
    var direction = ( startValue < endValue ) ? 1 : -1;

    var resolution = args.resolution || 100;
    var curve = new Float32Array(resolution+1);

    for (var i = 0; i <= resolution; i++) {
      var index = direction > 0 ? (i) : (resolution - i);
      curve[i] = (Math.sin((Math.PI * index / resolution) - phase)) /2 + 0.5;
    }

    return curve;
  },

  linear: function(args) {
    var startValue = args.startValue //required
    var endValue = args.endValue //required
    var direction = ( startValue < endValue ) ? 1 : -1;

    var resolution = args.resolution || 100;
    var curve = new Float32Array(resolution+1);
    
    for(var i=0; i<= resolution; i++){
      var index = direction > 0 ? (i) : (resolution - i);
      curve[i] = index/resolution;
    }

    return curve;
  },

  exponential: function(args) {
    var startValue = args.startValue //required
    var endValue = args.endValue //required
    var direction = ( startValue < endValue ) ? 1 : -1;

    var resolution = args.resolution || 100;
    var curve = new Float32Array(resolution+1);
    var factor = 2;
    
    for (var i = 0; i <= resolution; i++) {
      var index = direction > 0 ? (i) : (resolution - i);
      curve[i] = Math.pow( (index/resolution), factor);
    }

    return curve;
  },

  logarithmic: function(args) {
    var startValue = args.startValue //required
    var endValue = args.endValue //required
    var direction = ( startValue < endValue ) ? 1 : -1;

    var base = args.base || 10;
    var resolution = args.resolution || 100;
    var curve = new Float32Array(resolution+1);
    
    for (var i = 0; i <= resolution; i++) {
      var index = direction > 0 ? (i) : (resolution - i);
      var percent = index / resolution;
      curve[i] = Math.log(1 + base*percent) / Math.log(1 + base);
    }

    return curve;
  },
};

DrumApp.FadeCurveBufferCreators = FadeCurveBufferCreators;