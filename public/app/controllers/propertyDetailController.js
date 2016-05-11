define(['services/propertyService' ,'services/schoolService'], function() {
    var coreModule = angular.module('coreModule');

    coreModule.filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    });



    coreModule.directive('flexSlider', [
        '$parse', '$timeout', function($parse, $timeout) {
            return {
                restrict: 'AE',
                scope: false,
                replace: true,
                transclude: true,
                template: '<div class="flexslider-container"></div>',
                compile: function(element, attr, linker) {
                    return function($scope, $element) {
                        var addSlide, collectionString, flexsliderDiv, getTrackFromItem, indexString, match, removeSlide, slidesItems, trackBy;
                        match = (attr.slide || attr.flexSlide).match(/^\s*(.+)\s+in\s+(.*?)(?:\s+track\s+by\s+(.+?))?\s*$/);
                        indexString = match[1];
                        collectionString = match[2];
                        trackBy = angular.isDefined(match[3]) ? $parse(match[3]) : $parse("" + indexString);
                        flexsliderDiv = null;
                        slidesItems = {};
                        getTrackFromItem = function(collectionItem, index) {
                            var locals;
                            locals = {};
                            locals[indexString] = collectionItem;
                            locals['$index'] = index;
                            return trackBy($scope, locals);
                        };
                        addSlide = function(collectionItem, index, callback) {
                            var childScope, track;
                            track = getTrackFromItem(collectionItem, index);
                            if (slidesItems[track] != null) {
                                throw "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys.";
                            }
                            childScope = $scope.$new();
                            childScope[indexString] = collectionItem;
                            childScope['$index'] = index;
                            return linker(childScope, function(clone) {
                                var slideItem;
                                slideItem = {
                                    collectionItem: collectionItem,
                                    childScope: childScope,
                                    element: clone
                                };
                                slidesItems[track] = slideItem;
                                return typeof callback === "function" ? callback(slideItem) : void 0;
                            });
                        };
                        removeSlide = function(collectionItem, index) {
                            var slideItem, track;
                            track = getTrackFromItem(collectionItem, index);
                            slideItem = slidesItems[track];
                            if (slideItem == null) {
                                return;
                            }
                            delete slidesItems[track];
                            slideItem.childScope.$destroy();
                            return slideItem;
                        };
                        return $scope.$watchCollection(collectionString, function(collection) {
                            var attrKey, attrVal, c, currentSlidesLength, e, i, idx, n, options, slider, slides, t, toAdd, toRemove, trackCollection, _i, _j, _k, _l, _len, _len1, _len2, _len3;
                            if (!(collection != null ? collection.length : void 0)) {
                                return;
                            }
                            if (flexsliderDiv != null) {
                                slider = flexsliderDiv.data('flexslider');
                                currentSlidesLength = Object.keys(slidesItems).length;
                                if (collection == null) {
                                    collection = [];
                                }
                                trackCollection = {};
                                for (i = _i = 0, _len = collection.length; _i < _len; i = ++_i) {
                                    c = collection[i];
                                    trackCollection[getTrackFromItem(c, i)] = c;
                                }
                                toAdd = (function() {
                                    var _j, _len1, _results;
                                    _results = [];
                                    for (i = _j = 0, _len1 = collection.length; _j < _len1; i = ++_j) {
                                        c = collection[i];
                                        if (slidesItems[getTrackFromItem(c, i)] == null) {
                                            _results.push({
                                                value: c,
                                                index: i
                                            });
                                        }
                                    }
                                    return _results;
                                })();
                                toRemove = (function() {
                                    var _results;
                                    _results = [];
                                    for (t in slidesItems) {
                                        i = slidesItems[t];
                                        if (trackCollection[t] == null) {
                                            _results.push(i.collectionItem);
                                        }
                                    }
                                    return _results;
                                })();
                                if ((toAdd.length === 1 && toRemove.length === 0) || toAdd.length === 0) {
                                    for (_j = 0, _len1 = toRemove.length; _j < _len1; _j++) {
                                        e = toRemove[_j];
                                        e = removeSlide(e, collection.indexOf(e));
                                        slider.removeSlide(e.element);
                                    }
                                    for (_k = 0, _len2 = toAdd.length; _k < _len2; _k++) {
                                        e = toAdd[_k];
                                        idx = e.index;
                                        addSlide(e.value, idx, function(item) {
                                            if (idx === currentSlidesLength) {
                                                idx = void 0;
                                            }
                                            return $scope.$evalAsync(function() {
                                                return slider.addSlide(item.element, idx);
                                            });
                                        });
                                    }
                                    return;
                                }
                            }
                            slidesItems = {};
                            if (flexsliderDiv != null) {
                                flexsliderDiv.remove();
                            }
                            slides = angular.element('<ul class="slides"></ul>');
                            flexsliderDiv = angular.element('<div class="flexslider"></div>');
                            flexsliderDiv.append(slides);
                            $element.append(flexsliderDiv);
                            for (i = _l = 0, _len3 = collection.length; _l < _len3; i = ++_l) {
                                c = collection[i];
                                addSlide(c, i, function(item) {
                                    return slides.append(item.element);
                                });
                            }
                            options = {};
                            for (attrKey in attr) {
                                attrVal = attr[attrKey];
                                if (attrKey.indexOf('$') === 0) {
                                    continue;
                                }
                                if (!isNaN(n = parseInt(attrVal))) {
                                    options[attrKey] = n;
                                    continue;
                                }
                                if (attrVal === 'false' || attrVal === 'true') {
                                    options[attrKey] = attrVal === 'true';
                                    continue;
                                }
                                if (attrKey === 'start' || attrKey === 'before' || attrKey === 'after' || attrKey === 'end' || attrKey === 'added' || attrKey === 'removed') {
                                    options[attrKey] = (function(attrVal) {
                                        var f;
                                        f = $parse(attrVal);
                                        return function(slider) {
                                            return $scope.$apply(function() {
                                                return f($scope, {
                                                    '$slider': {
                                                        element: slider
                                                    }
                                                });
                                            });
                                        };
                                    })(attrVal);
                                    continue;
                                }
                                if (attrKey === 'startAt') {
                                    options[attrKey] = $parse(attrVal)($scope);
                                    continue;
                                }
                                options[attrKey] = attrVal;
                            }
                            if (!options.sliderId && attr.id) {
                                options.sliderId = "" + attr.id + "-slider";
                            }
                            if (options.sliderId) {
                                flexsliderDiv.attr('id', options.sliderId);
                            }
                            return $timeout((function() {
                                return flexsliderDiv.flexslider(options);
                            }), 0);
                        });
                    };
                }
            };
        }
    ]);

    //coreModule.directive('ngGallery' , function($document, $timeout, $q, $templateCache){
    //
    //
    //        var defaults = {
    //            baseClass: 'ng-gallery',
    //            thumbClass: 'ng-thumb',
    //            templateUrl: 'ng-gallery.html'
    //        };
    //
    //        var keys_codes = {
    //            enter: 13,
    //            esc: 27,
    //            left: 37,
    //            right: 39
    //        };
    //
    //        function setScopeValues(scope, attrs) {
    //            scope.baseClass = scope.class || defaults.baseClass;
    //            scope.thumbClass = scope.thumbClass || defaults.thumbClass;
    //            scope.thumbsNum = scope.thumbsNum || 3; // should be odd
    //        }
    //
    //        var template_url = defaults.templateUrl;
    //        // Set the default template
    //        $templateCache.put(template_url,
    //            '<div class="{{ baseClass }}">' +
    //            '  <div ng-repeat="i in images">' +
    //            '    {{ i.thumb}}<img ng-src="/{{ i.thumb }}" class="{{ thumbClass }}" ng-click="openGallery($index)" alt="Image {{ $index + 1 }}" />' +
    //            '  </div>' +
    //            '</div>' +
    //            '<div class="ng-overlay" ng-show="opened">' +
    //            '</div>' +
    //            '<div class="ng-gallery-content" unselectable="on" ng-show="opened" ng-swipe-left="nextImage()" ng-swipe-right="prevImage()">' +
    //            '  <div class="uil-ring-css" ng-show="loading"><div></div></div>' +
    //
    //            '  <a class="close-popup" ng-click="closeGallery()"><i class="fa fa-close"></i></a>' +
    //            '  <a class="nav-left" ng-click="prevImage()"><i class="fa fa-angle-left"></i></a>' +
    //            '  <img ondragstart="return false;" draggable="false" ng-src="{{ img }}" ng-click="nextImage()" ng-show="!loading" class="effect" />' +
    //            '  <a class="nav-right" ng-click="nextImage()"><i class="fa fa-angle-right"></i></a>' +
    //            '  <span class="info-text">{{ index + 1 }}/{{ images.length }} - {{ description }}</span>' +
    //            '  <div class="ng-thumbnails-wrapper">' +
    //            '    <div class="ng-thumbnails slide-left">' +
    //            '      <div ng-repeat="i in images">' +
    //            '        <img ng-src="/{{ i.thumb }}" ng-class="{\'active\': index === $index}" ng-click="changeImage($index)" />' +
    //            '      </div>' +
    //            '    </div>' +
    //            '  </div>' +
    //            '</div>'
    //        );
    //
    //        return {
    //            restrict: 'EA',
    //            scope: {
    //                images: '=',
    //                thumbsNum: '@'
    //            },
    //            controller: [
    //                '$scope',
    //                function ($scope) {
    //                    $scope.$on('openGallery', function (e, args) {
    //                        $scope.openGallery(args.index);
    //                    });
    //                }
    //            ],
    //            templateUrl: function (element, attrs) {
    //                return attrs.templateUrl || defaults.templateUrl;
    //            },
    //            link: function (scope, element, attrs) {
    //                setScopeValues(scope, attrs);
    //
    //                if (scope.thumbsNum >= 11) {
    //                    scope.thumbsNum = 11;
    //                }
    //
    //                var $body = $document.find('body');
    //                var $thumbwrapper = angular.element(element[0].querySelectorAll('.ng-thumbnails-wrapper'));
    //                var $thumbnails = angular.element(element[0].querySelectorAll('.ng-thumbnails'));
    //
    //                scope.index = 0;
    //                scope.opened = false;
    //
    //                scope.thumb_wrapper_width = 0;
    //                scope.thumbs_width = 0;
    //
    //                var loadImage = function (i) {
    //                    var deferred = $q.defer();
    //                    var image = new Image();
    //
    //                    image.onload = function () {
    //                        scope.loading = false;
    //                        if (typeof this.complete === false || this.naturalWidth === 0) {
    //                            deferred.reject();
    //                        }
    //                        deferred.resolve(image);
    //                    };
    //
    //                    image.onerror = function () {
    //                        deferred.reject();
    //                    };
    //
    //                    image.src = scope.images[i].img;
    //                    scope.loading = true;
    //
    //                    return deferred.promise;
    //                };
    //
    //                var showImage = function (i) {
    //                    loadImage(scope.index).then(function (resp) {
    //                        scope.img = resp.src;
    //                        smartScroll(scope.index);
    //                    });
    //                    scope.description = scope.images[i].description || '';
    //                };
    //
    //                scope.showImageDownloadButton = function () {
    //                    if (scope.images[scope.index] == null || scope.images[scope.index].downloadSrc == null) return
    //                    var image = scope.images[scope.index];
    //                    return angular.isDefined(image.downloadSrc) && 0 < image.downloadSrc.length;
    //                };
    //
    //                scope.getImageDownloadSrc = function () {
    //                    if (scope.images[scope.index] == null || scope.images[scope.index].downloadSrc == null) return
    //                    return scope.images[scope.index].downloadSrc;
    //                };
    //
    //                scope.changeImage = function (i) {
    //                    scope.index = i;
    //                    showImage(i);
    //                };
    //
    //                scope.nextImage = function () {
    //                    scope.index += 1;
    //                    if (scope.index === scope.images.length) {
    //                        scope.index = 0;
    //                    }
    //                    showImage(scope.index);
    //                };
    //
    //                scope.prevImage = function () {
    //                    scope.index -= 1;
    //                    if (scope.index < 0) {
    //                        scope.index = scope.images.length - 1;
    //                    }
    //                    showImage(scope.index);
    //                };
    //
    //                scope.openGallery = function (i) {
    //                    if (typeof i !== undefined) {
    //                        scope.index = i;
    //                        showImage(scope.index);
    //                    }
    //                    scope.opened = true;
    //
    //                    $timeout(function () {
    //                        var calculatedWidth = calculateThumbsWidth();
    //                        scope.thumbs_width = calculatedWidth.width;
    //                        //Add 1px, otherwise some browsers move the last image into a new line
    //                        var thumbnailsWidth = calculatedWidth.width+1;
    //                        $thumbnails.css({width: thumbnailsWidth + 'px'});
    //                        $thumbwrapper.css({width: calculatedWidth.visible_width + 'px'});
    //                        smartScroll(scope.index);
    //                    });
    //                };
    //
    //                scope.closeGallery = function () {
    //                    scope.opened = false;
    //                };
    //
    //                $body.bind('keydown', function (event) {
    //                    if (!scope.opened) {
    //                        return;
    //                    }
    //                    var which = event.which;
    //                    if (which === keys_codes.esc) {
    //                        scope.closeGallery();
    //                    } else if (which === keys_codes.right || which === keys_codes.enter) {
    //                        scope.nextImage();
    //                    } else if (which === keys_codes.left) {
    //                        scope.prevImage();
    //                    }
    //
    //                    scope.$apply();
    //                });
    //
    //                var calculateThumbsWidth = function () {
    //                    var width = 0,
    //                        visible_width = 0;
    //                    angular.forEach($thumbnails.find('img'), function (thumb) {
    //                        width += thumb.clientWidth;
    //                        width += 10; // margin-right
    //                        visible_width = thumb.clientWidth + 10;
    //                    });
    //                    return {
    //                        width: width,
    //                        visible_width: visible_width * scope.thumbsNum
    //                    };
    //                };
    //
    //                var smartScroll = function (index) {
    //                    $timeout(function () {
    //                        var len = scope.images.length,
    //                            width = scope.thumbs_width,
    //                            item_scroll = parseInt(width / len, 10),
    //                            i = index + 1,
    //                            s = Math.ceil(len / i);
    //
    //                        $thumbwrapper[0].scrollLeft = 0;
    //                        $thumbwrapper[0].scrollLeft = i * item_scroll - (s * item_scroll);
    //                    }, 100);
    //                };
    //
    //            }
    //        };
    //
    //});
    coreModule.directive('modal', function () {
        return {
            template: '<div class="modal fade" >' +
            '<div class="modal-dialog">' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>',
            restrict: 'EA',
            transclude: true,
            replace:true,
            scope:true,
            link: function postLink(scope, element, attrs) {
                scope.$watch(attrs.visible, function(value){
                    if(value == true) {
                        //console.log('inner directive show');
                        $(element).modal('show');
                        $("#sliding").css("display","none");
                    }
                    else
                        $(element).modal('hide');


                });

                $(element).on('shown.bs.modal', function(){
                    //console.log('inner directive');
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    //console.log('inner directive hidden');
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                        $("#sliding").css("display","");
                    });
                });

                $(element).on('click' ,'a.close' , function(){
                    //console.log('inner directive hidden');
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                        $("#sliding").css("display","");
                    });
                });

            }
        };
    });



    coreModule.controller('propertyDetailController', ['$scope', '$http', '$q', 'propertyService', 'schoolService', function($scope, $http, $q, propertyService, schoolService) {
        $("#overlay").show();
        $scope.id = $("#property_id").val();
        var map_center = new google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
            zoom: 15,
            center: map_center,
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-150},{"lightness":10}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-40},{"lightness":10}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-100},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-150},{"lightness":20}]}]
        }
        var map = new google.maps.Map(document.getElementById('property_map'), mapOptions);
        //$scope.setCurrentImage = function(image){
        //    $('#loading').show();
        //    $scope.currentimage = image;
        //    $('#loading').hide();
        //};

        $scope.showModal = false;
        $scope.buttonClicked = "";
        $scope.toggleModal = function(btnClicked){
           // console.log(btnClicked.index);
            $scope.currentimage = btnClicked;
            $scope.buttonClicked = btnClicked;
            $scope.showModal = !$scope.showModal;
        };
        $scope.shownext = function(index) {
            var index = index+1;

            if(index<$scope.images_array.length){
                $scope.currentimage = $scope.images_array[index];
            }
            else{
                index = 0;
                $scope.currentimage = $scope.images_array[index];
            }

        };
        $scope.showpre = function(index) {
            var index = index-1;

            if(index>=0){
                $scope.currentimage = $scope.images_array[index];
            }else{
                index =  $scope.images_array.length - 1;
                $scope.currentimage = $scope.images_array[index];
            }

        };
        $scope.getProperty = propertyService.getPropertyDetail($scope.id).then(function(response) {
            console.log(response);
            var prop_data = response.data.data[0];

            $scope.images_array = [];

            //console.log(prop_data);
            var update_p = prop_data.image_url.split("|");

            angular.forEach(update_p, function(value, key){
                var dr = '/';
                var imge = {

                    thumb : 'thumbnail'+dr+ value,
                    img : value,
                    description: '',
                    ind:key
                }
                console.log(imge);
                $scope.images_array.push(imge);
            });
            $scope.currentimage = _.first($scope.images_array)
            $scope.image_url = update_p;
            $scope.title = prop_data.title;
            $scope.address = prop_data.address;
            $scope.bedroom = prop_data.bedrooms;
            $scope.bathroom = prop_data.bathrooms;
            $scope.area = prop_data.area;
            $scope.purpose = prop_data.purpose;
            $scope.price = prop_data.price;
            $scope.utilities = JSON.parse(prop_data.utilities);
            $scope.park = $scope.utilities.parking;
            $scope.ac = $scope.utilities.ac;
            $scope.swim = $scope.utilities.swim;
            $scope.balcony = $scope.utilities.balcony;
            $scope.update_date = prop_data.updated_at;
            var new_center = new google.maps.LatLng(prop_data.latitude, prop_data.longitude);
            map.setCenter(new_center);
            var marker = new google.maps.Marker({
                position: new_center,
                map: map,
                title: prop_data.address,
                animation: google.maps.Animation.BOUNCE,
                //icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'

            });
            $scope.schools= "";
            schoolService.getSchools(map, new_center, $scope);
            $scope.date = new Date();
            //console.log($scope.date);
        }, function(response) {
            $("#overlay").hide();
        });
        $scope.getProperty;
        propertyService.addView($scope.id);
    }]);
});