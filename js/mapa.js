 var map;
 var mappa;
 var infoWindow;
 var mapa;
 var colors;
 var mundial = 'worldLow';


 function initMap() {
    mappa = new google.maps.Map(document.getElementById('map'), {
     center: new google.maps.LatLng(-34.397, 150.644),
                 zoom: 4
                 
   });
 }


 var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";


 //alert(mar);
  map = AmCharts.makeChart("mapdiv", {
               type: "map",


               "data": {
                 "map": mundial,
                "getAreasFromMap": true,
               },
              
                
                 
                   areasSettings: {
                       unlistedAreasColor: "#000000",
                       color: mar,

                       selectable: true
                   },

               

               areasSettings : {
               autoZoom : true,
               color : "#E6FA08",
               colorSolid : "#84ADE9",
               selectedColor : "#84ADE9",
               outlineColor : "#666666",
               rollOverColor : "#9EC2F7",
               rollOverOutlineColor : "#000000"
               },
               
               "dataLoader": {
                 "url": "data.php",
                 "format": "json",
                 "showErrors": true,

                 "postProcess": function(data, config, map) {
                   // create a new dataProvider
                   var mapData = map.data;

                   // init images array
                   if (mapData.images === undefined)
                     mapData.images = [];

                   // create images out of loaded data
                   for(var i = 0; i < data.length; i++) {
                     var image = data[i];
                     console.log(image);
                     //image.type = "circle";
                     image.svgPath=targetSVG;
                     mapData.images.push(image);
                   }


                   return mapData;
                 }
               }
              });

 $('#mar').colorpicker().on('changeColor', function(event) {
   $("#mapdiv").css('backgroundColor', event.color);
   $(".input-group-addon.mar").css('backgroundColor', event.color);
   var mar = event.color;

 });

 $('#mapaColor').colorpicker().on('changeColor', function(event) {
   //$("#mapdiv").css('backgroundColor', event.color);
   $(".input-group-addon.mar").css('backgroundColor', event.color);
   var colors = event.color;

      map = AmCharts.makeChart("mapdiv", {
                   type: "map",


                   "data": {
                     "map": mundial,
                     "getAreasFromMap": true,
                   },
                  
                    
                     
                       areasSettings: {
                           unlistedAreasColor: "#000000",
                           color: mar,

                           selectable: true
                       },

                   

                   areasSettings : {
                   autoZoom : true,
                   color : "#E6FA08",
                   colorSolid : "#84ADE9",
                   selectedColor : colors,
                   outlineColor : "#666666",
                   rollOverColor : "#9EC2F7",
                   rollOverOutlineColor : "#000000"
                   },
                   
                   "dataLoader": {
                     "url": "data.php",
                     "format": "json",
                     "showErrors": true,

                     "postProcess": function(data, config, map) {
                       // create a new dataProvider
                       var mapData = map.data;

                       // init images array
                       if (mapData.images === undefined)
                         mapData.images = [];

                       // create images out of loaded data
                       for(var i = 0; i < data.length; i++) {
                         var image = data[i];
                         //image.type = "circle";
                         image.svgPath=targetSVG;
                         mapData.images.push(image);
                       }
                       return mapData;
                     }
                   }
                  });

 map.addListener("clickMapObject", function (event) {

         // deselect the area by assigning all of the dataProvider as selected object
                 map.selectedObject = map.dataProvider;

         // toggle showAsSelected
                event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

                // bring it to an appropriate color
                map.returnInitialColor( event.mapObject );

                // let's build a list of currently selected states
                var states = [];
                for ( var i in map.dataProvider.areas ) {
                    var area = map.dataProvider.areas[ i ];
                    if ( area.showAsSelected ) {
                        states.push( area.title );
                    }

                }
          //var mapa = event.mapObject.id;
          var info = event.chart.getDevInfo();
          var infoWindow = new google.maps.InfoWindow({map: mappa});
          var pos = {
                  lat: info.latitude,
                  lng: info.longitude
                };
           console.log(info.zoomLevel);
               if ( info.zoomLevel == 5 ) {
                 var mapa = event.mapObject.id;
                      if(mapa == mapa){

                        loadNewMap("ammap/maps/js/"+mapa+".js", mapa);
                        mundial = mapa;
                      }
                    //alert('lat '+info.latitude+' long '+info.longitude);
                }

        currentObject = event.mapObject;
 });


   function loadNewMap (url, mapName) {
       if (AmCharts.maps[mapName] != undefined) {
           // the map was already loaded
           setNewMap(mapName);
       }
       else {
           // let's load the map
           jQuery.getScript(url, function () {
               setNewMap(mapName);
           });
       }
   }

   function setNewMap (mapName) {
       // var dataProvider = {
           // mapVar: AmCharts.maps[mapName],
           // getAreasFromMap: true,
       // dataLoader: {
                   // "getAreasFromMap": true,
                   // "url": "data.php",
                   // "format": "json",
                   // "showErrors": true,
                   // "postProcess": function(data, config, map) {
                    // create a new dataProvider
                     // var mapData = map.data;

                    // init images array
                     // if (mapData.images === undefined)
                       // mapData.images = [];

                    // create images out of loaded data
                     // for(var i = 0; i < data.length; i++) {
                       // var image = data[i];
                       // image.type = "circle";
                       // mapData.images.push(image);
                     // }
                     // return mapData;
                   // }
                 // }
       // };

       function initMap() {
         mappa = new google.maps.Map(document.getElementById('map'), {
           center: new google.maps.LatLng(-34.397, 150.644),
                       zoom: 4
                       
         });
       }

      map = AmCharts.makeChart("mapdiv", {
                   type: "map",


                   "data": {
                     "map": mundial,
                     "getAreasFromMap": true,
                   },
                  
                    
                     
                       areasSettings: {
                           unlistedAreasColor: "#000000",
                           color: mar,

                           selectable: true
                       },

                   

                   areasSettings : {
                   autoZoom : true,
                   color : "#E6FA08",
                   colorSolid : "#84ADE9",
                   selectedColor : "#84ADE9",
                   outlineColor : "#666666",
                   rollOverColor : "#9EC2F7",
                   rollOverOutlineColor : "#000000"
                   },
                   
                   "dataLoader": {
                     "url": "data.php",
                     "format": "json",
                     "showErrors": true,

                     "postProcess": function(data, config, map) {
                       // create a new dataProvider
                       var mapData = map.data;

                       // init images array
                       if (mapData.images === undefined)
                         mapData.images = [];

                       // create images out of loaded data
                       for(var i = 0; i < data.length; i++) {
                         var image = data[i];
                         //image.type = "circle";
                         image.svgPath=targetSVG;
                         mapData.images.push(image);
                       }
                       return mapData;
                     }
                   }
                  });
       //map.dataProvider = dataProvider;
       map.addListener("clickMapObject", function (event) {

               // deselect the area by assigning all of the dataProvider as selected object
                       map.selectedObject = map.dataProvider;

               // toggle showAsSelected
                      event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

                      // bring it to an appropriate color
                      map.returnInitialColor( event.mapObject );

                      // let's build a list of currently selected states
                      var states = [];
                      for ( var i in map.dataProvider.areas ) {
                          var area = map.dataProvider.areas[ i ];
                          if ( area.showAsSelected ) {
                              states.push( area.title );
                          }

                      }
                //var mapa = event.mapObject.id;
                var info = event.chart.getDevInfo();
                var infoWindow = new google.maps.InfoWindow({map: mappa});
                var pos = {
                        lat: info.latitude,
                        lng: info.longitude
                      };
                 console.log(info.zoomLevel);
                     if ( info.zoomLevel >= 5 ) {

                       $('#mapdiv').css('display', 'none');
                       $('#map').css('visibility', 'visible');
                        //alert('lat '+info.latitude+' long '+info.longitude);
                        
                        var contenido = "<div class='col-sm-12'><div class='col-sm-6'><span>Experiencia</span></div></div>";
                       infoWindow.setPosition(pos);
                       infoWindow.setContent('Aqui esta!');
                        
                        var marker = new google.maps.Marker({
                            position: pos,
                            map: mappa,
                            title: 'Hello World!'
                          });
                        mappa.setCenter(pos);
                        mappa.setZoom(10);
                     }

              currentObject = event.mapObject;
       });
       
       map.validateData();



   }


 });


 /*map.addListener("clickMapObject", function (event)
 {
    var mapa = event.mapObject.id;
    //alert(mapa);
    
    if (mapa == event.mapObject.id) {
          
           //alert("AU");
         }
         if(mapa == "ES"){

           loadNewMap("ammap/maps/js/"+mapa+".js", mapa);
           mundial = mapa;
           //alert(mapa);
         }
   // find out the coordinates of under mouse cursor
     var info = event.chart.getDevInfo();


  
     // print out dev info
     //var log = document.getElementById('maplog');
  console.log(info);
     //alert("lat: "+ info.latitude + " long: "+ info.longitude );
  
  //window.open(gMap.html?lat=info.latitude&lon=info.longitude);
   
      var myLatLng = {lat: info.latitude, lng: info.longitude};

         
               //map.setCenter(results[0].geometry.location);
               var marker = new google.maps.Marker({
                      map: mappa,
                      position: myLatLng
               });
           
       
   
  
 });*/



 /*map.addListener("clickMapObject", function (event) {
        if (event.mapObject.id == "ES") {
            loadNewMap("http://www.ammap.com/lib/maps/js/spainProvincesLow.js", "spainProvincesLow");
        }
        else if (event.mapObject.id == "RU") {
            loadNewMap("http://www.ammap.com/lib/maps/js/russiaLow.js", "russiaLow");
        }
        else if (event.mapObject.id == "US") {
            loadNewMap("http://www.ammap.com/lib/maps/js/usaLow.js", "usaLow");
        }
    });*/

 // add events to recalculate map position when the map is moved or zoomed
 map.addListener("positionChanged", updateCustomMarkers);

 // this function will take current images on the map and create HTML elements for them
 function updateCustomMarkers (event) {
     // get map object
     var maps = event.chart;
     
     // go through all of the images
     for( var x in maps.dataProvider.images) {
         // get MapImage object
         var image = maps.dataProvider.images[x];
         
         // check if it has corresponding HTML element
         if ('undefined' == typeof image.externalElement)
             image.externalElement = createCustomMarker(image);

         // reposition the element accoridng to coordinates
         image.externalElement.style.top = maps.latitudeToY(image.latitude) + 'px';
         image.externalElement.style.left = maps.longitudeToX(image.longitude) + 'px';
     }
 }

 // this function creates and returns a new marker element
 function createCustomMarker(image) {
     // create holder
     var holder = document.createElement('div');
     holder.className = 'map-marker';
     holder.title = image.title;
     holder.style.position = 'absolute';
     
     // maybe add a link to it?
     if (undefined != image.url) {
         holder.onclick = function() {
             window.location.href = image.url;
         };
         holder.className += ' map-clickable';
     }
     
     // create dot
     var dot = document.createElement('div');
     dot.className = 'dot';
     holder.appendChild(dot);
     
     // create pulse
     var pulse = document.createElement('div');
     pulse.className = 'pulse';
     holder.appendChild(pulse);
     
     // append the marker to the map container
     image.chart.chartDiv.appendChild(holder);
     
     return holder;
 }

 function loadNewMap (url, mapName) {
     if (AmCharts.maps[mapName] != undefined) {
         // the map was already loaded
         setNewMap(mapName);
     }
     else {
         // let's load the map
         jQuery.getScript(url, function () {
             setNewMap(mapName);
         });
     }
 }

 function setNewMap (mapName) {
     // var dataProvider = {
         // mapVar: AmCharts.maps[mapName],
         // getAreasFromMap: true,
    // dataLoader: {
                 // "getAreasFromMap": true,
                 // "url": "data.php",
                 // "format": "json",
                 // "showErrors": true,
                 // "postProcess": function(data, config, map) {
                  // create a new dataProvider
                   // var mapData = map.data;

                  // init images array
                   // if (mapData.images === undefined)
                     // mapData.images = [];

                  // create images out of loaded data
                   // for(var i = 0; i < data.length; i++) {
                     // var image = data[i];
                     // image.type = "circle";
                     // mapData.images.push(image);
                   // }
                   // return mapData;
                 // }
               // }
     // };

     function initMap() {
       mappa = new google.maps.Map(document.getElementById('map'), {
         center: new google.maps.LatLng(-34.397, 150.644),
                     zoom: 4
                     
       });
     }

   map = AmCharts.makeChart("mapdiv", {
                 type: "map",


                 "data": {
                   "map": mundial,
                   "getAreasFromMap": true,
                 },
                
                  
                   
                     areasSettings: {
                         unlistedAreasColor: "#000000",
                         color: mar,

                         selectable: true
                     },

                 

                 areasSettings : {
                 autoZoom : true,
                 color : "#E6FA08",
                 colorSolid : "#84ADE9",
                 selectedColor : "#84ADE9",
                 outlineColor : "#666666",
                 rollOverColor : "#9EC2F7",
                 rollOverOutlineColor : "#000000"
                 },
                 
                 "dataLoader": {
                   "url": "data.php",
                   "format": "json",
                   "showErrors": true,

                   "postProcess": function(data, config, map) {
                     // create a new dataProvider
                     var mapData = map.data;

                     // init images array
                     if (mapData.images === undefined)
                       mapData.images = [];

                     // create images out of loaded data
                     for(var i = 0; i < data.length; i++) {
                       var image = data[i];
                       //image.type = "circle";
                       image.svgPath=targetSVG;
                       mapData.images.push(image);
                     }
                     return mapData;
                   }
                 }
                });
     //map.dataProvider = dataProvider;
     map.addListener("clickMapObject", function (event) {

             // deselect the area by assigning all of the dataProvider as selected object
                     map.selectedObject = map.dataProvider;

             // toggle showAsSelected
                    event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

                    // bring it to an appropriate color
                    map.returnInitialColor( event.mapObject );

                    // let's build a list of currently selected states
                    var states = [];
                    for ( var i in map.dataProvider.areas ) {
                        var area = map.dataProvider.areas[ i ];
                        if ( area.showAsSelected ) {
                            states.push( area.title );
                        }

                    }
              //var mapa = event.mapObject.id;
              var info = event.chart.getDevInfo();
              var infoWindow = new google.maps.InfoWindow({map: mappa});
              var position = {
                      lat: info.latitude,
                      lng: info.longitude
                    };
               console.log(info.zoomLevel);
                   if ( info.zoomLevel >= 5 ) {

                     $('#mapdiv').css('display', 'none');
                     $('#map').css('visibility', 'visible');
                      //alert('lat '+info.latitude+' long '+info.longitude);
                      var img;

                      $.ajax({
                        dataType: "json",
                        url: 'data.php',
                        data: {  },
                              success: function( response ) 
                              { 

                                  for (var i = 0; i<response.length ; i++) {
                                    var r =response[i];
                                    console.log(img);
                                    pos = {
                                        lat: r.latitude,
                                        lng: r.longitude
                                      };
                                    img=r.user;
                                     var contenido = "<div class='col-sm-12'><div class='col-sm-6'><span>Usuario</span></div><div class='col-sm-6'><img src='"+img+"' style='width: 50%;border-radius: 10px;margin-left: 33%;'></div></div>";
                                    infoWindow.setPosition(position);
                                    infoWindow.setContent(contenido);
                                     
                                     var marker = new google.maps.Marker({
                                         position: pos,
                                         map: mappa,
                                         title: r.title
                                       });

                                     mappa.setCenter(position);
                                     mappa.setZoom(10);
                                  };

                                      var createMarker = function(params, mapa) {
                                          var icono = new google.maps.MarkerImage(params.icon, null, null, null, new google.maps.Size(32, 41));
                                          // var marker = new google.maps.Marker({
                                          //   position: params.latlon,
                                          //   map: mapa,
                                          //   title: params.title,
                                          //   icon: icono
                                          // });

                                          var marker = new MarkerWithLabel({
                                              position: params.latlon,
                                              map: mapa,
                                              icon: icono,
                                              draggable: false,
                                              raiseOnDrag: false,
                                              labelContent: params.num,
                                              labelAnchor: new google.maps.Point(3, 30),
                                              labelClass: params.num > 9 ? 'labels2' : "labels", // the CSS class for the label
                                              labelInBackground: false
                                          });
                                          /*var label = new Label({
                                       map: map,
                                       value: params.num
                                     });*/
                                          /*label.bindTo('position', marker, 'position');
                                     label.bindTo('text', marker, 'position');*/

                                          google.maps.event.addListener(marker, 'click', function() {
                                              var nContenido = contenido.replace('%logo%', params.contenido.imagen);
                                              nContenido = nContenido.replace(/%title%/gi, params.title);
                                              nContenido = nContenido.replace('%logoTipo%', params.contenido.tipoImage);
                                              nContenido = nContenido.replace('%nombreTipo%', params.contenido.tipo);
                                              nContenido = nContenido.replace('%contenido%', params.contenido.descripcion);
                                              nContenido = nContenido.replace('%className%', params.contenido.colorCategoria);
                                              nContenido = nContenido.replace(/%microsite%/gi, params.contenido.micro);
                                              nContenido = nContenido.replace('%color%', params.contenido.colorCategoria);
                                              nContenido = nContenido.replace('%colorBoton%', params.contenido.colorCategoria);
                                              nContenido = nContenido.replace('%logocategoria%', params.contenido.tipoImage);
                                              console.log(params.contenido.tipo);
                                              infowindow.setContent(nContenido);
                                              infowindow.close();
                                              infowindow.open(map, marker);
                                          });
                                          markers.push(marker);
                                      }

                              },
                              error: function( error )
                              {

                                 alert( error );

                              }
                      });

                      


                   }

            currentObject = event.mapObject;
     });
     
     map.validateData();



 }
     //función para mandar al mapa del mundo (toavia no sirve)
     map.addListener("homeButtonClicked", function (event){

      
       //alert("clcik");
     });



   /* map.addListener("clickMapObject", function (event) {
        // check if the map is already at traget zoomLevel and go to url if it is
        var info = event.chart.getDevInfo();
        var infoWindow = new google.maps.InfoWindow({map: mappa});
        var pos = {
                lat: info.latitude,
                lng: info.longitude
              };
         var mapa = event.mapObject.id;

              if(mapa == "ES"){

                loadNewMap("ammap/maps/js/"+mapa+".js", mapa);
                mundial = mapa;
                //alert(mapa);

              }

        console.log(info);
        if ( 'undefined' != typeof currentObject &&  event.mapObject.id == currentObject.id ) {
            //alert('lat '+info.latitude+' long '+info.longitude);

           infoWindow.setPosition(pos);
           infoWindow.setContent('Aqui esta!');
            mappa.setCenter(pos);
            mappa.setZoom(10);
            console.log(event.mapObject.id);

        }
        currentObject = event.mapObject;
        //console.log(currentObject);

    });*/


    map.addListener("clickMapObject", function (event) 
    {

       var mapa = event.mapObject.id;
       var info = event.chart.getDevInfo();
       console.log(mapa);

       //alert(info.zoomLevel);
       // deselect the area by assigning all of the dataProvider as selected object
               map.selectedObject = map.dataProvider;

       // toggle showAsSelected
              event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

              // bring it to an appropriate color
              map.returnInitialColor( event.mapObject );

              // let's build a list of currently selected states
              var states = [];
              for ( var i in map.dataProvider.areas ) {
                  var area = map.dataProvider.areas[ i ];
                  if ( area.showAsSelected ) {
                      states.push( area.title );
                  }

              }


      if ( info.zoomLevel == 5 ) {
             if(mapa == mapa){

               loadNewMap("ammap/maps/js/"+mapa+".js", mapa);
               mundial = mapa;
             }
           //alert('lat '+info.latitude+' long '+info.longitude);
       }

       currentObject = event.mapObject;
    });


   

    
     function setLanguage(lang) {
         if ('en' == lang)
             map.language = null;
         else
             map.language = lang;
         map.validateData();
     }