(() => {
  "use strict";
  // The script is supposed to change the style of the map, making it black and 
  // white. The style array is taken from:
  // https://snazzymaps.com/style/151/ultra-light-with-labels

  // For initialization, script with such a url is needed to be attached to
  // the page:
  // "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
  // Official documentation: 
  // https://developers.google.com/maps/documentation/javascript/styling

  // Since it's not a real web application, let's omit initialization for the 
  // time being.

  function initMap() {
    const ultraLightWithLabelsStyleArray = [
      { 
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          { "color": "#e9e9e9" },
          { "lightness": 17 }
        ] 
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          { "color": "#f5f5f5" },
          { "lightness": 20 }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#ffffff" },
          { "lightness": 17 }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          { "color": "#ffffff" },
          { "lightness": 29 },
          { "weight": 0.2 }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          { "color": "#ffffff" },
          { "lightness": 18 }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          { "color": "#ffffff" },
          { "lightness": 16 }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          { "color": "#f5f5f5" },
          { "lightness": 21 }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          { "color": "#dedede" },
          { "lightness": 21 }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          { "visibility": "on" },
          { "color": "#ffffff" },
          { "lightness": 16 }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          { "saturation": 36 },
          { "color": "#333333" },
          { "lightness": 40 }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          { "visibility": "off" }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          { "color": "#f2f2f2" },
          { "lightness": 19 }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#fefefe" },
          { "lightness": 20 }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          { "color": "#fefefe" },
          { "lightness": 17 },
          { "weight": 1.2 }
        ]
      }
    ];

    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    const styledMapType = new google.maps.StyledMapType(
      ultraLightWithLabelsStyleArray,
      { name: "Styled Map" }
    );

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 55.647, lng: 37.581 },
      zoom: 11,
      mapTypeControlOptions: {
        mapTypeIds: [
         "roadmap", "satellite", "hybrid", "terrain", "styled_map"
        ]
      }
    });

    // Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set("styled_map", styledMapType);
    map.setMapTypeId("styled_map");
  }
})();