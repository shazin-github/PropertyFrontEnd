define(function(){
    angular
        .module('coreModule')
        .service('markerService',markerService);

    function markerService(){



        return {
            getMarker:getMarker,
            updateMarker:updateMarker,
            clearOverlays:clearOverlays,
            markers : [],
            markerCount : 0,
            lastUp : [],

        };

        function getMarker(propertyData, map){
            var infowindow = new google.maps.InfoWindow();
            console.log(propertyData);
            this.clearOverlays();
            var bounds = new google.maps.LatLngBounds();
            //console.log(prop_data);
            for (i in propertyData) {
                if(propertyData[i].latitude != "" && propertyData[i].longitude != "") {

                    var latlng = new google.maps.LatLng(propertyData[i].latitude, propertyData[i].longitude);
                    bounds.extend(latlng)
                    this.markers[this.markerCount] = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        markerId : propertyData[i].property_id,
                        title: propertyData[i].title,
                        //icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                    });
                    this.markers[this.markerCount].addListener('click', function() {
                        infowindow.setContent(this.title);
                        infowindow.setPosition(this.getPosition());
                        infowindow.open(map);
                        //map.setCenter(this.getPosition());
                    });

                    this.markerCount++;
                }
            }
            map.fitBounds(bounds);
            $('#overlay').hide();
        }

        function updateMarker(propertyData , map , changeobj){
            var infowindow = new google.maps.InfoWindow();
            var bounds = new google.maps.LatLngBounds();
            if(this.lastUp['id']){
                //  console.log(this.last_up);
                for(i in this.markers){

                    if(this.markers[i].markerId == this.lastUp['id']){

                        //console.log('Test');
                        var latlng = new google.maps.LatLng(this.lastUp['latitude'], this.lastUp['longitude']);
                        bounds.extend(latlng);
                        this.markers[i].setMap(null);
                        this.markers[i] = new google.maps.Marker({
                            position: latlng,
                            markerId : this.lastUp['id'],
                            map: map,
                            title: propertyData[i].title,

                        });
                        this.markers[i].addListener('click', function () {
                            infowindow.setContent(this.title);
                            infowindow.setPosition(this.getPosition());
                            infowindow.open(map);
                            //map.setCenter(this.getPosition());
                        });
                    }
                }
            }
            for(i in this.markers){
                //console.log(this.markers[i].markerId)

                if(this.markers[i].markerId == changeobj['id']){
                    //console.log(d_m);
                    var latlng = new google.maps.LatLng(changeobj['latitude'], changeobj['longitude']);
                    bounds.extend(latlng);
                    this.markers[i].setMap(null);
                    this.lastUp['id'] = changeobj['id'];
                    this.lastUp['latitude'] = changeobj['latitude'];
                    this.lastUp['longitude'] = changeobj['longitude'];
                    this.markers[i] = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        title: propertyData[i].title,
                        markerId : changeobj['id'],
                        animation: google.maps.Animation.BOUNCE,
                        //icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        icon: 'img/marker_icon.png'
                    });
                    this.markers[i].addListener('click', function () {
                        infowindow.setContent(this.title);
                        infowindow.setPosition(this.getPosition());
                        infowindow.open(map);
                        //map.setCenter(this.getPosition());
                    });
                }
            }
        }

        function clearOverlays(){
            var prev_markers = this.markers;
            for(i in prev_markers) {
                if (prev_markers[i]) {
                    prev_markers[i].setMap(null);
                }
            }
            prev_markers.length = 0;
            this.markerCount = 0;
        }
    }
});