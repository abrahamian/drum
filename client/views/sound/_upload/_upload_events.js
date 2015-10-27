Template._upload.events({
  'change input[type="file"]': function( event, template ) {
    var file = event.target.files[0];

    Template.instance().uploader.send(file, function (error, downloadUrl) {
      if (error) {
        // Log service detailed response.
        console.error('Error uploading', uploader.xhr.response);
        alert (error);
      }
      else {
        Meteor.call(
          'Sounds/new',
          {name: file.name},
          function(error, soundId){
            console.log(soundId);
          }
        );
      }
    });
  }
});