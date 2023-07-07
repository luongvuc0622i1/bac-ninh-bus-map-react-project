import './App.css';
import { useState } from 'react';
import busRoutersList from './data/bus-routers-list.json' //list of all bus routes
import Infomation from './components/Infomation';
import RouteMap from './components/RouteMap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [routeId, setRouteId] = useState();

  const handleInputChange = (e) => {
    setRouteId(e.target.value);
  };

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
            <hr/>
          </div>
          <Infomation routeId={routeId} />
        </div>
        <div className='col-lg-9' style={{paddingLeft: 0, paddingRight: 0}} >
          <RouteMap routeId={routeId} />
        </div>
      </div>
    </div>
  );
}