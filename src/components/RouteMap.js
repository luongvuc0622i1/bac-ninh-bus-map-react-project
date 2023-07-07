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
import bn54Go from '../data/bus-routes/54-go.json';
import bn54Back from '../data/bus-routes/54-back.json';
import bn217Go from '../data/bus-routes/217-go.json';
import bn217Back from '../data/bus-routes/217-back.json';
import { bus_stop_list_bn01 } from '../data/bus-stop/bn01';
import { bus_stop_list_bn02 } from '../data/bus-stop/bn02';
import { bus_stop_list_bn08 } from '../data/bus-stop/bn08';
import { bus_stop_list_bn86a } from '../data/bus-stop/bn86a';
import { bus_stop_list_bn86b } from '../data/bus-stop/bn86b';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FhZGlxbSIsImEiOiJjamJpMXcxa3AyMG9zMzNyNmdxNDlneGRvIn0.wjlI8r1S_-xxtq2d-W5qPA';

export default class RouteMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: 106.0804849,
      lat: 21.1169071,
      zoom: 11,
      selected_bus: 1
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom
    });

    this.map.on('load', () => { //Get initial geojson data from Calgary Open Data
      let geojsonGo = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn01Go] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      let geojsonBack = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn01Back] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };

      try {
        this.map.addSource('Bus Route Go', {
          type: 'geojson',
          data: geojsonGo
        });
        this.map.addLayer({
          "id": "Bus Route Go",
          "type": "line",
          "source": 'Bus Route Go',
          "paint": {
            "line-color": "blue",
            "line-width": 4,
            "line-opacity": 0.5
          },
          "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
        });

        this.map.addSource('Bus Route Back', {
          type: 'geojson',
          data: geojsonBack
        });
        this.map.addLayer({
          "id": "Bus Route Back",
          "type": "line",
          "source": 'Bus Route Back',
          "paint": {
            "line-color": "red",
            "line-width": 4,
            "line-opacity": 0.5
          },
          "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
        });
      } catch (error) { }
      // add markers to map
      for (const feature of bus_stop_list_bn01.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        const elGo = document.createElement('div');
        elGo.className = 'marker-blue';
        const elBack = document.createElement('div');
        elBack.className = 'marker-red';

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
        ).addTo(this.map)
      };

    });
  };

  componentDidUpdate() {
    const elements = document.getElementsByClassName('mapboxgl-marker'); //clear all old markers
    while (elements.length > 0) elements[0].remove();

    let geojsonGo = "";
    let geojsonBack = "";
    if (this.props.routeId === "BN01") {
      geojsonGo = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn01Go] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      geojsonBack = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn01Back] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      // add markers to map
      for (const feature of bus_stop_list_bn01.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        const elGo = document.createElement('div');
        elGo.className = 'marker-blue';
        const elBack = document.createElement('div');
        elBack.className = 'marker-red';

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
        ).addTo(this.map);
      };
    } else if (this.props.routeId === "BN02") {
      geojsonGo = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn02Go] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      geojsonBack = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn02Back] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      // add markers to map
      for (const feature of bus_stop_list_bn02.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        const elGo = document.createElement('div');
        elGo.className = 'marker-blue';
        const elBack = document.createElement('div');
        elBack.className = 'marker-red';

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
        ).addTo(this.map);
      };
    } else if (this.props.routeId === "BN03") {
      geojsonGo = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn03Go] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      geojsonBack = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn03Back] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
    } else if (this.props.routeId === "BN08") {
      geojsonGo = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn08Go] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      geojsonBack = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn08Back] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      // add markers to map
      for (const feature of bus_stop_list_bn08.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        const elGo = document.createElement('div');
        elGo.className = 'marker-blue';
        const elBack = document.createElement('div');
        elBack.className = 'marker-red';

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
        ).addTo(this.map);
      };
    } else if (this.props.routeId === "BN27") {
      geojsonGo = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn27Go] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      geojsonBack = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn27Back] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
    } else if (this.props.routeId === "BN68") {
      geojsonGo = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn68Go] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      geojsonBack = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn68Back] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
    } else if (this.props.routeId === "BN86A") {
      geojsonGo = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn86aGo] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      geojsonBack = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn86aBack] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      // add markers to map
      for (const feature of bus_stop_list_bn86a.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        const elGo = document.createElement('div');
        elGo.className = 'marker-blue';
        const elBack = document.createElement('div');
        elBack.className = 'marker-red';

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
        ).addTo(this.map);
      };
    } else if (this.props.routeId === "BN86B") {
      geojsonGo = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn86bGo] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      geojsonBack = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn86bBack] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      // add markers to map
      for (const feature of bus_stop_list_bn86b.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        const elGo = document.createElement('div');
        elGo.className = 'marker-blue';
        const elBack = document.createElement('div');
        elBack.className = 'marker-red';

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
        ).addTo(this.map);
      };
    } else if (this.props.routeId === "54") {
      geojsonGo = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn54Go] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      geojsonBack = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn54Back] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
    } else if (this.props.routeId === "217") {
      geojsonGo = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn217Go] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
      geojsonBack = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "MultiLineString", "coordinates": [bn217Back] } }], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } } };
    };
    this.map.getSource('Bus Route Go').setData(geojsonGo);
    this.map.getSource('Bus Route Back').setData(geojsonBack); //update data source through Mapbox setData()
  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} style={{ width: '75vw', height: '90vh' }} />
      </div>
    );
  }
}