Template._sample_fade_curve.onRendered(function() {
  var instance = this;

  var curveCanvas = function (p) {

    var dataContext;
    var startValue;
    var endValue;
    var shape;
    var cp1;
    var cp2;
    var selectedPoint;

    instance.autorun(function(){
      dataContext= Template.currentData();
      startValue = dataContext.startValue;
      endValue = dataContext.endValue;
      shape = dataContext.shape;
      cp1 = {x: (dataContext.controlPoints[0].x)*p.width, y: p.height - (dataContext.controlPoints[0].y)*p.height};
      cp2 = {x: (dataContext.controlPoints[1].x)*p.width, y: p.height - (dataContext.controlPoints[1].y)*p.height};
    });

    p.setup = function () {
      p.createCanvas(100, 100);
      dataContext = instance.data;
      startValue = dataContext.startValue;
      endValue = dataContext.endValue;
      shape = instance.data.shape;
      cp1 = {x: (dataContext.controlPoints[0].x)*p.width, y: p.height - (dataContext.controlPoints[0].y)*p.height};
      cp2 = {x: (dataContext.controlPoints[1].x)*p.width, y: p.height - (dataContext.controlPoints[1].y)*p.height};
    };

    p.draw = function (a) {
      p.clear();
      p.noFill();
      p.strokeWeight(1);
      p.stroke(1);

      if(shape == "linear") {
        p.line(0, (p.height-(startValue*p.height)), p.width, (p.height - (endValue*p.height)));
      };

      if(shape=="cosine") {
        var phase = Math.PI/2;
        p.beginShape();

        if(startValue < endValue) {
          for (var i = 0; i <= p.width; i++) {
            var y = Math.sin((Math.PI * i / p.width) - phase) /2 + 0.5;
            p.curveVertex(i, p.height-(p.height*y));
          }
        } else {
          for (var i = endValue; i <= p.width; i++) {
            var index = p.width - i;
            var y = Math.sin((Math.PI * index / p.width) - phase) /2 + 0.5;
            p.curveVertex(index, (p.height*y));
          }
        };

        p.endShape();
      };

      if(shape =="logarithmic") {
        var base = base || 10;
        p.beginShape();
        if(startValue < endValue) {
          for (var i = startValue; i <= p.width; i++) {
            var percent = (i / p.width);
            var y = Math.log(1 + base*percent) / Math.log(1 + base);
            p.curveVertex(i, p.height-(p.height*y));
          }
        } else {
          for (var i = endValue; i <= p.width; i++) {
            var index = p.width - i;
            var percent = index / p.width;
            var y = Math.log(1 + base*percent) / Math.log(1 + base);
            p.curveVertex( index, (p.height*y) );
          }
        }
        p.endShape();
      };

      if( shape=="exponential" ) {
        var factor = factor || 2;
        p.beginShape();
        if(startValue < endValue ) {
          for (var i = startValue; i <= p.width; i++) {
            var y = Math.pow( (i/p.width), factor);
            p.curveVertex(i, p.height-(p.height*y));
          }
        } else {
          for (var i = endValue; i <= p.width; i++) {
            var index = p.width - i;
            var y = Math.pow( (index/p.width), factor);
            p.curveVertex( index, (p.height*y) );
          }
        }
        p.endShape();
      };

      if ( shape =="custom" ) {
        selectedPoint = selectedPoint || cp1;
        p.ellipse(selectedPoint.x, selectedPoint.y, 10, 10);
        p.stroke(255, 102, 0);
        p.line( 0, (p.height-startValue*p.height), cp1.x, cp1.y );
        p.line( p.width, (p.height - endValue*p.height), cp2.x, cp2.y );
        p.stroke(0, 0, 0);
        p.bezier( 0, (1- startValue)*p.height, cp1.x, cp1.y, cp2.x, cp2.y, p.width, (1 - endValue)*p.height );
      }
    };

    p.mouseMoved = function(){
      if(mouseIsWithinCanvasLimits() && shape == "custom" ) {
        p.cursor(p.CROSS);
        var distanceTo1 = distanceBetweenTwoPoints(cp1, {x:p.mouseX, y:p.mouseY});
        var distanceTo2 = distanceBetweenTwoPoints(cp2, {x:p.mouseX, y:p.mouseY})
        if(distanceTo1<distanceTo2) { selectedPoint = cp1; } else { selectedPoint = cp2; }
      }
    };

    p.mouseDragged = function(){
      if(mouseIsWithinCanvasLimits() && shape == "custom" ) {
        selectedPoint.x = Math.min( Math.max(p.mouseX, 0), p.width );
        selectedPoint.y = Math.min( Math.max(p.mouseY, 0), p.height );
      }
    };

    p.mouseReleased = function(){
      if(mouseIsWithinCanvasLimits() && shape == "custom" ) {
        selectedPoint.x = Math.min( Math.max(p.mouseX, 0), p.width );
        selectedPoint.y = Math.min( Math.max(p.mouseY, 0), p.height );

        var controlPoint1 = {x: (cp1.x /p.width), y: 1 - (cp1.y/p.height) };
        var controlPoint2 = {x: (cp2.x /p.width), y: 1 - (cp2.y/p.height) };
        // console.log(controlPoint1);
        // console.log(controlPoint2);
        instance.$('.curve-container').trigger('draw-curve', { controlPoints: [controlPoint1, controlPoint2] } );
      }
    };

    var mouseIsWithinCanvasLimits = function(){
      return p.mouseX>0 && p.mouseX<=p.width && p.mouseY>0 && p.mouseY<=p.height;
    };

    var distanceBetweenTwoPoints = function distanceBetweenTwoPoints(pointA, pointB) {
      return Math.sqrt( (( pointB.x- pointA.x ) * ( pointB.x- pointA.x )) + ((pointB.y - pointA.y) * (pointB.y - pointA.y)));
    };

  };

  var curveContainer = instance.find('.curve-container');
  new p5(curveCanvas, curveContainer);

});