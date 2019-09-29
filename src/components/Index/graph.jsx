import React, { Component } from "react";
import styles from "./index.module.css";
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
  

export default class Graph extends Component {

    render() {
        let components = [];
        for(var line of this.props.res.vars){
            var lineData = [];
            for (var i = 0; i < line.data.length; i++) {
                lineData.push({x: i, y: line.data[i]});
            } 
            components.push(<Scatter name={line.name} data={lineData} fill={line.color.hex} line />);
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
                        {/* <ZAxis type="number" range={[100]} /> */}
                        {components}
                    </ScatterChart>

                    <button className={styles.submitButton}>Export CSV</button>
                {/* {JSON.stringify(this.props.res)} */}
                {/* <br/>
                {this.props.res.vars[0].color.data} */}
            </React.Fragment>
        )
    }
}

// {
//     let components = [];
//     for(var i = 1;i<myfields.length;i++) {
//         components.push(<TableHeaderColumn dataField={myfields[i]} dataSort={ true } width='15' dataAlign='left' headerAlign='left'>{myfields[i]}</TableHeaderColumn>);
//     }
//     return components;
// }
