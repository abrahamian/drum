_.extend(Sample.prototype, {
  fadeCurve: function(fadeName){
    return DrumApp.FadeCurveBufferCreators[this.fades[fadeName].shape](
            {
              startValue: this.fades[fadeName].startValue,
              endValue: this.fades[fadeName].endValue,
              controlPoints: this.fades[fadeName].controlPoints,
              resolution: 300
            }
    );
  }
});