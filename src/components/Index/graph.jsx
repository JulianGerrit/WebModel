import React, {Component} from "react";
import styles from "./index.module.css";
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid} from 'recharts';


export default class Graph extends Component {

    render() {

        let vars = this.props.res.vars;
        // console.log(vars)
        let result =[];
        let xAxis;

        for(let a of vars) {
            if(a.name === this.props.xAxis) {
                xAxis = a;
                break;
            }
        }
        if(xAxis == null) {
            return (
                <React.Fragment>
                    <p>Defined x-axis variable {this.props.xAxis} is not in data.</p>
                    {this.props.res.vars ? JSON.stringify(this.props.res.vars) : ""}
                </React.Fragment>);
        }

        for(let line of vars) {
            let xdata = [];
            if(line !== xAxis) {
                for (let i = 0; i < line.data.length; i++) {
                    // let dx = xAxis.data[i];
                    // let dy = line.data[i];
                    // console.log(dx + ",  " + dy +  "")
                    xdata.push({x: xAxis.data[i], y: line.data[i]})
                }
                result.push(<Scatter name={line.name} data={xdata} fill={line.color.hex} line/>)
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
                        <CartesianGrid/>
                        <XAxis type="number" dataKey="x" name="stature"/>
                        <YAxis type="number" dataKey="y" name="weight"/>
                        {result}
                    </ScatterChart>

                    {this.props.res.vars ? JSON.stringify(this.props.res.vars) : ""}
                    <button className={styles.submitButton}>Export CSV</button>

                </React.Fragment>
            );
        }
}
