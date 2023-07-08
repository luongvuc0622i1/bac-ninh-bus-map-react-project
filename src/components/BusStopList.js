import { bus_stop_list_bn01 } from '../data/bus-stop/bn01';
import { bus_stop_list_bn02 } from '../data/bus-stop/bn02';
import { bus_stop_list_bn08 } from '../data/bus-stop/bn08';
import { bus_stop_list_bn86a } from '../data/bus-stop/bn86a';
import { bus_stop_list_bn86b } from '../data/bus-stop/bn86b';

export default function BusStopList(props) {
    const sendData = (e) => {
        props.parentCallback(e.target.value);
    }

    const bus_stop_list = (props.routeId === "BN01")?bus_stop_list_bn01:
                          (props.routeId === "BN02")?bus_stop_list_bn02:
                          (props.routeId === "BN08")?bus_stop_list_bn08:
                          (props.routeId === "BN86A")?bus_stop_list_bn86a:
                          (props.routeId === "BN86B")?bus_stop_list_bn86b:
                                                     {'features': []};

    return (
        <div>
            {bus_stop_list.features.map(feature => (
                <div key={feature.markerId}>
                    <button value={feature.markerId} onClick={sendData} >{feature.properties.title} : {feature.properties.description}</button>
                </div>
            ))}
        </div>
    )
}