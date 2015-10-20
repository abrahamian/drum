Template.registerHelper('equals', function(a, b){
  return a == b;
});

Template.registerHelper('logMe', function(a){
  console.log(a);
});

Template.registerHelper('sessionVariable', function(a){
  return Session.get(a);
});