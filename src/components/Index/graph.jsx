import React, {Component} from "react";
import styles from "./index.module.css";
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Download from '@axetroy/react-download';


export default class Graph extends Component {

    render() {

        let vars = this.props.res.vars;
        
        var csvdata = [];
        var xvar;
        var yvars = [];
        csvdata.push([])
        for(var variable of vars) {
            csvdata[0].push(`"${variable.name}"`);
            if(variable.axis === true) xvar = variable;
            if(variable.axis === false) yvars.push(variable);
        }
        for(let i = 0; i < xvar.data.length; i++){
            csvdata.push([xvar.data[i]]);
        }

        let result = [];
        var linedata;
        for(var yvar of yvars){
            linedata = [];
            for(let i = 0; i < yvar.data.length; i++){
                linedata.push({x: xvar.data[i], y: yvar.data[i]});
                csvdata[i+1].push(yvar.data[i]);
            }
            result.push(<Scatter name={yvar.name} data={linedata} fill={yvar.color.hex} line/>);
        }

        var csvstring = "";
        for(let i = 0; i < csvdata.length; i++){
            if(i == 0){
                csvstring += `${csvdata[i].join(',')}\n`;
            }else if(i == (csvdata.length - 1)){
                csvstring += csvdata[i].join(',');
            }else{
                csvstring += `${csvdata[i].join(',')}\n`;
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
                        <Tooltip/>
                        <Legend />
                        <XAxis type="number" dataKey="x" name={xvar.name}/>
                        <YAxis type="number" dataKey="y"/>
                        {result}
                    </ScatterChart>
                    
                    {/* <textarea>
                        {this.props.res.vars ? JSON.stringify(this.props.res.vars) : ""}
                    </textarea> */}
                    
                    <Download
                        file="webmodel-data.csv"
                        content={csvstring}>
                        <button className={styles.submitButton}>Download Data</button>
                    </Download>

                </React.Fragment>
            );
        }
}
