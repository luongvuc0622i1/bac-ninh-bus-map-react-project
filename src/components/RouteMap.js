import React from 'react';
import mapboxgl from "mapbox-gl";
import { center } from 'turf';
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
import b10aGo from '../data/bus-routes/10a-go.json';
import b10aBack from '../data/bus-routes/10a-back.json';
import b54Go from '../data/bus-routes/54-go.json';
import b54Back from '../data/bus-routes/54-back.json';
import b204Go from '../data/bus-routes/204-go.json';
import b204Back from '../data/bus-routes/204-back.json';
import b217Go from '../data/bus-routes/217-go.json';
import b217Back from '../data/bus-routes/217-back.json';
import { stations } from '../data/stations/stations';
import { stationsSE } from '../data/stations/stationsSE';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FhZGlxbSIsImEiOiJjamJpMXcxa3AyMG9zMzNyNmdxNDlneGRvIn0.wjlI8r1S_-xxtq2d-W5qPA';

export default class RouteMap extends React.Component {
  first = true;

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [106.0804849, 21.1169071],
      zoom: 10.5
    });

    //init page load soure & layer (route line) null
    initPage(this.map);

    //init page load marker (bus_stop_list) start-end bus stop
    initLoadMarker(this.map);
  };

  componentDidUpdate() {
    if (this.props.routeId) {
      //first change routeId => clear all init route
      if (this.first) {
        clearInitPage(this.map);
        this.first = false;
      }

      if (this.props.routeId === "BN01") {
        setDataSoure(this.map, 'Bus Route Go', [bn01Go], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [bn01Back], this.props.routeId);
      } else if (this.props.routeId === "BN02") {
        setDataSoure(this.map, 'Bus Route Go', [bn02Go], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [bn02Back], this.props.routeId);
      } else if (this.props.routeId === "BN03") {
        setDataSoure(this.map, 'Bus Route Go', [bn03Go], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [bn03Back], this.props.routeId);
      } else if (this.props.routeId === "BN08") {
        setDataSoure(this.map, 'Bus Route Go', [bn08Go], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [bn08Back], this.props.routeId);
      } else if (this.props.routeId === "BN27") {
        setDataSoure(this.map, 'Bus Route Go', [bn27Go], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [bn27Back], this.props.routeId);
      } else if (this.props.routeId === "BN68") {
        setDataSoure(this.map, 'Bus Route Go', [bn68Go], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [bn68Back], this.props.routeId);
      } else if (this.props.routeId === "BN86A") {
        setDataSoure(this.map, 'Bus Route Go', [bn86aGo], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [bn86aBack], this.props.routeId);
      } else if (this.props.routeId === "BN86B") {
        setDataSoure(this.map, 'Bus Route Go', [bn86bGo], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [bn86bBack], this.props.routeId);
      } else if (this.props.routeId === "10A") {
        setDataSoure(this.map, 'Bus Route Go', [b10aGo], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [b10aBack], this.props.routeId);
      } else if (this.props.routeId === "54") {
        setDataSoure(this.map, 'Bus Route Go', [b54Go], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [b54Back], this.props.routeId);
      } else if (this.props.routeId === "204") {
        setDataSoure(this.map, 'Bus Route Go', [b204Go], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [b204Back], this.props.routeId);
      } else if (this.props.routeId === "217") {
        setDataSoure(this.map, 'Bus Route Go', [b217Go], this.props.routeId);
        setDataSoure(this.map, 'Bus Route Back', [b217Back], this.props.routeId);
      };
      loadMarker(this.map, this.props.routeId);
    } else {
      // must load again funtion initLoadMarker because the last funtion in componentDidMount() not run in componentDidUpdate()
      const elements = document.getElementsByClassName('mapboxgl-marker'); //clear all old markers
      while (elements.length > 0) elements[0].remove();
      initLoadMarker(this.map);
    }

    // event click list bus stop in menu => map
    if (document.getElementById(this.props.markerId)) {
      // for all marker have opacity = 0.3
      const elements = document.getElementsByClassName('mapboxgl-marker');
      for (const element of elements) {
        element.style.opacity = "0.3";
      }
      const elementsNode = document.getElementsByClassName('marker-node');
      for (const element of elementsNode) {
        element.style.opacity = "1";
      }
      document.getElementById(this.props.markerId).style.backgroundImage = "url(../images/bus-stop-here.png)";
      document.getElementById(this.props.markerId).style.marginTop = "-40px"
      document.getElementById(this.props.markerId).style.width = "80px";
      document.getElementById(this.props.markerId).style.height = "80px";
      document.getElementById(this.props.markerId).style.opacity = "1";
    }
  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} style={{ width: 'calc(100vw - 390px)', height: 'calc(100vh - 55px)' }} />
      </div>
    );
  }
}

function initPage(map) {
  addSourceLayer(map, 'Init Route BN01 Back', [bn01Back], 'red');
  addSourceLayer(map, 'Init Route BN01 Go', [bn01Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN02 Back', [bn02Back], 'red');
  addSourceLayer(map, 'Init Route BN02 Go', [bn02Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN03 Back', [bn03Back], 'red');
  addSourceLayer(map, 'Init Route BN03 Go', [bn03Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN08 Back', [bn08Back], 'red');
  addSourceLayer(map, 'Init Route BN08 Go', [bn08Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN27 Back', [bn27Back], 'red');
  addSourceLayer(map, 'Init Route BN27 Go', [bn27Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN68 Back', [bn68Back], 'red');
  addSourceLayer(map, 'Init Route BN68 Go', [bn68Go], '#3e8e41');
  addSourceLayer(map, 'Init Route BN86A Back', [bn86aBack], 'red');
  addSourceLayer(map, 'Init Route BN86A Go', [bn86aGo], '#3e8e41');
  addSourceLayer(map, 'Init Route BN86B Back', [bn86bBack], 'red');
  addSourceLayer(map, 'Init Route BN86B Go', [bn86bGo], '#3e8e41');
  addSourceLayer(map, 'Init Route 10A Back', [b10aBack], 'red');
  addSourceLayer(map, 'Init Route 10A Go', [b10aGo], '#3e8e41');
  addSourceLayer(map, 'Init Route 54 Back', [b54Back], 'red');
  addSourceLayer(map, 'Init Route 54 Go', [b54Go], '#3e8e41');
  addSourceLayer(map, 'Init Route 204 Back', [b204Back], 'red');
  addSourceLayer(map, 'Init Route 204 Go', [b204Go], '#3e8e41');
  addSourceLayer(map, 'Init Route 217 Back', [b217Back], 'red');
  addSourceLayer(map, 'Init Route 217 Go', [b217Go], '#3e8e41');
  addSourceLayer(map, 'Bus Route Back', [], 'red');
  addSourceLayer(map, 'Bus Route Go', [], '#3e8e41');
}

function initLoadMarker(map) {
  for (const feature of stations.features) {
    // create a HTML element for each feature
    const elSE = document.createElement('div');
    elSE.className = 'marker-green';
    elSE.id = feature.properties.id;
    const el = document.createElement('div');
    el.className = 'marker-init';
    const el0108217 = document.createElement('div');
    el0108217.className = 'marker-node marker-01-08-217';
    const el0127 = document.createElement('div');
    el0127.className = 'marker-node marker-01-27';
    const el0286212 = document.createElement('div');
    el0286212.className = 'marker-node marker-02-86-212';
    const el0286 = document.createElement('div');
    el0286.className = 'marker-node marker-02-86';
    const el0886 = document.createElement('div');
    el0886.className = 'marker-node marker-08-86';
    const el27204 = document.createElement('div');
    el27204.className = 'marker-node marker-27-204';
    const el6854203 = document.createElement('div');
    el6854203.className = 'marker-node marker-68-54-203';
    const el1054210 = document.createElement('div');
    el1054210.className = 'marker-node marker-10-54-210';

    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(feature.properties.id === '0108217' ? el0108217 :
      feature.properties.id === '0127' ? el0127 :
        feature.properties.id === '0286212' ? el0286212 :
          feature.properties.id === '0286' ? el0286 :
            feature.properties.id === '0886' ? el0886 :
              feature.properties.id === '27204' ? el27204 :
                feature.properties.id === '6854203' ? el6854203 :
                  feature.properties.id === '1054210' ? el1054210 :
                    feature.geometry.type === 'Point' ? el : elSE
    ).setLngLat(feature.geometry.coordinates).setPopup(
      new mapboxgl.Popup( feature.geometry.type === 'Point' ? '' : { offset: 25 }) // add popups
        .setHTML(
          '<div>'
          + (feature.properties.name ? ('<b>' + feature.properties.name + '</b></br>') : ('<b>' + feature.properties.address + '</b></br>'))
          + (feature.properties.name && feature.properties.address ? ('<small>Đ/c: ' + feature.properties.address + ', </small>') : '')
          + (feature.properties.ward ? ('<small>' + feature.properties.ward + ', </small>') : '')
          + ('<small>' + feature.properties.district + '</small><br/>')
          + ('<small>Tuyến: ' + renderRouteList(feature.properties.routers) + '</small>') +
          '</div>'
        )
    ).addTo(map);
  }

  // // add markers to map
  // for (const feature of stationsSE.features) {
  //   // create a HTML element for each feature
  //   const elSE = document.createElement('div');
  //   elSE.className = 'marker-green';
  //   elSE.id = feature.properties.id;
  //   const el0108217 = document.createElement('div');
  //   el0108217.className = 'marker-node marker-01-08-217';
  //   const el0127 = document.createElement('div');
  //   el0127.className = 'marker-node marker-01-27';
  //   const el0286212 = document.createElement('div');
  //   el0286212.className = 'marker-node marker-02-86-212';
  //   const el0286 = document.createElement('div');
  //   el0286.className = 'marker-node marker-02-86';
  //   const el0886 = document.createElement('div');
  //   el0886.className = 'marker-node marker-08-86';
  //   const el27204 = document.createElement('div');
  //   el27204.className = 'marker-node marker-27-204';
  //   const el6854203 = document.createElement('div');
  //   el6854203.className = 'marker-node marker-68-54-203';
  //   const el1054210 = document.createElement('div');
  //   el1054210.className = 'marker-node marker-10-54-210';

  //   // make a marker for each feature and add it to the map
  //   new mapboxgl.Marker(feature.properties.id === '0108217' ? el0108217 :
  //     feature.properties.id === '0127' ? el0127 :
  //       feature.properties.id === '0286212' ? el0286212 :
  //         feature.properties.id === '0286' ? el0286 :
  //           feature.properties.id === '0886' ? el0886 :
  //             feature.properties.id === '27204' ? el27204 :
  //               feature.properties.id === '6854203' ? el6854203 :
  //                 feature.properties.id === '1054210' ? el1054210 :
  //                   elSE
  //   ).setLngLat(feature.geometry.coordinates).setPopup(
  //     new mapboxgl.Popup({ offset: 25 }) // add popups
  //       .setHTML(
  //         `<div>`
  //         + (`<b>` + feature.properties.name + `</b></br>`)
  //         + (feature.properties.description ? (`<small>` + feature.properties.description + `</small></br>`) : '')
  //         + (feature.properties.address ? ('<small>Đ/c: ' + feature.properties.address + ', </small>') : '')
  //         + (feature.properties.ward ? ('<small>' + feature.properties.ward + ', </small>') : '')
  //         + (feature.properties.district ? ('<small>' + feature.properties.district + '</small><br/>') : '')
  //         + (`<small>Tuyến: ` + feature.properties.routers + `</small>`) +
  //         `</div>`
  //       )
  //   ).addTo(map);
  // };
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
  map.removeLayer('Init Route 10A Go').removeSource('Init Route 10A Go');
  map.removeLayer('Init Route 10A Back').removeSource('Init Route 10A Back');
  map.removeLayer('Init Route 54 Go').removeSource('Init Route 54 Go');
  map.removeLayer('Init Route 54 Back').removeSource('Init Route 54 Back');
  map.removeLayer('Init Route 204 Go').removeSource('Init Route 204 Go');
  map.removeLayer('Init Route 204 Back').removeSource('Init Route 204 Back');
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
          "line-opacity": color === 'red' ? 0.5 : 1
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
      });
    } catch (error) { }
  });
}

function setDataSoure(map, idSoureLayer, coordinates, routeId) {
  let geojson = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": coordinates } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
  map.getSource(idSoureLayer).setData(geojson);
  let turf_center = center(geojson); //find center of bus route using Turf
  let center_coord = turf_center.geometry.coordinates;
  map.flyTo({
    center: center_coord,
    zoom: routeId === 'BN01' ? 11.5 :
      routeId === 'BN02' ? 12 :
        routeId === 'BN03' ? 12.6 :
          routeId === 'BN08' ? 11.7 :
            routeId === 'BN27' ? 11.8 :
              routeId === 'BN68' ? 12 :
                routeId === 'BN86A' ? 11.3 :
                  routeId === 'BN86B' ? 12 :
                    routeId === '10A' ? 12.5 :
                      routeId === '54' ? 11.7 :
                        routeId === '203' ? 10.7 :
                          routeId === '204' ? 11.9 :
                            routeId === '210' ? 10.7 :
                              routeId === '212' ? 11.3 : 10.9
  });
}

function loadMarker(map, routeId) {
  const elements = document.getElementsByClassName('mapboxgl-marker'); //clear all old markers
  while (elements.length > 0) elements[0].remove();
  // add markers to map
  const features = stations.features.filter(feature => feature.properties.routers.some(route => route.name === routeId));
  for (const feature of features) {
    const matchId = feature.properties.routers.filter(route => route.name === routeId)[0].id;
    const matchColor = feature.properties.routers.filter(route => route.name === routeId)[0].color;
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';
    el.id = matchId;
    const elGo = document.createElement('div');
    elGo.className = 'marker-green';
    elGo.id = matchId;
    const elBack = document.createElement('div');
    elBack.className = 'marker-red';
    elBack.id = matchId;

    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(matchColor ? (matchColor === 'blue' ? elGo : elBack) : el).setLngLat(feature.geometry.coordinates).setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          '<div>'
          + (feature.properties.name ? ('<b>' + feature.properties.name + '</b></br>') : ('<b>' + feature.properties.address + '</b></br>'))
          + (feature.properties.name && feature.properties.address ? ('<small>Đ/c: ' + feature.properties.address + ', </small>') : '')
          + (feature.properties.ward ? ('<small>' + feature.properties.ward + ', </small>') : '')
          + ('<small>' + feature.properties.district + '</small><br/>')
          + ('<small>Tuyến: ' + renderRouteList(feature.properties.routers) + '</small>') +
          '</div>'
        )
    ).addTo(map);
  };
}

function renderRouteList(routes) {
  const routeList = [];
  for (const route of routes) {
    routeList.push(route.name);
  }
  return routeList.join(', ');
}