var map, datasource, client;

function GetMap() {
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


    // //Wait until the map resources are ready.
    // map.events.add('ready', function() {

    //     //Create a data source and add it to the map.
    //     datasource = new atlas.source.DataSource();
    //     map.sources.add(datasource);

    //     //Add a layer for rendering point data.
    //     var resultLayer = new atlas.layer.SymbolLayer(datasource, null, {
    //         iconOptions: {
    //             image: 'pin-round-darkblue',
    //             anchor: 'center',
    //             allowOverlap: true
    //         },
    //         textOptions: {
    //             anchor: "top"
    //         }
    //     });

    //     map.layers.add(resultLayer);

    //     //Use MapControlCredential to share authentication between a map control and the service module.
    //     var pipeline = atlas.service.MapsURL.newPipeline(new atlas.service.MapControlCredential(map));

    //     // Construct the SearchURL object
    //     var searchURL = new atlas.service.SearchURL(pipeline);

    //     var query = 'gasoline-station';
    //     var radius = 9000;
    //     var lat = 47.64452336193245;
    //     var lon = -122.13687658309935;

    //     searchURL.searchPOI(atlas.service.Aborter.timeout(10000), query, {
    //         limit: 10,
    //         lat: lat,
    //         lon: lon,
    //         radius: radius,
    //         view: 'Auto'
    //     }).then((results) => {

    //         // Extract GeoJSON feature collection from the response and add it to the datasource
    //         var data = results.geojson.getFeatures();
    //         datasource.add(data);

    //         // set camera to bounds to<Your Azure Maps Subscription Key> show the results
    //         map.setCamera({
    //             bounds: data.bbox,
    //             zoom: 10,
    //             padding: 15
    //         });
    //     });
    //     // Create a popup but leave it closed so we can update it and display it later.
    //     popup = new atlas.Popup();

    //     //Add a mouse over event to the result layer and display a popup when this event fires.
    //     map.events.add('mouseover', resultLayer, showPopup);
        
    //     function showPopup(e) {
    //         //Get the properties and coordinates of the first shape that the event occurred on.

    //         var p = e.shapes[0].getProperties();
    //         var position = e.shapes[0].getCoordinates();

    //         //Create HTML from properties of the selected result.
    //         var html = `
    //         <div style="padding:5px">
    //             <div><b>${p.poi.name}</b></div>
    //             <div>${p.address.freeformAddress}</div>
    //             <div>${position[1]}, ${position[0]}</div>
    //         </div>`;

    //         //Update the content and position of the popup.
    //         popup.setPopupOptions({
    //             content: html,
    //             position: position
    //         });

    //         //Open the popup.
    //         popup.open(map);
    //     }
    // });
}