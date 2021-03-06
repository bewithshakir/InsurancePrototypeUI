import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import logo from "./../../../assets/images/icons8-sedan-26.png";

let m = -1;
let iconRotation = 0;
let googleMap = null;

//static let markersToDeleteArray = []

export const GetMap = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id="map" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export function GoogleMap(props) {
  this.map = null;
  this.directionsService = null;
  this.marker = [];
  this.polyLine = [];
  this.poly2 = [];
  this.latLongArr = [];
  this.startLocation = [];
  this.endLocation = [];
  this.timerHandle = [];
  this.infoWindow = null;
  this.index = 0;
  this.startLoc = [];
  this.endLoc = [];
  this.accidentCoordinates = null;

  this.lastVertex = 1;
  this.step = 50; // 5; // metres
  this.eol = [];
  // this.car =``
  this.car =
    "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
  this.icon = {
    path: this.car,
    scale: 0.7,
    strokeColor: "black",
    strokeWeight: 0.1,
    fillOpacity: 1,
    fillColor: "yellow",
    offset: "5%",
    zIndex: 2147483638,
    // rotation: parseInt(heading[i]),
    anchor: new window.google.maps.Point(10, 25) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
  };
  this.updatePoly = updatePoly;
  this.cardata = [];
  this.cardataforAnimation = [];
}

export function startmap() {
  map = new window.google.maps.Map(document.getElementById("map"), {
    zoom: 30,
    streetViewControl: false,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
      }
    ]
  });
  return map || null;
}

// Using Directions Service find the route between the starting and ending points
export function setRoutes() {
  let self = this;
  // this.cardataforAnimation = this.cardata.map(item => {
  //   return {
  //     location: new window.google.maps.LatLng(item.lat, item.lng),
  //     stopover: false
  //   };
  // });

  //var startVal = self.cardata[0].location; //this.state.routeArray[0].location;
  //var endVal = self.cardata[this.cardata.length - 1].location; //this.state.routeArray[this.state.routeArray.length - 1] //document.getElementById("end").value;
  // if (!startVal || !endVal) {
  //   console.log("start and end locations missing");
  //   return;
  // }
  // // just to avoid weird case of same start and end location
  // if (startVal === endVal) {
  //   console.log("Please enter different locations in both inputs");
  //   return;
  // }
  //let startLoc = [];
  //let endLoc = [];
  //startLoc[0] = startVal;
  //endLoc[0] = endVal;
  //empty out previous values
  self.startLocation = [];
  self.endLocation = [];
  self.polyLine = [];
  self.poly2 = [];
  self.timerHandle = [];

  console.log("setRoutes self", self);

  var directionsDisplay = new Array();
  //return self;
  for (
    var k = 0, parts = [], max = 23 - 1;
    k < this.cardata.length;
    k = k + max
  )
    parts.push(this.cardata.slice(k, k + max + 1));
  console.log("parts >>>>>>>>>>>>>>", parts);

  //for (var i = 0; i < startLoc.length; i++) {
  for (let i = 0; i < parts.length; i++) {
    this.markersToDeleteArray = [];
    // Waypoints does not include first station (origin) and last station (destination)
    var waypoints = [];
    for (let j = 1; j < parts[i].length - 1; j++)
      waypoints.push({ location: parts[i][j], stopover: false });
    let rendererOptions = {
      map: map,
      suppressMarkers: true,
      preserveViewport: true
    };
    let directionsService = new window.google.maps.DirectionsService();
    //var directionsrenderer = new window.google.maps.DirectionsRenderer({ map: map });
    let travelMode = window.google.maps.DirectionsTravelMode.DRIVING;
    console.log("waypoints>>>>>>>>>>>>>", waypoints);
    // waypoints = waypoints.map(point => {return {
    //   "location" :
    // }})
    let request = {
      origin: parts[i][0],
      destination: parts[i][parts[i].length - 1], //origin: startLoc[i], //new window.google.maps.LatLng(,-122.419418),//
      //destination: endLoc[i], //new window.google.maps.LatLng(37.804363,-122.271111),//
      waypoints: waypoints, //this.cardata.slice(1, this.cardata.length - 1),
      //optimizeWaypoints: true,
      travelMode: travelMode
    };
    // this.markersToDeleteArray.push(parts[i][0]);
    // this.markersToDeleteArray.push(parts[i][parts[i].length - 1]);

    console.log("request>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", request);

    directionsService.route(
      request,
      makeRouteCallback.call(this, map, i, directionsDisplay[i]),
      rendererOptions
    );
    googleMap = this;
  }
}

// start marker movement by updating marker position every 100 milliseconds i.e. tick value
export function startAnimation(index) {
  //console.log("start Animation", this);
  if (this.timerHandle[index]) {
    //this.marker.setIcon("../../assets/images/icons8-sedan-26.png");
    clearTimeout(this.timerHandle[index]);
  }

  let self = this;
  //console.log("start animation this", this);
  // this.timerHandle[index] = setTimeout(() => {
  animate.call(self, index, self.cardataforAnimation[0].location);
  //}, 0); // Allow time for the initial map display
  this.index = index;
  //} else {
  //return;
  //}
}

export function resetMap() {
  map = null;
}

export function stopMovement() {
  console.log("stopMovement called");
  // console.log("this.timerHandle", this.timerHandle[this.index]);
  //clearTimeout(this.timerHandle[this.index]);
  clearTimeout(this.animateTimeOut);
}

export function startMovement() {
  let self = this;
  console.log("currentLatLng", this.currentLatLng);
  if (this.currentLatLng) {
    //this.timerHandle[this.index] = setTimeout(() => {
    animate.call(self, this.index, this.currentLatLng);
    //}, 0);
  }
}

export function resetStartingPosition() {
  console.log("resetStartingPosition called");
  this.IsSameRoute = true;
  console.log("this.d", this.d);
  if (this.d) {
    this.d = this.cardataforAnimation[0]
      ? this.cardataforAnimation[0].location
      : this.d;
  }
}

export function RePositionBySlider(tick) {}

export function getTimeVal(index, curTime) {
  // console.log("from google map----", this);
  if (curTime < this.cardataforAnimation.length) {
    moveCarOnPath(this, index, curTime);
  }

  // console.log("m--", m);
}
//called after getting route from directions service, does all the heavylifting
function makeRouteCallback(map, routeNum, disp, rendererOptions) {
  console.log("makeRouteCallback this", this);
  let self = this;
  // check if polyline and map exists, if yes, no need to do anything else, just start the animation
  if (this.polyLine[routeNum] && this.polyLine[routeNum].getMap() != null) {
    console.log("polyline and map exists,just start the animation.....");
    self.startAnimation(routeNum);
    return;
  }
  this.disp = disp;
  this.rendererOptions = rendererOptions;
  return callback.bind(this);
}

function callback(response, status) {
  // return function(, ) {
  // if directions service successfully returns and no polylines exist already, then do the following
  if (status == window.google.maps.DirectionsStatus.ZERO_RESULTS) {
    return;
  }
  if (status == window.google.maps.DirectionsStatus.OK) {
    //console.log("this inside", this);
    //console.log("this.startLocation",typeof this.startLocation);

    this.startLocation[0] = new Object();
    this.endLocation[0] = new Object();
    // set up polyline for current route
    this.polyLine[0] = new window.google.maps.Polyline({
      path: [],
      strokeColor: "#FFFF00",
      strokeWeight: 3
    });
    this.poly2[0] = new window.google.maps.Polyline({
      path: [],
      strokeColor: "#FFFF00",
      strokeWeight: 3
    });
    //For each route, display summary information.
    var legs = response.routes[0].legs;
    // directionsrenderer renders the directions obtained previously by the directions service
    this.disp = new window.google.maps.DirectionsRenderer(this.rendererOptions);
    //create Markers
    // for (let i = 0; i < legs.length; i++) {
    //   for first marker only
    //   if (i == 0) {
    //     if (legs && legs.length > 0) {
    //       this.startLocation[0].latlng = legs[i].start_location;
    //       this.startLocation[0].address = legs[i].start_address;
    //       this.marker[0] = createMarker.call(
    //         this,
    //         map,
    //         legs[i].start_location,
    //         "start",
    //         legs[i].start_address,
    //         "green"
    //       );
    //     }
    //     this.endLocation[0].latlng = legs[i].end_location;
    //     this.endLocation[0].address = legs[i].end_address;
    //     var steps = legs[i].steps;
    //     console.log("steps", steps);
    //     for (let j = 0; j < steps.length; j++) {
    //       let nextSegment = steps[j].path;
    //       for (let k = 0; k < nextSegment.length; k++) {
    //         console.log("nextSegment", nextSegment[k]);
    //         this.polyLine[0].getPath().push(nextSegment[k]);
    //       }
    //     }
    //   }
    // }
    this.marker[0] = createMarker.call(
      this,
      map,
      legs[0].end_location, //this.cardataforAnimation[0].location,
      "start",
      legs[0].start_address,
      "green"
    );
    this.disp.setOptions({
      polylineOptions: {
        strokeWeight: 5,
        strokeOpacity: 1,
        strokeColor: "#5cafa6"
      }
    });
    this.disp.setMap(map);
    this.disp.setDirections(response);
    //console.log("markersToDeleteArray", this.marker[0]);

    //removeMarkers();
  }
  // if (this.polyLine[0]) {
  //   // render the line to map
  //   this.polyLine[0].setMap(map);
  // }
}

// returns the marker
function createMarker(map, latlng, label, html, icon) {
  var contentString = "<b>" + label + "</b><br>" + html;
  let options = {
    position: latlng,
    map: map,
    title: label,
    zIndex: 10
  };

  if (icon == 1) {
    var image = {
      url:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new window.google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new window.google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new window.google.maps.Point(0, 32)
    };
    options.icon = image;
  }
  // using Marker api, marker is created
  var marker = new window.google.maps.Marker(options);
  marker.myname = label;
  // adding click listener to open up info window when marker is clicked
  window.google.maps.event.addListener(marker, "click", function() {
    // this.infoWindow.setContent(contentString);
    // this.infoWindow.open(map, marker);
  });
  return marker;
}

// Spawn a new polyLine every 20 vertices
function updatePoly(i, d) {
  console.log("updatepOLY THIS", this);
  if (this.poly2[i].getPath().getLength() > 20) {
    this.poly2[i] = new window.google.maps.Polyline([
      this.polyLine[i].getPath().getAt(this.lastVertex - 1)
    ]);
  }

  if (this.polyLine[i].GetIndexAtDistance(d) < this.lastVertex + 2) {
    if (this.poly2[i].getPath().getLength() > 1) {
      this.poly2[i].getPath().removeAt(this.poly2[i].getPath().getLength() - 1);
    }
    this.poly2[i]
      .getPath()
      .insertAt(
        this.poly2[i].getPath().getLength(),
        this.polyLine[i].GetPointAtDistance(d)
      );
  } else {
    this.poly2[i]
      .getPath()
      .insertAt(
        this.poly2[i].getPath().getLength(),
        this.endLocation[i].latlng
      );
  }
}

// updates marker position to make the animation and update the polyline
function animate(index, d, tick, carDataId, gMap) {
  // if (
  //   (m >= this.cardataforAnimation.length - 1 || m === null) &&
  //   this.marker[index]
  // ) {
  //   this.marker[index].setPosition(
  //     this.cardataforAnimation[this.cardataforAnimation.length - 1].location
  //   );
  //   console.log(
  //     "inside iffff",
  //     index,
  //     this.cardataforAnimation[this.cardataforAnimation.length - 1].location
  //   );
  //   //clearTimeout(this.timerHandle[index]);
  //   if (this.animateTimeOut) clearTimeout(this.animateTimeOut);
  //   return;
  // }
  let self = this;

  // if (this.animateTimeOut) clearTimeout(this.animateTimeOut);

  m++;
  // this.animateTimeOut = setTimeout(() => {
  //   animate.call(
  //     self,
  //     index,
  //     self.cardataforAnimation[m] ? self.cardataforAnimation[m].location : null
  //   );
  //   console.log(
  //     "last location lng------",
  //     self.cardataforAnimation[m].location.lng()
  //   );
  // }, 1000);

  // setMarker(
  //   this.marker[index],
  //   this.icon,
  //   self.cardataforAnimation[m].location
  // );

  if (carDataId) {
    setMarker(
      this.marker[index],
      this.icon,
      self.cardataforAnimation[carDataId].location
    );

    console.log("carDataId------", carDataId);
  }
}

function setMarker(marker, icon, TestD) {
  if (marker) {
    var lastPosn = marker.getPosition();
    marker.setPosition(TestD);
    iconRotation = window.google.maps.geometry.spherical.computeHeading(
      lastPosn,
      TestD
    );

    icon.rotation = iconRotation;
    marker.setIcon(icon);
  }
}

function moveCarOnPath(self, index, curTime) {
  // start animation
  // animate.call(self, index, self.cardataforAnimation[0].location);
  // animate(0, gMap.cardataforAnimation[latLngPos].location, 0, latLngPos);
  // console.log("playing......", curTime, gMap);
  if (self) {
    // index, d, tick, carDataId, self
    animate.call(
      self,
      index,
      self.cardataforAnimation[curTime].location,
      0,
      curTime
    );
    // animate(
    //   0,
    //   gMap.cardataforAnimation[latLngPos].location,
    //   0,
    //   latLngPos,
    //   gMap
    // );
  }
  // animate(0,)
  // console.log("moving car", gMap.cardataforAnimation[latLngPos].location.lng());
  // console.log("latLngPos", latLngPos);
  // animate.call(
  //   gMap,
  //   0,
  //   gMap.cardataforAnimation[latLngPos]
  //     ? gMap.cardataforAnimation[latLngPos].location
  //     : null
  // );
  // gMap.animateTimeOut = setTimeout(() => {
  //   animate.call(
  //     gMap,
  //     0,
  //     gMap.cardataforAnimation[latLngPos]
  //       ? gMap.cardataforAnimation[latLngPos].location
  //       : null
  //   );
  // }, 1000);
}

let map = null;
