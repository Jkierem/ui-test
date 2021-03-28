import { EnumType } from "jazzi";
import { useEffect, useLayoutEffect, useState } from "react";

const Device = EnumType("Device",["Mobile","Tablet","Desktop"]);
const fromSize = ([ width ]) => {
  if( width <= 500 ){
    return Device.Mobile;
  } else if( width > 500 && width <= 768 ){
    return Device.Tablet;
  } else {
    return Device.Desktop;
  } 
}

/**
 * @typedef {number} Width
 * @typedef {number} Height
 * @returns {[Width,Height]}
 */
const useWindowSize = () => {
	const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
	useLayoutEffect(() => {
		const updateSize = () => {
			setSize([window.innerWidth, window.innerHeight]);
		};
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	return size;
};

const useDevice = () => {
	const size = useWindowSize()
	const [device, setDevice] = useState(fromSize(size))

	useEffect(() => {
		const newDevice = fromSize(size)
		if( !newDevice.equals(device) ){
			setDevice(newDevice)
		}
	},[size,device])

	return device
}

export default useDevice;