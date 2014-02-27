var lat;
var long;

if (navigator.geolocation)  {
   navigator.geolocation.getCurrentPosition(Start);
}
function Start(location)
{
 var lat = location.coords.latitude;
 var long = location.coords.longitude;
 var color = document.getElementById("GiveOpinion");
   color.innerHTML += '<form name="input" action="rwb.pl?" method="get">'+
                        '<input type="hidden" name="longitude" value='+ long+'>'+
                        '<input type="hidden" name="latitude" value='+ lat+ '>'+
                        '<input type="hidden" name="run" value="1" />'+
                        '<input type="hidden" name="act" value="give-opinion-data" />'+
                        '<input type="textfield" name="color">'+
                        '<input type="submit" value="Submit">'+
                        '</form>';
}
