
https://get.geojs.io/v1/ip/geo.json

const { app } = require('@azure/functions');

const latitude = null;
const longitude = null;

if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
} else {
    console.log("Locating…");
    navigator.geolocation.getCurrentPosition(success, error);
}   

function error() {
    console.log("Unable to retrieve your location");
}

function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'vehicules/{id:int?}',
    handler: async (request, context) => {
        const date = Date();    
        const id = request.params.id;

        return { body: `Latitude: ${latitude}, Longitude: ${longitude}, Date: ${date}, ID: ${id}` };
    }
});
