Template._fileUploader.helpers({
  progress: function () {
    return Math.round(Template.instance().uploader.progress() * 100);
  }
});