"use strict";

function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
    function e(e, n) {
        for (var a = 0; a < n.length; a++) {
            var t = n[a];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, a, t) {
        return a && e(n.prototype, a), t && e(n, t), n;
    };
}();

!function() {
    var e = function() {
        function e() {
            _classCallCheck(this, e);
        }
        return _createClass(e, null, [ {
            key: "get",
            value: function(e) {
                if (!navigator.geolocation) return alert("No pudimos detectar el lugar en el que te encuentras"), 
                {
                    lat: 0,
                    lng: 0
                };
                navigator.geolocation.getCurrentPosition(function(n) {
                    e({
                        lat: n.coords.latitude,
                        lng: n.coords.longitude
                    });
                });
            }
        } ]), e;
    }(), n = {
        lat: -12.077081,
        lng: -77.016841
    };
    google.maps.event.addDomListener(window, "load", function() {
        var a = new google.maps.Map(document.getElementById("map"), {
            center: n,
            zoom: 15
        });
        new google.maps.Marker({
            map: a,
            position: n,
            title: "Camas y Colchones Lugue",
            visible: !0
        });
        e.get(function(e) {
            var a = new google.maps.LatLng(e.lat, e.lng), t = new google.maps.LatLng(n.lat, n.lng);
            new google.maps.DistanceMatrixService().getDistanceMatrix({
                origins: [ a ],
                destinations: [ t ],
                travelMode: google.maps.TravelMode.DRIVING
            }, function(e, n) {
                if (n === google.maps.DistanceMatrixStatus.OK) {
                    var a = e.rows[0].elements[0].duration.text;
                    document.querySelector("#message").innerHTML = "Estas a " + a + ' de llegar a nuestra tienda \n                    <span class="dancing-script medium">Camas y Colchones Lugue</span>';
                }
            });
        });
    });
}();
//# sourceMappingURL=maps.js.map