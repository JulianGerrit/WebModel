import React, { Component } from "react";
import styles from "./index.module.css";
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
  

export default class Graph extends Component {

    render() {
        let xAxisVariableInData;
        let xAxisVariableLocation;
        for(let i = 0; i < this.props.res.vars.length; i++){
            if(this.props.res.vars[i].name === this.props.xAxis){
                xAxisVariableInData = true;
                xAxisVariableLocation = i;
            }
        }
        if(!xAxisVariableInData) {
            return (
                <React.Fragment>
                    <p>Defined x-axis variable {this.props.xAxis} is not in data.</p>
                {this.props.res.vars ? JSON.stringify(this.props.res.vars) : ""}
                </React.Fragment>
            );
        }else{
            let components = [];
            for(let line of this.props.res.vars){
                if(this.props.xAxis !== line.name){
                    let lineData = [];
                    for (let i = 0; i < line.data.length; i++) {
                        lineData.push({x: this.props.res.vars[xAxisVariableLocation][i], y: line.data[i]});
                    } 
                    components.push(<Scatter name={line.name} data={lineData} fill={line.color.hex} line />);
                }
                
            }
            return (
                <React.Fragment>
                        <ScatterChart
                            width={500}
                            height={400}
                            margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                            }}
                        >
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="stature"  />
                            <YAxis type="number" dataKey="y" name="weight" />
                            {components}
                        </ScatterChart>

                        {this.props.res.vars ? JSON.stringify(this.props.res.vars) : ""}
                        <button className={styles.submitButton}>Export CSV</button>
                        
                </React.Fragment>
            )
        }
        
    }
}
