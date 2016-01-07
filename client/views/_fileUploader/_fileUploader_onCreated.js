Template._fileUploader.onCreated(function(){
  var instance = this;
  instance.uploader = new Slingshot.Upload(Template.currentData().slingshotDirective);
});