import './App.css';

export default function App() {
  return (
    <div className='container'>
      <div className='row' style={{backgroundColor: 'blue'}} >
        <h2 style={{height: 50}}>Bản đồ xe buýt Bắc Ninh</h2>
      </div>  
      <div className='row'>
        <div className='col-lg-3'>
          <h1>Chọn</h1>
          <select>
            <option>BN01</option>
            <option>BN02</option>
            <option>BN03</option>
          </select>
        </div>
        <div className='col-lg-9'>
          <h2>Đây là map</h2>
          <p>hdsgvf</p>
        </div>
      </div>
    </div>
  );
}