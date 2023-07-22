import '../styles/Stations.css';
import { bus_stop_list_bn01 } from '../data/bus-stop/bn01';
import { bus_stop_list_bn02 } from '../data/bus-stop/bn02';
import { bus_stop_list_bn08 } from '../data/bus-stop/bn08';
import { bus_stop_list_bn27 } from '../data/bus-stop/bn27';
import { bus_stop_list_bn68 } from '../data/bus-stop/bn68';
import { bus_stop_list_bn86a } from '../data/bus-stop/bn86a';
import { bus_stop_list_bn86b } from '../data/bus-stop/bn86b';
import { bus_stop_list_54 } from '../data/bus-stop/54';
import { bus_stop_list_204 } from '../data/bus-stop/204';
import { bus_stop_list_217 } from '../data/bus-stop/217';
import { useState } from 'react';

export default function Stations(props) {
    const [chooseId, setChooseId] = useState(1);

    const sendData = (e) => {
        props.parentCallback(e.target.value);
    }

    const bus_stop_list = (props.routeId === "BN01")?bus_stop_list_bn01:
                          (props.routeId === "BN02")?bus_stop_list_bn02:
                          (props.routeId === "BN08")?bus_stop_list_bn08:
                          (props.routeId === "BN27")?bus_stop_list_bn27:
                          (props.routeId === "BN68")?bus_stop_list_bn68:
                          (props.routeId === "BN86A")?bus_stop_list_bn86a:
                          (props.routeId === "BN86B")?bus_stop_list_bn86b:
                          (props.routeId === "54")?bus_stop_list_54:
                          (props.routeId === "204")?bus_stop_list_204:
                          (props.routeId === "217")?bus_stop_list_217:
                                                                       {'features': []};

    const handleChoose = (e) => {
        setChooseId(parseInt(e.target.value));
    }                                                                 

    return (
        <div>
            <div className='button-group' >
                <button className='button go' style={{ backgroundColor: chooseId === 1 ? "#4CAF50" : "#3e8e41"}} onClick={handleChoose} value="1" >Chiều đi</button>
                <button className='button back' style={{ backgroundColor: chooseId === 2 ? "#4CAF50" : "#3e8e41"}} onClick={handleChoose} value="2" >Chiều về</button>
            </div>
            {bus_stop_list.features.filter(feature => feature.color !== (chooseId === 1 ? 'red' : 'blue')).map(feature => (
                <div key={feature.markerId}>
                    <button id="nav-menu-bus-stop" value={feature.markerId} onClick={sendData} >{feature.properties.title} : {feature.properties.description}</button>
                </div>
            ))}
        </div>
    )
}