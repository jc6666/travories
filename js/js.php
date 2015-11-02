
<script>
var map;

AmCharts.ready(function() {
    map = new AmCharts.AmMap();
    map.pathToImages = "http://www.ammap.com/lib/images/";
    //map.panEventsEnabled = true; // this line enables pinch-zooming and dragging on touch devices
    map.color = "#ffffff";
    
    var wordlDataProvider = {
        mapVar: AmCharts.maps.worldLow,
        getAreasFromMap: true,
        color: "#15A892",
        areas: [
            { id: "FR", color: "#4444ff" },
            { id: "RU", color: "#4444ff" },
            { id: "US", color: "#4444ff" }
        ]

    };

    map.dataProvider = wordlDataProvider;

    map.areasSettings = {
        autoZoom: true,
        selectedColor: "#13564e"
    };

    map.smallMap = new AmCharts.SmallMap();
    
    map.addListener("clickMapObject", function (event) {
        switch(event.mapObject.id){
          case "US":
            loadNewMap("ammap/maps/js/usaLow.js", "usaLow");
            break;
            case "FR":
            loadNewMap("ammap/maps/js/franceLow.js", "franceLow");
              break;
              case "RU":
              loadNewMap("ammap/maps/js/russiaLow.js", "russiaLow");
                break;
                case "MX":
                loadNewMap("ammap/maps/js/mexicoLow.js", "mexicoLow");
                  break;
          default:
            loadNewMap("ammap/maps/js/worldLow.js", "worldLow");
            break;
        }
        
    });

    map.write("mapdiv");

});

function loadNewMap (url, mapName) {
    if (AmCharts.maps[mapName] != undefined) {
        // the map was already loaded
        setNewMap(mapName);
    }
    else {
        // let's load the map
        $.getScript(url, function () {
            setNewMap(mapName);
        });
    }
}

function setNewMap (mapName) {
    var dataProvider = {
        mapVar: AmCharts.maps[mapName],
        getAreasFromMap: true
    };
    map.dataProvider = dataProvider;
    map.validateData();
}
</script>