import React, {Component} from "react";
import styles from "./index.module.css";
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid} from 'recharts';


export default class Graph extends Component {

    render() {

        let vars = this.props.res.vars;
        
        // let xAxis = this.props.xAxis;

        var xvar;
        var yvars = [];
        for(let variable of vars) {
            // let xdata = [];
            // if(line !== xAxis) {
                // for (let i = 0; i < line.data.length; i++) {
                    // xdata.push({x: xAxis.data[i], y: line.data[i]})
                // }
                // result.push(<Scatter name={line.name} data={xdata} fill={line.color.hex} line/>)
            // }
            if(variable.axis === true) xvar = variable;
            if(variable.axis === false) yvars.push(variable);
        }

        let result = [];
        var linedata;
        for(var yvar of yvars){
            linedata = [];
            for(let i = 0; i < yvar.data.length; i++){
                linedata.push({x: xvar.data[i], y: yvar.data[i]});
            }
            result.push(<Scatter name={yvar.name} data={linedata} fill={yvar.color.hex} line/>);
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
