import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
export default class BarChart extends React.Component {
    render() {
        return (
            <div>
                <Bar
                    data={this.props.state}
                    options={{
                        title:{
                            display:true,
                            text:'Average Employee Salary per Month',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
            </div>
        );
    }
}