_.extend(Sound.prototype, {  
  directUrl: function(){
    var baseUrl = "https://s3.amazonaws.com/drummy/users/"
    return baseUrl + this.creatorId + "/sounds/" + this.name;
  },

  requestTape: function(){
    return Ciseaux.from(this.directUrl());
  },
});