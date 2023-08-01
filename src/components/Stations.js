import '../styles/Stations.css';
import { useState } from 'react';
import { stations } from '../data/stations';

export default function Stations(props) {
  const [chooseId, setChooseId] = useState(1);
  let features = [];
  if (chooseId === 1) features = stations.features.filter(feature => feature.geometry.type !== 'Line').filter(feature => feature.properties.routers.some(route => route.name === props.routeId)).filter(feature => feature.properties.routers.filter(route => route.name === props.routeId)[0].color !== 'red').sort((firstEl, secondEl) => { if (secondEl.properties.routers.filter(route => route.name === props.routeId)[0].id > firstEl.properties.routers.filter(route => route.name === props.routeId)[0].id) return -1; else return 0; });
  else features = stations.features.filter(feature => feature.geometry.type !== 'Line').filter(feature => feature.properties.routers.some(route => route.name === props.routeId)).filter(feature => feature.properties.routers.filter(route => route.name === props.routeId)[0].color !== 'blue').sort((firstEl, secondEl) => { if (secondEl.properties.routers.filter(route => route.name === props.routeId)[0].id > firstEl.properties.routers.filter(route => route.name === props.routeId)[0].id) return 0; else return -1; });
  const stations_se_in = stations.features.filter(feature => feature.geometry.type === 'Point In Province');
  const stations_se_out = stations.features.filter(feature => feature.geometry.type === 'Point Out Province');

  const sendDataChangeMarker = (e) => {
    props.parentCallbackChangeMarker(e);
  }

  const sendDataChangeRoute = (e) => {
    props.parentCallbackChangeRoute(e.target.value);
    // prevent event click on parent element
    e.stopPropagation();
  }

  const handleChoose = (e) => {
    setChooseId(parseInt(e.target.value));
  }

  return (
    <div>
      <div className='button-group' >
        <button className='button go' style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41", display: props.routeId ? "block" : "none" }} onClick={handleChoose} value="1" >Chiều đi</button>
        <button className='button back' style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41", display: props.routeId ? "block" : "none" }} onClick={handleChoose} value="2" >Chiều về</button>
        <button className='button go' style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41", display: props.routeId ? "none" : "block" }} onClick={handleChoose} value="1" >Bến xe nội tỉnh</button>
        <button className='button back' style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41", display: props.routeId ? "none" : "block" }} onClick={handleChoose} value="2" >Bến xe ngoại tỉnh</button>
      </div>
      <div className='list' style={{ display: props.routeId ? "block" : "none" }} >
        {features.map(feature => (
          <div key={feature.properties.routers.filter(route => route.name === props.routeId)[0].id}>
            <button id="nav-menu-bus-stop" onClick={() => sendDataChangeMarker(feature.properties.routers.filter(route => route.name === props.routeId)[0].id)} >
              {feature.properties.name ? (feature !== features[0] && feature !== features[features.length - 1] && (feature.properties.name.includes('(A)') || feature.properties.name.includes('(B)')) ? (<b>{feature.properties.description} </b>) : (<b>{feature.properties.name} </b>)) : (<b>{feature.properties.address} </b>)}
              {!feature.properties.description || (feature !== features[0] && feature !== features[features.length - 1] && (feature.properties.name.includes('(A)') || feature.properties.name.includes('(B)'))) ? '' : (<small>({feature.properties.description})</small>)}<br/>
              <small>Đ/c: </small>
              <small style={{ display: feature.properties.address ? '' : 'none' }}>{feature.properties.address}, </small>
              <small style={{ display: feature.properties.ward ? '' : 'none' }}>{feature.properties.ward}, </small>
              <small>{feature.properties.district}.</small>
            </button>
          </div>
        ))}
      </div>
      <div className='list' style={{ display: props.routeId ? "none" : "block" }} >
        {(chooseId === 1 ? stations_se_in : stations_se_out).map(feature => (
          <div key={feature.geometry.pointId} style={{ position: 'relative' }} >
            <button id="nav-menu-bus-stop" onClick={() => sendDataChangeMarker(feature.geometry.pointId)} >
              <b>{feature.properties.name.slice(4)} </b><small>({feature.properties.description})</small><br/>
              <small>Đ/c: </small>
              <small style={{ display: feature.properties.address ? '' : 'none' }}>{feature.properties.address}, </small>
              <small style={{ display: feature.properties.ward ? '' : 'none' }}>{feature.properties.ward}, </small>
              <small>{feature.properties.district}.</small>
              <div style={{height: '25px'}}></div>
            </button>
            <div className='button-route-group' >
              {feature.properties.routers.filter(route => route.start).map(route => (<button key={route.name} className='button' onClick={sendDataChangeRoute} value={route.name} >{route.name}</button>))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}