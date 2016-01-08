Template.SamplesBox.onCreated(function () {
  var instance = this;
  var parentCollectionName = Template.currentData().parentCollectionName.toLowerCase();
  var subscriptionName = parentCollectionName + "/samples";
  var parentId = Template.currentData().parentId;
  console.log(subscriptionName, parentId);
  instance.subscribe(subscriptionName, parentId);

  instance.samples = function () {
    var filters = {};
    var foreignKey = Template.currentData().parentCollectionName.toLowerCase() + "Id";
    if (foreignKey == "userId") {
      foreignKey = "creatorId";
    }
    filters[foreignKey] = Template.currentData().parentId;
    console.log('in samples helpers. filters are:', filters);
    return Samples.find(filters);
  };

  instance.selectSample = function (sampleId) {
    FlowRouter.setQueryParams({ 'sample': sampleId });
  };

  instance.createNewSample = function () {
    console.log('sound id: !!! ', parentId);
    Meteor.call('Samples/new', { soundId: parentId }, function (error, sampleId) {
      if (error) {
        console.log(error);
      } else {
        instance.selectSample(sampleId);
      }
    });
  };

  instance.removeSample = function (sampleId) {
    Meteor.call('Sample/remove', sampleId);
  };

});