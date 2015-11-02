var mapp;
		var url = window.location.href;     // Returns full URL
		lat = url.split("lat=");
		
		alert(lat);

		function initMap() {
		  mapp = new google.maps.Map(document.getElementById('map'), {
			center: {lat: info.latitude, lng: info.longitude},
			zoom: 8
		  });
		}