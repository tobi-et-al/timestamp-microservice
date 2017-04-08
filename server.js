var express = require('express');
var jquery = require('jquery');
var moment = require('moment');


var app = express();

function getStringDate(input) {
    var day = moment.unix(input);
    return day.format("MMMM DD, YYYY");
}
function getUnixTime(input) {
  
    var split = input.replace(",","").match(/(\w{0,})/g);
    var date  = moment({ year : split[4], month :0, day :split[2], h :0, m :0, s:0, ms:0 }).month(split[0]);
    date = moment.parseZone(date)
    console.log(split);
    console.log(split[2]);
    console.log(moment());
    console.log(date.unix());
    return date.unix();
}

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:id", function(request, response) {
    var input = (request.params.id).trim();
    input = decodeURI(input);
    var unix = null;
    var natural = null;
 
    if (/^(\d{1,})$/g.test(input)) {
        unix = input;
        natural = getStringDate(input);
     }else if(input.replace(",","").match(/(\w{0,})/g)){

        natural = input;
        unix = getUnixTime(input);
     }
    
    var val = { "unix": unix, "natural": natural };
    //console.log(val);

    response.send(val)
});

var listener = app.listen(process.env.PORT, function () {  
        console.log('Your app is listening on port ' + listener.address().port);
    });
