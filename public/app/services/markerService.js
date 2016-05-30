define(function() {
    var coreModule = angular.module('coreModule');
    coreModule.service('markerService', function() {
        this.markers = [];
        this.mark_count = 0;
        this.last_up = [];
        var infowindow = new google.maps.InfoWindow();
        this.getMarker = function(prop_data, map) {
            console.log("Map Issue");
            this.clearOverlays();
            var bounds = new google.maps.LatLngBounds();
            //console.log(prop_data);
            for (i in prop_data) {
                if(prop_data[i].latitude != "" && prop_data[i].longitude != "") {

                    var latlng = new google.maps.LatLng(prop_data[i].latitude, prop_data[i].longitude);
                    bounds.extend(latlng)
                    this.markers[this.mark_count] = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        markerId : prop_data[i].property_id,
                        title: prop_data[i].address,
                        //icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                    });
                    this.markers[this.mark_count].addListener('click', function() {
                        infowindow.setContent(this.title);
                        infowindow.setPosition(this.getPosition());
                        infowindow.open(map);
                        map.setCenter(this.getPosition());
                    });

                    this.mark_count++;
                }
            }
            map.fitBounds(bounds);
            $('#overlay').hide();
        };
        this.updateMarker = function( prop_data , map , d_m  ){
            //console.log(this.markers);
            var bounds = new google.maps.LatLngBounds();

            //console.log(this.markers);

            if(this.last_up['id']){
              //  console.log(this.last_up);
                for(i in this.markers){

                    if(this.markers[i].markerId == this.last_up['id']){

                        //console.log('Test');
                        var latlng = new google.maps.LatLng(this.last_up['latitude'], this.last_up['longitude']);
                        bounds.extend(latlng);
                        this.markers[i].setMap(null);
                        this.markers[i] = new google.maps.Marker({
                            position: latlng,
                            markerId : this.last_up['id'],
                            map: map,
                            title: prop_data[i].address,

                        });
                        this.markers[i].addListener('click', function () {
                            infowindow.setContent(this.title);
                            infowindow.setPosition(this.getPosition());
                            infowindow.open(map);
                            map.setCenter(this.getPosition());
                        });
                    }
                }
            }
            for(i in this.markers){
                //console.log(this.markers[i].markerId)

                if(this.markers[i].markerId == d_m['id']){
                    //console.log(d_m);
                    var latlng = new google.maps.LatLng(d_m['latitude'], d_m['longitude']);
                    bounds.extend(latlng);
                    this.markers[i].setMap(null);
                    this.last_up['id'] = d_m['id'];
                    this.last_up['latitude'] = d_m['latitude'];
                    this.last_up['longitude'] = d_m['longitude'];
                    this.markers[i] = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        title: prop_data[i].address,
                        markerId : d_m['id'],
                        animation: google.maps.Animation.BOUNCE,
                        //icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        icon: 'img/marker_icon.png'
                    });
                    this.markers[i].addListener('click', function () {
                        infowindow.setContent(this.title);
                        infowindow.setPosition(this.getPosition());
                        infowindow.open(map);
                        map.setCenter(this.getPosition());
                    });
                }
            }



        }
        this.clearOverlays = function(map) {
            var prev_markers = this.markers;
            for(i in prev_markers) {
                if (prev_markers[i]) {
                    prev_markers[i].setMap(null);
                }
            }
                prev_markers.length = 0;
                this.mark_count = 0;

        }
    });
});