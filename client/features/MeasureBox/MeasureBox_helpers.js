Template.MeasureBox.helpers({  
  'measureData' : function(){
    return {
      measure: Template.instance().measure(),
      handleUpdate: Template.instance().updateMeasure,
    }
  }
});