Template._fileUploader.events({
  'change input[type="file"]': function(event) {
    var file = event.target.files[0];
    var errorCallback = Template.currentData().error;
    var successCallback = Template.currentData().success;

    Template.instance().uploader.send(file, function(error, downloadUrl){
      if(error){
        errorCallback(error);
      } else {
        successCallback(file.name);
      }
    });
  }
});