import '../styles/Stations.css';
import { stations } from '../data/stations/stations';
import { useState } from 'react';

export default function Stations(props) {
  const [chooseId, setChooseId] = useState(1);
  const stations_go = stations.features.filter(feature => feature.properties.routers.some(route => route.name === props.routeId)).filter(feature => feature.properties.routers.filter(route => route.name === props.routeId)[0].color !== 'red').sort((firstEl, secondEl) => {if (secondEl.properties.routers.filter(route => route.name === props.routeId)[0].id > firstEl.properties.routers.filter(route => route.name === props.routeId)[0].id) return -1; else return 0;});
  const stations_back = stations.features.filter(feature => feature.properties.routers.some(route => route.name === props.routeId)).filter(feature => feature.properties.routers.filter(route => route.name === props.routeId)[0].color !== 'blue').sort((firstEl, secondEl) => {if (secondEl.properties.routers.filter(route => route.name === props.routeId)[0].id > firstEl.properties.routers.filter(route => route.name === props.routeId)[0].id) return 0; else return -1;});

  const sendData = (e) => {
    props.parentCallback(e.target.value);
  }

  const handleChoose = (e) => {
    setChooseId(parseInt(e.target.value));
  }  
  
  return (
    <div>
      <div className='button-group' >
        <button className='button go' style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41"}} onClick={handleChoose} value="1" >Chiều đi</button>
        <button className='button back' style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41"}} onClick={handleChoose} value="2" >Chiều về</button>
      </div>
      <div className='list' >
        {(chooseId === 1 ? stations_go : stations_back).map(feature => (
          <div key={feature.properties.routers.filter(route => route.name === props.routeId)[0].id}>
            <button id="nav-menu-bus-stop" value={feature.properties.routers.filter(route => route.name === props.routeId)[0].id} onClick={sendData} >{feature.properties.name} : {feature.properties.address}</button>
          </div>
        ))}
      </div>
    </div>
  );
}