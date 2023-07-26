import './App.css';
import { useState } from 'react';
import Infomation from './components/Infomation';
import RouteMap from './components/RouteMap';
import Stations from './components/Stations';
import Timeline from './components/Timeline';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import busRoutersList from './data/bus-routers-list.json' //list of all bus routes

export default function App() {
  const [routeId, setRouteId] = useState();
  const [markerId, setMarkerId] = useState("");
  const [chooseId, setChooseId] = useState(1);

  const handleInputChange = (e) => {
    setRouteId(e.target.value);
  };

  const handleClick = (e) => {
    setMarkerId(e);
  }

  const handleChoose = (e) => {
    setChooseId(parseInt(e.target.value));
  }

  const optionItems = busRoutersList.map((bus) => <option className='option' key={bus.route_id} value={bus.route_id}>{bus.route_id + " : " + bus.route_name}</option>);

  return (
    <div className='container'>
      <div className='header row' >
        <h2 style={{ height: '55px', marginBottom: '0px' }}>Bản đồ xe buýt Bắc Ninh</h2>
      </div>
      <div className='row'>
        <div className='col-lg-4' style={{ width: '390px', padding: "6px 12px" }}>
          <div className='btn-group'>
            <label style={{ width: '56px', marginTop: '4px' }}>Tuyến:</label>
            <select className='select' defaultValue="default" onChange={handleInputChange} >
              <option value="default" disabled hidden>Chọn tuyến buýt</option>
              {optionItems}
            </select>
          </div>
          <div style={{ display: routeId ? "block" : "none" }} >
            <div className='btn-group' >
              <button className='button' style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41"}} onClick={handleChoose} value="1" >Thông tin</button>
              <button className='button' style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41"}} onClick={handleChoose} value="2" >Trạm dừng</button>
              <button className='button' style={{ backgroundColor: chooseId === 3 ? "#4CAF50" : "#3e8e41"}} onClick={handleChoose} value="3" >Biểu đồ giờ</button>
            </div>
            <div style={{ display: chooseId === 1 && routeId ? "block" : "none" }}>
              <Infomation routeId={routeId} />
            </div>
            <div style={{ display: chooseId === 2 || !routeId ? "block" : "none", height: "calc(100vh - 205px)" }}>
              <Stations routeId={routeId} parentCallback={handleClick} />
            </div>
            <div style={{ display: chooseId === 3 ? "block" : "none" }}>
              <Timeline />
            </div>
          </div>
        </div>
        <div className='col-lg-8' style={{ paddingLeft: 0, paddingRight: 0 }} >
          <RouteMap routeId={routeId} markerId={markerId} />
        </div>
      </div>
    </div>
  );
}