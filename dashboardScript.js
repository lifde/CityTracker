function getOrigin () {
  return window.location.pathname;
}

function GetDashboard() {
  document.getElementById('mapBtn').onclick = function() {
    let origin = getOrigin();
    let url = origin.replace('dashboard', 'mapRoute');
    window.location.href = url;
  };
}