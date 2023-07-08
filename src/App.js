import './App.css';
import { useState } from 'react';
import Infomation from './components/Infomation';
import RouteMap from './components/RouteMap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import busRoutersList from './data/bus-routers-list.json' //list of all bus routes
import { bus_stop_list_bn01 } from './data/bus-stop/bn01';
import { bus_stop_list_bn02 } from './data/bus-stop/bn02';

export default function App() {
  const [routeId, setRouteId] = useState();
  const [markerId, setMarkerId] = useState("");

  const handleInputChange = (e) => {
    setRouteId(e.target.value);
  };

  const handleClick = (e) => {
    setMarkerId(e.target.value);
  }

  const optionItems = busRoutersList.map((bus) => <option key={bus.route_id} value={bus.route_id}>{bus.route_id+" : "+bus.route_name}</option>);

  return (
    <div className='container'>
      <div className='row' style={{backgroundColor: 'lightblue'}} >
        <h2 style={{height: '8.5vh'}}>Bản đồ xe buýt Bắc Ninh</h2>
      </div>  
      <div className='row'>
        <div className='col-lg-3'>
          <div>
            <div style={{marginTop: "20px"}}>
              Tuyến:
              <select defaultValue="default" onChange={handleInputChange} style={{ display: "inline-block", marginLeft: 5, height: "30px", width: "290px", borderRadius: "3px" }}>
                <option value="default" disabled hidden>Chọn tuyến buýt</option>
                {optionItems}
              </select>
            </div>
            <button>Chọn</button>
            <hr/>
          </div>
          <Infomation routeId={routeId} />
          <div>
            <hr/>
            {bus_stop_list_bn01.features.map(feature => (
              <div key={feature.markerId}>
                <button value={feature.markerId} onClick={handleClick}>{feature.properties.title} : {feature.properties.description}</button>
              </div>
            ))}
            <hr/>
            {bus_stop_list_bn02.features.map(feature => (
              <div key={feature.markerId}>
                <button value={feature.markerId} onClick={handleClick}>{feature.properties.title} : {feature.properties.description}</button>
              </div>
            ))}
          </div>
        </div>
        <div className='col-lg-9' style={{paddingLeft: 0, paddingRight: 0}} >
          <RouteMap routeId={routeId} markerId={markerId} />
        </div>
      </div>
    </div>
  );
}