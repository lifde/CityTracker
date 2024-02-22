const { app } = require('@azure/functions');

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
  
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

app.http('httpTrigger1', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'vehicules/{id:int?}',
    handler: async (request, context) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const date = Date();    
        const id = request.params.id;

        return { body: `Latitude: ${latitude}, Longitude: ${longitude}, Date: ${date}, ID: ${id}` };
    },
});