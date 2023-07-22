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

  const optionItems = busRoutersList.map((bus) => <option key={bus.route_id} value={bus.route_id}>{bus.route_id + " : " + bus.route_name}</option>);

  return (
    <div className='container'>
      <div className='row' style={{ backgroundColor: 'lightblue' }} >
        <h2 style={{ height: '55px', marginBottom: '0px' }}>Bản đồ xe buýt Bắc Ninh</h2>
      </div>
      <div className='row'>
        <div className='col-lg-4' style={{ width: '370px', padding: "20px 12px" }}>
          <div>
            Tuyến:
            <select defaultValue="default" onChange={handleInputChange} style={{ display: "inline-block", marginLeft: 5, height: "30px", width: "290px", borderRadius: "3px" }}>
              <option value="default" disabled hidden>Chọn tuyến buýt</option>
              {optionItems}
            </select>
          </div>
          <div style={{ display: routeId ? "block" : "none" }}>
            <div style={{ height: "20px" }}>
              <button onClick={handleChoose} value="1" >Thông tin</button>
              <button onClick={handleChoose} value="2" >Trạm dừng</button>
              <button onClick={handleChoose} value="3" >Biểu đồ giờ</button>
            </div>
            <hr />
            <div style={{ display: chooseId === 1 ? "block" : "none" }}>
              <Infomation routeId={routeId} />
            </div>
            <div style={{ display: chooseId === 2 ? "block" : "none", overflow: 'auto', height: "calc(100vh - 120px)" }}>
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