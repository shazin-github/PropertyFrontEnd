define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('markerService', function() {
        var markers = [];
        var mark_count = 0;
        var infowindow = new google.maps.InfoWindow();
        this.getMarker = function(prop_data, map) {
            clearOverlays();
            var bounds = new google.maps.LatLngBounds();

            for (i in prop_data) {
                if(prop_data[i].latitude != "" && prop_data[i].longitude != "") {
                    var latlng = new google.maps.LatLng(prop_data[i].latitude, prop_data[i].longitude);
                    bounds.extend(latlng)
                    markers[mark_count] = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        title: prop_data[i].address
                    });
                    markers[mark_count].addListener('click', function() {
                        infowindow.setContent(this.title);
                        infowindow.setPosition(this.getPosition());
                        infowindow.open(map);
                        map.setCenter(this.getPosition());
                    });

                    mark_count++;
                }
            }
            map.fitBounds(bounds);

            function clearOverlays() {
                for(i in markers) {
                    if(markers[i].getMap()) {
                        markers[i].setMap(null);
                    }
                    markers.length = 0;
                    mark_count = 0;
                    infowindow.close();
                }
            }
        };
    });
});