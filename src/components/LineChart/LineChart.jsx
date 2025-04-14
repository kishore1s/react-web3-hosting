import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([['Date', 'Price', { role: 'style' }]]);

  useEffect(() => {
    let dataCopy = [['Date', 'Price', { role: 'style' }]];
    const interval = 10; // Number of data points per color segment

    if (historicalData && historicalData.prices) {
      for (let i = 0; i < historicalData.prices.length; i += interval) {
        const chunk = historicalData.prices.slice(i, i + interval);
        if (chunk.length < 2) continue;

        const startPrice = chunk[0][1];
        const endPrice = chunk[chunk.length - 1][1];
        const color = endPrice >= startPrice ? '#4285F4' : '#EA4335';

        chunk.forEach(item => {
          if (item && item.length >= 2) {
            dataCopy.push([
              new Date(item[0]),
              item[1],
              color
            ]);
          }
        });
      }

      setData(dataCopy);
    }
  }, [historicalData]);

  const options = {
    title: '',
    curveType: 'function',
    legend: 'none',
    hAxis: {
      textPosition: 'none',
      gridlines: {
        color: 'transparent'
      },
      baselineColor: 'transparent'
    },
    vAxis: {
      title: 'Price',
      textStyle: {
        color: '#666',
        fontSize: 11
      },
      gridlines: {
        color: '#e0e0e0' // Slightly darker gridlines
      }
    },
    series: {
      0: {
        lineWidth: 2,
        areaOpacity: 0.05, // Lightened area fill
        enableInteractivity: true,
        pointsVisible: false,
        type: 'area',
        fillOpacity: 0.1
      }
    },
    backgroundColor: 'transparent',
    chartArea: {
      backgroundColor: 'transparent',
      width: '90%',
      height: '80%',
      left: 60
    },
    crosshair: {
      trigger: 'both',
      color: '#666',
      orientation: 'both',
      opacity: 0.3,
      selected: {
        color: '#FF6D00',
        opacity: 0.8
      }
    },
    tooltip: {
      isHtml: true,
      trigger: 'focus',
      showColorCode: true,
      textStyle: {
        fontSize: 12
      }
    },
    focusTarget: 'category',
    annotations: {
      textStyle: {
        fontSize: 12
      }
    },
    explorer: {
      actions: ['dragToZoom', 'rightClickToReset'],
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 4.0
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '400px', 
      padding: '8px',
      position: 'relative'
    }}>
      <Chart
        chartType="AreaChart"
        loader={<div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#666'
        }}>Loading Chart...</div>}
        data={data}
        width="100%"
        height="100%"
        options={options}
      />
    </div>
  );
};

export default LineChart;
