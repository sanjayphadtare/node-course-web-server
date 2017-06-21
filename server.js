const express = require("express");
const hbs = require("hbs");
const fs= require("fs");
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set("view engine", 'hbs');

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.path}`
  console.log (log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if (err){
      console.log ("Unable to append to server.log file.");
    }
  });
  next();
});

// app.use((req,res, next)=>{
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname +'/public'));

hbs.registerHelper('currentYear',()=>{
  return new Date().getFullYear() + 1 ;
});
hbs.registerHelper('scremIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res)=>{
  res.render('home.hbs',{
    pageTitle: 'Welcome To Home Page',
  homePara: 'Suppose there are N rectangular buildings in a 2-dimensional city and your computer program will compute the horizon of these buildings, eliminating hidden lines. His main purpose behind this is to view the buildings from a side and remove all sections that are not visible. '
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'AboutUs --- Page Title',
  });



});

app.get('/bad',(req, res)=>{
  res.send({errorMsg : 'Sorry not able to process this request.....'})
});
app.listen(3000, ()=>{
  console.log ("Server is up and running on port:3000");
});
