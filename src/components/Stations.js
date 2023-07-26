import '../styles/Stations.css';
import { stationsSE } from '../data/stations/stationsSE';
import { stations } from '../data/stations/stations';
import { useState } from 'react';

export default function Stations(props) {
  const [chooseId, setChooseId] = useState(1);
  const stations_go = stations.features.filter(feature => feature.properties.routers.some(route => route.name === props.routeId)).filter(feature => feature.properties.routers.filter(route => route.name === props.routeId)[0].color !== 'red').sort((firstEl, secondEl) => { if (secondEl.properties.routers.filter(route => route.name === props.routeId)[0].id > firstEl.properties.routers.filter(route => route.name === props.routeId)[0].id) return -1; else return 0; });
  const stations_back = stations.features.filter(feature => feature.properties.routers.some(route => route.name === props.routeId)).filter(feature => feature.properties.routers.filter(route => route.name === props.routeId)[0].color !== 'blue').sort((firstEl, secondEl) => { if (secondEl.properties.routers.filter(route => route.name === props.routeId)[0].id > firstEl.properties.routers.filter(route => route.name === props.routeId)[0].id) return 0; else return -1; });
  const stations_se_in = stationsSE.features.filter(feature => feature.geometry.type === 'Point In Province');
  const stations_se_out = stationsSE.features.filter(feature => feature.geometry.type === 'Point Out Province');

  const sendData = (e) => {
    props.parentCallback(e);
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
        {(chooseId === 1 ? stations_go : stations_back).map(feature => (
          <div key={feature.properties.routers.filter(route => route.name === props.routeId)[0].id}>
            <button id="nav-menu-bus-stop" onClick={() => sendData(feature.properties.routers.filter(route => route.name === props.routeId)[0].id)} >
              <b style={{ display: feature.properties.name ? '' : 'none' }}>{feature.properties.name} </b>
              <b style={{ display: feature.properties.name ? 'none' : '' }}>{feature.properties.address} </b>
              <small  style={{ display: feature.properties.description ? '' : 'none' }}>({feature.properties.description})</small><br/>
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
          <div key={feature.properties.id}>
            <button id="nav-menu-bus-stop" onClick={() => sendData(feature.properties.id)} >
              <b>{feature.properties.name} </b><small>({feature.properties.description})</small><br/>
              <small>Đ/c: </small>
              <small style={{ display: feature.properties.address ? '' : 'none' }}>{feature.properties.address}, </small>
              <small style={{ display: feature.properties.ward ? '' : 'none' }}>{feature.properties.ward}, </small>
              <small>{feature.properties.district}.</small>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}