import React, { useState, useRef, useLayoutEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { gsap } from "gsap";

const worldMapData = [
    { id: 'USA', text: 'USA is super cool' },
    { id: 'CAN', text: 'Canada is for lame-os' },
    { id: 'MEX', text: 'Good food here' },
  ];

const MapChart = () => {

    const [tooltipContent, setTooltipContent] = useState('');

    const countrySelected = (geography) => {
        const countryData = worldMapData.find((data) => data.id === geography.id);
        setTooltipContent(countryData ? countryData.text : 'idk');
        tween.current.play();
    };

    const countryDeselected = () => {
        setTooltipContent('');
        tween.current.reverse();
    }

    const comp = useRef();
    const tween = useRef();

    useLayoutEffect(() => {
  
        let ctx = gsap.context(() => {
          tween.current = gsap.from(".textbox", {x: 400, paused: true});
          
        }, comp);
        
        return () => ctx.revert();
        
    }, []);

  return (
    <div>
        <div ref={comp}>
            <div className='textbox'>
                <p>{tooltipContent}</p> 
            </div>
        </div>
    <ComposableMap projectionConfig={{scale: 150, center: [20, -20]}}>
      <Geographies geography="/features.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => countrySelected(geo)}
                onMouseLeave={() => countryDeselected()}
                style={{
                    default: { fill: '#D3D3D3', stroke: '#FFFFFF' },
                    hover: { fill: '#F53' },
                }} />
          ))
        }
      </Geographies>
    </ComposableMap>
    
    </div>
  );
};

export default MapChart;