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