var mappa;
var infoWindow;
infoWindow = new google.maps.InfoWindow({});
mappa = new GMaps({
  div: '#map',
  zoom: 15,
  lat: 0,
  lng: 20,
  markerClusterer: function(mappa) {
    options = {
      gridSize: 5
    }

    return new MarkerClusterer(mappa, [], options);
  }
});
   function addPoints(data) {
     var markers_data = [];
     if (data.length > 0) {

       for (var i = 0; i < data.length; i++) {
        //console.log(data[i].latitude);
         var marker=({
           lat: data[i].latitude,
           lng: data[i].longitude,
           title: data[i].title,
          
           infoWindow: {
             content: "hola"
           }
         });
         markers_data.push(marker)
       }
     }
     mappa.addMarker(markers_data);
   }

  function cluster()
  {
     

     points = $.getJSON("data.php");
     points.done(addPoints);
}