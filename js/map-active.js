var map;
var marker;
var latlng = new google.maps.LatLng(56.9496, 24.1052);
var stylez = [{
    featureType: "all",
    elementType: "all",
    stylers: [{
        saturation: -25
            }]
        }];
var mapOptions = {
    zoom: 15,
    center: latlng,
    scrollwheel: false,
    scaleControl: false,
    disableDefaultUI: true,
    mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'gMap']
    }
};
map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
var geocoder_map = new google.maps.Geocoder();
var address = 'Riga';
geocoder_map.geocode({
    'address': address
}, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            icon: '',
            position: map.getCenter(),
            animation: google.maps.Animation.BOUNCE,
        });
    } else {
        alert("Geocode was not successful for the following reason: " + status);
    }
});
var mapType = new google.maps.StyledMapType(stylez, {
    name: "Grayscale"
});
map.mapTypes.set('gMap', mapType);
map.setMapTypeId('gMap');

function initGoogleMap() {
    try {
        // Create the map
        map = new google.maps.Map(document.getElementById('googleMap'), {
            zoom: 12,
            center: { lat: 45.508888, lng: -73.561668 }, // Montreal coordinates
            mapTypeControl: false,
            scrollwheel: false,
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#444444"}]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{"color": "#f2f2f2"}]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{"visibility": "off"}]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{"saturation": -100}, {"lightness": 45}]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [{"visibility": "simplified"}]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{"visibility": "off"}]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{"visibility": "off"}]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]
                }
            ]
        });

        // Add a marker that can be dragged
        marker = new google.maps.Marker({
            position: { lat: 45.508888, lng: -73.561668 },
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP
        });

        // Add click event to map to move marker
        map.addListener('click', function(event) {
            marker.setPosition(event.latLng);
            updateCoordinates(event.latLng);
        });

        // Add drag event to marker
        marker.addListener('dragend', function(event) {
            updateCoordinates(event.latLng);
        });

        // Initial coordinates update
        updateCoordinates(marker.getPosition());

    } catch (error) {
        console.error('Error initializing Google Map:', error);
        document.getElementById('googleMap').innerHTML = '<div class="map-error">Error initializing map. Please try again later.</div>';
    }
}

// Function to update coordinates in the form
function updateCoordinates(latLng) {
    try {
        var lat = latLng.lat();
        var lng = latLng.lng();
        
        // Update hidden form fields with coordinates
        document.getElementById('location-lat').value = lat;
        document.getElementById('location-lng').value = lng;
        
        // Show coordinates in the message field
        var messageField = document.getElementById('message');
        var currentMessage = messageField.value;
        
        // Check if coordinates are already in the message
        if (currentMessage.indexOf('Location:') === -1) {
            messageField.value = currentMessage + '\n\nLocation: ' + lat + ', ' + lng;
        } else {
            // Replace existing coordinates
            messageField.value = currentMessage.replace(/Location:.*$/, 'Location: ' + lat + ', ' + lng);
        }
    } catch (error) {
        console.error('Error updating coordinates:', error);
    }
}