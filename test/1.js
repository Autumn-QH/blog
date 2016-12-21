var app = require('express')();

app.get('/',function(req,res){
  res.send('300');
})
app.listen(3000,function(){
  console.log(app.locals);
  console.log('3--');
})