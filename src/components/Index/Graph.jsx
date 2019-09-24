import React, { Component } from "react";
import styles from "./index.module.css";
import Index from "./index"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

export default (res) => (
            <React.Fragment>
                <div>
                    <LineChart className="graphStyle" width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                    </LineChart>
                </div>
                {JSON.stringify(res)}
            </React.Fragment>
)