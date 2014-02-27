//
// Global state
//
// map     - the map object
// usermark- marks the user's position on the map
// markers - list of markers on the current map (not including the user position)
// 
//

//
// First time run: request current location, with callback to Start
//
$("document").ready(function() {
  var committee = document.getElementById("committee");
  var candidate = document.getElementById("candidate");
  var individual = document.getElementById("individual");
  var opinions = document.getElementById("opinions");
})
if (navigator.geolocation)  {
  navigator.geolocation.getCurrentPosition(Start);
}


function UpdateMapById(id, tag) {

  var target = document.getElementById(id);
  var data = target.innerHTML;

  var rows  = data.split("\n");

  for (i in rows) {
   var cols = rows[i].split("\t");
   var lat = cols[0];
   var long = cols[1];

   markers.push(new google.maps.Marker({ map:map,
    position: new google.maps.LatLng(lat,long),
    title: tag+"\n"+cols.join("\n")}));
 }
}

function ClearMarkers()
{
    // clear the markers
    while (markers.length>0) { 
     markers.pop().setMap(null);
   }
 }


 function UpdateMap()
 {
  var color = document.getElementById("color");

  color.innerHTML="<b><blink>Updating Display...</blink></b>";
  color.style.backgroundColor='white';

  ClearMarkers();

  if (committee.checked)
  {
    UpdateMapById("committee_data","COMMITTEE");
  }
  if (candidate.checked)
  {
    UpdateMapById("candidate_data","CANDIDATE");
  }
  if (individual.checked)
  {
    UpdateMapById("individual_data", "INDIVIDUAL");
  }
  if (opinions.checked)
  {
    UpdateMapById("opinion_data","OPINION");
  }

  color.innerHTML="Ready";

  if (Math.random()>0.5) { 
    color.style.backgroundColor='blue';
  } else {
    color.style.backgroundColor='red';
  }

}

function NewData(data)
{
  var target = document.getElementById("data");
  
  target.innerHTML = data;

  UpdateMap();

}

function NewSum(data)
{
  var target = document.getElementById("sum");
  
  target.innerHTML = data;
}

function ViewShift()
{
  var bounds = map.getBounds();

  var ne = bounds.getNorthEast();
  var sw = bounds.getSouthWest();

  var color = document.getElementById("color");

  color.innerHTML="<b><blink>Querying...("+ne.lat()+","+ne.lng()+") to ("+sw.lat()+","+sw.lng()+")</blink></b>";
  color.style.backgroundColor='white';

  var datachoice="";
  var cycles="";
  if (committee.checked)
  {
    datachoice=datachoice+"committees,";
  }
  if (candidate.checked)
  {
    datachoice=datachoice+"candidates,";
  }
  if (individual.checked)
  {
    datachoice=datachoice+"individuals,";
  }
  if (opinions.checked)
  {
    datachoice=datachoice+"opinions,";
  }

  cycles=$(".cycles");
  var cyclesChecked="";
  for (var i=0; i<cycles.length; i++)
  {
    if(cycles[i].checked)
    {
      cyclesChecked=cyclesChecked+cycles[i].id+",";
    }
  }

    // debug status flows through by cookie

    $.get("rwb.pl?act=sum&latne="+ne.lat()+"&longne="+ne.lng()+"&latsw="+sw.lat()+"&longsw="+sw.lng()+"&format=raw&what="+datachoice+"&cycle="+cyclesChecked, NewSum);
    $.get("rwb.pl?act=near&latne="+ne.lat()+"&longne="+ne.lng()+"&latsw="+sw.lat()+"&longsw="+sw.lng()+"&format=raw&what="+datachoice+"&cycle="+cyclesChecked, NewData);
  }


  function Reposition(pos)
  {
    var lat=pos.coords.latitude;
    var long=pos.coords.longitude;

    map.setCenter(new google.maps.LatLng(lat,long));
    usermark.setPosition(new google.maps.LatLng(lat,long));
  }


  function Start(location) 
  {
    var lat = location.coords.latitude;
    var long = location.coords.longitude;
    var acc = location.coords.accuracy;

    var mapc = $( "#map");

    map = new google.maps.Map(mapc[0], 
     { zoom:16, 
      center:new google.maps.LatLng(lat,long),
      mapTypeId: google.maps.MapTypeId.HYBRID
    } );

    usermark = new google.maps.Marker({ map:map,
     position: new google.maps.LatLng(lat,long),
     title: "You are here"});

    markers = new Array;

    var color = document.getElementById("color");
    color.style.backgroundColor='white';
    color.innerHTML="<b><blink>Waiting for first position</blink></b>";

    google.maps.event.addListener(map,"bounds_changed",ViewShift);
    google.maps.event.addListener(map,"center_changed",ViewShift);
    google.maps.event.addListener(map,"zoom_changed",ViewShift);

    navigator.geolocation.watchPosition(Reposition);

  }


