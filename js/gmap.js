  var mappa;
  var markers = [];


  function initMap() {
     mappa = new GMaps({
  div: '#map',
  lat: -12.043333,
  lng: -77.028333
});
  }



  function crearMarcador(position , r)
  {
    //console.log(r);
    mappa.setZoom(10);
    mappa.setCenter(position);
    var contenido = "<div class='col-sm-12'><div class='col-sm-6'><span>"+r.title+"</span></div><div class='col-sm-6'><img src='"+r.user+"' style='width: 100px;border-radius: 10px;'></div></div>";
    

     var marker = mappa.addMarker({
      lat: r.latitude,
      lng: r.longitude,
      title: r.title,
      infoWindow: {
        content: contenido,
        title: r.title
      }
    });
     markers.push(marker);
     

     $('.gm-style-iw').css({
       height: '500px',
       width: '580px'
     });

   /* google.maps.event.addListener(marker, 'click', function() {
    var nContenido = contenido.replace('%logo%', r.user);
    nContenido = nContenido.replace(/%title%/gi, r.title);

    console.log(r.title);
    mappa.setCenter(pos);
    infowindow.setContent(nContenido);
    infowindow.close();
    infowindow.open(mappa, marker);
    });
    markers.push(marker);*/
  }

  function cluster()
  {
    var markerCluster = new MarkerClusterer(mappa, markers);
  }