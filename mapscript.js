var map, datasource, client, drawingManager;

//Create an array of points to define a path to animate along.
var path = [
  [0.14877413239966852, 45.65338222987553],
  [0.14616302703338754, 45.65314349803313],
  [0.14481440257944803, 45.65208787282562],
  [0.14468071790556009, 45.65046828332857],
  [0.14413499544439362, 45.64962305456874],
  [0.14413499544439362, 45.64962305456874],
  [0.14413499544439362, 45.64962305456874],
  [0.14413499544439362, 45.64962305456874],
  [0.14485587169187575, 45.65113719842779],
  [0.14592275024910442, 45.65300160542738],
  [0.14906820259985173, 45.65338733707075],
];

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
        console.log([position.coords.longitude, position.coords.latitude]);
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

    //Wait until the map resources are ready.
    map.events.add('ready', function () {
      //Load a custom image icon into the map resources.
      map.imageSprite.createFromTemplate('arrow-icon', 'marker-arrow', 'teal', '#fff').then(function () {

          //Create data sources and add them to the map.
          lineSource = new atlas.source.DataSource();
          pinSource = new atlas.source.DataSource();
          map.sources.add([lineSource, pinSource]);

          //Create a layer to render the path.
          map.layers.add(new atlas.layer.LineLayer(lineSource, null, {
              strokeColor: 'DodgerBlue',
              strokeWidth: 3
          }));

          //Create a line for the path and add it to the data source.
          lineSource.add(new atlas.data.LineString(path));

          //Create a layer to render a symbol which we will animate.
          map.layers.add(new atlas.layer.SymbolLayer(pinSource, null, {
              iconOptions: {
                  //Pass in the id of the custom icon that was loaded into the map resources.
                  image: 'arrow-icon',

                  //Anchor the icon to the center of the image.
                  anchor: 'center',

                  //Rotate the icon based on the rotation property on the point data.
                  //The arrow icon being used in this case points down, so we have to rotate it 180 degrees.
                  rotation: ['+', 180, ['get', 'heading']],

                  //Have the rotation align with the map.
                  rotationAlignment: 'map',

                  //For smoother animation, ignore the placement of the icon. This skips the label collision calculations and allows the icon to overlap map labels. 
                  ignorePlacement: true,

                  //For smoother animation, allow symbol to overlap all other symbols on the map.
                  allowOverlap: true
              },
              textOptions: {
                  //For smoother animation, ignore the placement of the text. This skips the label collision calculations and allows the text to overlap map labels.
                  ignorePlacement: true,

                  //For smoother animation, allow text to overlap all other symbols on the map.
                  allowOverlap: true
              }
          }));

          //Create a pin and wrap with the shape class and add to data source.
          pin = new atlas.Shape(new atlas.data.Feature(new atlas.data.Point(path[0])));
          pinSource.add(pin);

          //Create the animation.
          animation = atlas.animations.moveAlongPath(path, pin, { 
              //Capture metadata so that data driven styling can be done.
              captureMetadata: true,
              
              duration: 4000,

              //Camera options to use when following.
              zoom: 15,
              pitch: 45,
              rotate: true
          });
      });
    });
}