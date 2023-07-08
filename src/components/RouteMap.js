import React from 'react';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import bn01Go from '../data/bus-routes/bn01-go.json';
import bn01Back from '../data/bus-routes/bn01-back.json';
import bn02Go from '../data/bus-routes/bn02-go.json';
import bn02Back from '../data/bus-routes/bn02-back.json';
import bn03Go from '../data/bus-routes/bn03-go.json';
import bn03Back from '../data/bus-routes/bn03-back.json';
import bn08Go from '../data/bus-routes/bn08-go.json';
import bn08Back from '../data/bus-routes/bn08-back.json';
import bn27Go from '../data/bus-routes/bn27-go.json';
import bn27Back from '../data/bus-routes/bn27-back.json';
import bn68Go from '../data/bus-routes/bn68-go.json';
import bn68Back from '../data/bus-routes/bn68-back.json';
import bn86aGo from '../data/bus-routes/bn86a-go.json';
import bn86aBack from '../data/bus-routes/bn86a-back.json';
import bn86bGo from '../data/bus-routes/bn86b-go.json';
import bn86bBack from '../data/bus-routes/bn86b-back.json';
import b54Go from '../data/bus-routes/54-go.json';
import b54Back from '../data/bus-routes/54-back.json';
import b217Go from '../data/bus-routes/217-go.json';
import b217Back from '../data/bus-routes/217-back.json';
import { bus_stop_list_bSE } from '../data/bus-stop/bSE';
import { bus_stop_list_bn01 } from '../data/bus-stop/bn01';
import { bus_stop_list_bn02 } from '../data/bus-stop/bn02';
import { bus_stop_list_bn08 } from '../data/bus-stop/bn08';
import { bus_stop_list_bn86a } from '../data/bus-stop/bn86a';
import { bus_stop_list_bn86b } from '../data/bus-stop/bn86b';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FhZGlxbSIsImEiOiJjamJpMXcxa3AyMG9zMzNyNmdxNDlneGRvIn0.wjlI8r1S_-xxtq2d-W5qPA';

export default class RouteMap extends React.Component {
  first = true;

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [106.0804849, 21.1169071],
      zoom: 11
    });

    //init page load soure & layer (route line) null
    initPage(this.map);

    //init page load marker (bus_stop_list) start-end bus stop
    loadMarker(this.map, bus_stop_list_bSE);
  };

  componentDidUpdate() {
    //first change routeId => clear all init route
    if (this.first) {
      clearInitPage(this.map);
      this.first = false;
    }

    if (this.props.routeId === "BN01") {
      setDataSoure(this.map, 'Bus Route Go', [bn01Go]);
      setDataSoure(this.map, 'Bus Route Back', [bn01Back]);
      loadMarker(this.map, bus_stop_list_bn01);
    } else if (this.props.routeId === "BN02") {
      setDataSoure(this.map, 'Bus Route Go', [bn02Go]);
      setDataSoure(this.map, 'Bus Route Back', [bn02Back]);
      loadMarker(this.map, bus_stop_list_bn02);
    } else if (this.props.routeId === "BN03") {
      setDataSoure(this.map, 'Bus Route Go', [bn03Go]);
      setDataSoure(this.map, 'Bus Route Back', [bn03Back]);
    } else if (this.props.routeId === "BN08") {
      setDataSoure(this.map, 'Bus Route Go', [bn08Go]);
      setDataSoure(this.map, 'Bus Route Back', [bn08Back]);
      loadMarker(this.map, bus_stop_list_bn08);
    } else if (this.props.routeId === "BN27") {
      setDataSoure(this.map, 'Bus Route Go', [bn27Go]);
      setDataSoure(this.map, 'Bus Route Back', [bn27Back]);
    } else if (this.props.routeId === "BN68") {
      setDataSoure(this.map, 'Bus Route Go', [bn68Go]);
      setDataSoure(this.map, 'Bus Route Back', [bn68Back]);
    } else if (this.props.routeId === "BN86A") {
      setDataSoure(this.map, 'Bus Route Go', [bn86aGo]);
      setDataSoure(this.map, 'Bus Route Back', [bn86aBack]);
      loadMarker(this.map, bus_stop_list_bn86a);
    } else if (this.props.routeId === "BN86B") {
      setDataSoure(this.map, 'Bus Route Go', [bn86bGo]);
      setDataSoure(this.map, 'Bus Route Back', [bn86bBack]);
      loadMarker(this.map, bus_stop_list_bn86b);
    } else if (this.props.routeId === "54") {
      setDataSoure(this.map, 'Bus Route Go', [b54Go]);
      setDataSoure(this.map, 'Bus Route Back', [b54Back]);
    } else if (this.props.routeId === "217") {
      setDataSoure(this.map, 'Bus Route Go', [b217Go]);
      setDataSoure(this.map, 'Bus Route Back', [b217Back]);
    };

    if (document.getElementById(this.props.markerId)) {
      // document.getElementById(this.props.markerId).style.width = "100px";
      // document.getElementById(this.props.markerId).style.height = "100px";
      document.getElementById(this.props.markerId).innerHTML += '<p>Ở đây</p>'
    }
  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} style={{ width: '75vw', height: '90vh' }} />
      </div>
    );
  }
}

function initPage(map) {
  addSourceLayer(map, 'Init Route BN01 Go', [bn01Go], 'blue');
  addSourceLayer(map, 'Init Route BN01 Back', [bn01Back], 'red');
  addSourceLayer(map, 'Init Route BN02 Go', [bn02Go], 'blue');
  addSourceLayer(map, 'Init Route BN02 Back', [bn02Back], 'red');
  addSourceLayer(map, 'Init Route BN03 Go', [bn03Go], 'blue');
  addSourceLayer(map, 'Init Route BN03 Back', [bn03Back], 'red');
  addSourceLayer(map, 'Init Route BN08 Go', [bn08Go], 'blue');
  addSourceLayer(map, 'Init Route BN08 Back', [bn08Back], 'red');
  addSourceLayer(map, 'Init Route BN27 Go', [bn27Go], 'blue');
  addSourceLayer(map, 'Init Route BN27 Back', [bn27Back], 'red');
  addSourceLayer(map, 'Init Route BN68 Go', [bn68Go], 'blue');
  addSourceLayer(map, 'Init Route BN68 Back', [bn68Back], 'red');
  addSourceLayer(map, 'Init Route BN86A Go', [bn86aGo], 'blue');
  addSourceLayer(map, 'Init Route BN86A Back', [bn86aBack], 'red');
  addSourceLayer(map, 'Init Route BN86B Go', [bn86bGo], 'blue');
  addSourceLayer(map, 'Init Route BN86B Back', [bn86bBack], 'red');
  addSourceLayer(map, 'Init Route 54 Go', [b54Go], 'blue');
  addSourceLayer(map, 'Init Route 54 Back', [b54Back], 'red');
  addSourceLayer(map, 'Init Route 217 Go', [b217Go], 'blue');
  addSourceLayer(map, 'Init Route 217 Back', [b217Back], 'red');
  addSourceLayer(map, 'Bus Route Go', [], 'blue');
  addSourceLayer(map, 'Bus Route Back', [], 'red');
}

function clearInitPage(map) {
  map.removeLayer('Init Route BN01 Go').removeSource('Init Route BN01 Go');
  map.removeLayer('Init Route BN01 Back').removeSource('Init Route BN01 Back');
  map.removeLayer('Init Route BN02 Go').removeSource('Init Route BN02 Go');
  map.removeLayer('Init Route BN02 Back').removeSource('Init Route BN02 Back');
  map.removeLayer('Init Route BN03 Go').removeSource('Init Route BN03 Go');
  map.removeLayer('Init Route BN03 Back').removeSource('Init Route BN03 Back');
  map.removeLayer('Init Route BN08 Go').removeSource('Init Route BN08 Go');
  map.removeLayer('Init Route BN08 Back').removeSource('Init Route BN08 Back');
  map.removeLayer('Init Route BN27 Go').removeSource('Init Route BN27 Go');
  map.removeLayer('Init Route BN27 Back').removeSource('Init Route BN27 Back');
  map.removeLayer('Init Route BN68 Go').removeSource('Init Route BN68 Go');
  map.removeLayer('Init Route BN68 Back').removeSource('Init Route BN68 Back');
  map.removeLayer('Init Route BN86A Go').removeSource('Init Route BN86A Go');
  map.removeLayer('Init Route BN86A Back').removeSource('Init Route BN86A Back');
  map.removeLayer('Init Route BN86B Go').removeSource('Init Route BN86B Go');
  map.removeLayer('Init Route BN86B Back').removeSource('Init Route BN86B Back');
  map.removeLayer('Init Route 54 Go').removeSource('Init Route 54 Go');
  map.removeLayer('Init Route 54 Back').removeSource('Init Route 54 Back');
  map.removeLayer('Init Route 217 Go').removeSource('Init Route 217 Go');
  map.removeLayer('Init Route 217 Back').removeSource('Init Route 217 Back');
}

function addSourceLayer(map, idSoureLayer, coordinates, color) {
  map.on('load', () => { //Get initial geojson data from Calgary Open Data
    let geojson = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": coordinates } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };

    try {
      map.addSource(idSoureLayer, {
        type: 'geojson',
        data: geojson
      });
      map.addLayer({
        "id": idSoureLayer,
        "type": "line",
        "source": idSoureLayer,
        "paint": {
          "line-color": color,
          "line-width": 4,
          "line-opacity": 0.5
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
      });
    } catch (error) { }
  });
}

function setDataSoure(map, idSoureLayer, coordinates) {
  let geojson = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": coordinates } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
  map.getSource(idSoureLayer).setData(geojson);
}

function loadMarker(map, bus_stop_list) {
  const elements = document.getElementsByClassName('mapboxgl-marker'); //clear all old markers
  while (elements.length > 0) elements[0].remove();
  // add markers to map
  for (const feature of bus_stop_list.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';
    el.id = feature.markerId;
    const elGo = document.createElement('div');
    elGo.className = 'marker-blue';
    elGo.id = feature.markerId;
    const elBack = document.createElement('div');
    elBack.className = 'marker-red';
    elBack.id = feature.markerId;

    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(feature.color ? (feature.color === 'blue' ? elGo : elBack) : el).setLngLat(feature.geometry.coordinates).setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `<div>`
          + (feature.properties.title ? (`<b>` + feature.properties.title + `</b></br>`) : '')
          + (feature.properties.description ? (`<small>Đ/c: ` + feature.properties.description + `</small></br>`) : '')
          + (feature.properties.router ? (`<small>Tuyến: ` + feature.properties.router + `</small>`) : '') +
          `</div>`
        )
    ).addTo(map);
  };
}