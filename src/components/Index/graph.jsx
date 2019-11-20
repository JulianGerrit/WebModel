import React, {Component} from "react";
import styles from "./index.module.css";
import {ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';
// import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Download from '@axetroy/react-download';

class ChartPoint extends Component {
    render(){
        return(
                // <circle cx="4" cy="4" r="4" />
                null
        );
    }
}

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
            result.push(<Scatter legendType="line" name={yvar.name} dataKey={yvar.name} data={linedata} fill={yvar.color.hex} line shape={<ChartPoint/>}/>);
        }

        var csvstring = "";
        for(let i = 0; i < csvdata.length; i++){
            if(i === 0){
                csvstring += `${csvdata[i].join(',')}\n`;
            }else if(i === (csvdata.length - 1)){
                csvstring += csvdata[i].join(',');
            }else{
                csvstring += `${csvdata[i].join(',')}\n`;
            }
        }

        






        // let vars = this.props.res.vars;
        // console.log(vars);
        
        // var lines = [];
        // var csvdata = [];
        // var xvar;
        // var yvars = [];
        // csvdata.push([])
        // for(var variable of vars) {
        //     csvdata[0].push(`"${variable.name}"`);
        //     if(variable.axis === true) xvar = variable;
        //     if(variable.axis === false) yvars.push(variable);
        // }

        // var chartdata = [];
        // for(let i = 0; i < xvar.data.length; i++){
        //     csvdata.push([xvar.data[i]]);
        //     chartdata.push({[xvar.name]: xvar.data[i]});
        // }

        // let result = [];
        // for(var yvar of yvars){
        //     for(let i = 0; i < yvar.data.length; i++){
        //         csvdata[i+1].push(yvar.data[i]);
        //         chartdata[i][yvar.name] = yvar.data[i];
        //     }
        //     lines.push(<Line type="basis" dataKey={yvar.name} stroke={yvar.color.hex} />);
        // }
        // console.log(chartdata);

        // var csvstring = "";
        // for(let i = 0; i < csvdata.length; i++){
        //     if(i == 0){
        //         csvstring += `${csvdata[i].join(',')}\n`;
        //     }else if(i == (csvdata.length - 1)){
        //         csvstring += csvdata[i].join(',');
        //     }else{
        //         csvstring += `${csvdata[i].join(',')}\n`;
        //     }
        // }


            return (
                <React.Fragment>
                    <div className={styles.chartContainer}>
                    <ResponsiveContainer width="80%" height="80%">
                        <ScatterChart
                            // width={500}
                            // height={400}
                            margin={{
                                top: 20, right: 20, bottom: 20, left: 20,
                            }}
                        >
                            <CartesianGrid/>
                            <Tooltip/>
                            <Legend />
                            <XAxis type="number" dataKey="x" name={xvar.name}>
                                <Label value={`${xvar.name} →`} offset={0} position="insideBottom" />
                            </XAxis>
                            <YAxis type="number" dataKey="y"/>
                            {result}
                        </ScatterChart>
                    </ResponsiveContainer>
                    </div>
                    
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

            // return (
            //     <React.Fragment>
            //         <LineChart
            //             width={500}
            //             height={400}
            //             data={chartdata}
            //             margin={{
            //                 top: 20, right: 20, bottom: 20, left: 20,
            //             }}
            //         >
            //             <CartesianGrid/>
            //             <Tooltip/>
            //             <Legend/>
            //             <XAxis dataKey={xvar.name}/>
            //             <YAxis/>
            //             {lines}
            //         </LineChart>
                    
            //         {/* <textarea>
            //             {this.props.res.vars ? JSON.stringify(this.props.res.vars) : ""}
            //         </textarea> */}
                    
            //         <Download
            //             file="webmodel-data.csv"
            //             content={csvstring}>
            //             <button className={styles.submitButton}>Download Data</button>
            //         </Download>

            //     </React.Fragment>
            // );

        }
}
