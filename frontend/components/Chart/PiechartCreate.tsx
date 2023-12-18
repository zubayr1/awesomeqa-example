import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const PieChartCreate = ({ data }) => {
  const chartData = {
    labels: ['user data', 'all data'], 
    datasets: [
      {
        label: 'User Activity Chart',
        data: data, 
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ], 
      },
    ],
  };

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <h2>User Activity</h2>
      <PieChart
        data={[
            { title: 'User Data', value: data[0], color: '#E38627' },
            { title: 'All Data', value: data[1], color: '#C13C37' },
        ]}
        />
    </div>
  );
};

export default PieChartCreate;
