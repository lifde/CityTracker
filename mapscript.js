var map, datasource, client, drawingManager;

function getOrigin () {
  return window.location.pathname;
}

function GetMap() {
    document.getElementById('dashboardBtn').onclick = function() {
      let origin = getOrigin();
      let url = origin.replace('mapRoute', 'dashboard');
      window.location.href = url;
    };

    var map = new atlas.Map('myMap', {
      // Replace <Your Azure Maps Key> with your Azure Maps subscription key. https://aka.ms/am-primaryKey
      authOptions: {
          authType: 'subscriptionKey',
          subscriptionKey: '1rmYDaf8eBUdRCAn8TaWEcbPha-KWCBwSN23e9nmbkU'
      }
    });

    function success(position) {
      map.events.add('ready', function () {
        //Create a marker and add it to the map.
        marker = new atlas.HtmlMarker({
            position: [position.coords.longitude, position.coords.latitude]
        });
        map.markers.add(marker);
      });
    }
  
    function error() {
      console.log("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }

    //Wait until the map resources are ready.
    map.events.add('ready', function () {

      //Create an instance of the drawing manager and display the drawing toolbar.
      drawingManager = new atlas.drawing.DrawingManager(map, {
          toolbar: new atlas.control.DrawingToolbar({ position: 'top-right', style: 'light' })
      });
    });
}