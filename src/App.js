import './App.css';
import { useState } from 'react';
import Information from './components/Information';
import RouteMap from './components/RouteMap';
import Stations from './components/Stations';
import Timeline from './components/Timeline';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { routes } from './data/routes'; //list of all bus routes

export default function App() {
  const [routeId, setRouteId] = useState();
  const [markerId, setMarkerId] = useState("");
  const [chooseId, setChooseId] = useState(1);

  const handleInputChange = (e) => {
    setRouteId(e.target.value);
    setMarkerId("");
    setChooseId(1);
  };

  const handleClickChangeMarker = (e) => {
    setMarkerId(e);
  }

  const handleClickChangeRoute = (e) => {
    setRouteId(e);
    document.getElementById('selectRoute').value = e;
    setMarkerId("");
    setChooseId(1);
  }

  const handleChoose = (e) => {
    setChooseId(parseInt(e.target.value));
    setMarkerId("");
  }

  const optionItems = routes.features.filter(feature => feature.geometry.status).map(feature => <option className='option' key={feature.geometry.id} value={feature.geometry.id}>{feature.geometry.id + " : " + feature.geometry.name}</option>);

  return (
    <div className='container'>
      <div className='header row' >
        <h2 style={{ height: '55px', marginBottom: '0px' }}>Bản đồ xe buýt Bắc Ninh</h2>
      </div>
      <div className='row'>
        <div className='col-lg-4' style={{ width: '390px', padding: "6px 12px" }}>
          <div className='btn-group'>
            <label style={{ width: '56px', marginTop: '4px' }}>Tuyến:</label>
            <select className='select' id='selectRoute' defaultValue="default" onChange={handleInputChange} >
              <option value="default" disabled hidden>Chọn tuyến buýt</option>
              {optionItems}
            </select>
          </div>
          <div>
            <div style={{ display: routeId ? "block" : "none" }} >
              <div className='btn-group' >
                <button className='button' style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value="1" >Thông tin</button>
                <button className='button' style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value="2" >Trạm dừng</button>
                <button className='button' style={{ backgroundColor: chooseId === 3 ? "#4CAF50" : "#3e8e41" }} onClick={handleChoose} value="3" >Biểu đồ giờ</button>
              </div>
            </div>
            <div style={{ display: chooseId === 1 && routeId ? "block" : "none" }}>
              <Information routeId={routeId} />
            </div>
            {/* <div style={{ display: chooseId === 2 || !routeId ? "block" : "none", height: "calc(100vh - 205px)" }}> */}
            <div style={{ display: chooseId === 2 || !routeId ? "block" : "none" }}>
              <Stations routeId={routeId} parentCallbackChangeMarker={handleClickChangeMarker} parentCallbackChangeRoute={handleClickChangeRoute} />
            </div>
            <div style={{ display: chooseId === 3 ? "block" : "none" }}>
              <Timeline routeId={routeId} />
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