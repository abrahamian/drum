Template._sample_fade_curve.onRendered(function() {

  var instance = this;

  var dataContext = Template.currentData();
  var curve = DrumApp.FadeCurveBufferCreators[dataContext.shape](
    {
      startValue: dataContext.startValue,
      endValue: dataContext.endValue,
      controlPoints: dataContext.controlPoints,
    }
  );

  instance.autorun(function(){
    dataContext= Template.currentData();
    instance.find('select.shape').value = dataContext.shape;
    curve = DrumApp.FadeCurveBufferCreators[dataContext.shape](
      {
        startValue: dataContext.startValue,
        endValue: dataContext.endValue,
        controlPoints: dataContext.controlPoints,
        resolution: instance.find('.curve-container').width,
      }
    );
  });

  var curveCanvas = function (p) {
    var selectedPoint;
    var cp1;
    var cp2;

    p.setup = function () {
      p.createCanvas(100, 100);
      cp1 = {x: (dataContext.controlPoints[0].x)*p.width, y: p.height - (dataContext.controlPoints[0].y)*p.height };
      cp2 = {x: (dataContext.controlPoints[1].x)*p.width, y:  p.height - (dataContext.controlPoints[1].y)*p.height };
    };

    p.draw = function (a) {
      p.clear();
      p.noFill();
      p.strokeWeight(1);
      p.stroke(1);

      var startValue = dataContext.startValue;
      var endValue = dataContext.endValue;

      if ( dataContext.shape =="custom" ) {
        selectedPoint = selectedPoint || cp1;
        p.ellipse(selectedPoint.x, selectedPoint.y, 10, 10);
        p.stroke(255, 102, 0);
        p.line( 0, (p.height-startValue*p.height), cp1.x, cp1.y );
        p.line( p.width, (p.height - endValue*p.height), cp2.x, cp2.y );
        p.stroke(0, 0, 0);
        p.bezier( 0, (1- startValue)*p.height, cp1.x, cp1.y, cp2.x, cp2.y, p.width, (1 - endValue)*p.height );
      } else {
        p.beginShape();
        for (var i = startValue; i <= p.width; i++) {
          p.curveVertex(i, p.height - (curve[i] * p.height));
        }
        p.endShape();
      }

    };

    p.mouseMoved = function(){
      if(mouseIsWithinCanvasLimits() && dataContext.shape == "custom" ) {
        p.cursor(p.CROSS);
        var distanceTo1 = distanceBetweenTwoPoints(cp1, {x:p.mouseX, y:p.mouseY});
        var distanceTo2 = distanceBetweenTwoPoints(cp2, {x:p.mouseX, y:p.mouseY})
        if(distanceTo1<distanceTo2) { selectedPoint = cp1; } else { selectedPoint = cp2; }
      }
    };

    p.mouseDragged = function(){
      if(mouseIsWithinCanvasLimits() && dataContext.shape == "custom" ) {
        selectedPoint.x = Math.min( Math.max(p.mouseX, 0), p.width );
        selectedPoint.y = Math.min( Math.max(p.mouseY, 0), p.height );
      }
    };

    p.mouseReleased = function(){
      if(mouseIsWithinCanvasLimits() && dataContext.shape == "custom" ) {
        selectedPoint.x = Math.min( Math.max(p.mouseX, 0), p.width );
        selectedPoint.y = Math.min( Math.max(p.mouseY, 0), p.height );

        var controlPoint1 = {x: (cp1.x /p.width), y: 1 - (cp1.y/p.height) };
        var controlPoint2 = {x: (cp2.x /p.width), y: 1 - (cp2.y/p.height) };
        instance.$('.curve-container').trigger(
          'draw-curve', 
          { 
            controlPoints: [controlPoint1, controlPoint2]
          }
        );
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