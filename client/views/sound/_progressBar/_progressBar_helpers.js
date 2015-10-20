Template._progressBar.helpers({  
  progress: function () {
    return Math.round(this.progress() * 100);
  }
});