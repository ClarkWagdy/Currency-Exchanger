import React, {useEffect, useState} from "react";
import classes from "./ChartCurrencies.module.css";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import axios from "axios";
import {months} from "../../Settings/Config/MonthesName";
import Loading from "../Loading/Loading";
import { access_key } from "../../Settings/Config/access_key";

export const options = {
    responsive: true, plugins: {
        legend: {
            display: false,
        }, title: {
            display: false,
        },
    }, scales: {
        y: {
            ticks: {color: 'rgba(255,255,255,0.3)'}
        }, x: {
            ticks: {color: 'rgba(255,255,255,0.3)'}
        }
    }
};
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface props {
    FromData?: { value: string, label: string },
    ToData?: { value: string, label: string },
}

const ChartCurrencies: React.FC<props> = (props) => {
    const [Values, setValues] = useState<Array<number>>([]);
    const [Load, setLoad] = useState<boolean>(true);
    const data = {
        labels: months, datasets: [{
            label: props.FromData?.label,
            data: Values,
            borderColor: 'rgba(255, 255, 255,0.5)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
        },],
    };
    useEffect(() => {
        setLoad(true);
        if(props.FromData && props.ToData) {
            let Valuesdata: number[] = [];
            months.forEach((mon, index) => {
                axios.get(`http://api.exchangerate.host/${new Date().getFullYear() - 1}-${index + 1}-${new Date(new Date().getFullYear() - 1, index + 1, 0).getDate()}?base=${props.FromData?.label}&symbols=${props.ToData?.label}&access_key=${access_key}`)
                        .then((res) => {
                            let data: number = Number(Object.values(res.data.rates)[0]);
                            Valuesdata.push(data);
                            if(Valuesdata.length === 12) {
                                setValues(Valuesdata);
                                setLoad(false);
                            }
                        })
            })
        }
    }, [props.FromData, props.ToData])
    return (<>
        <div className={classes.containChCu}>
            <h2 className={classes.title}>Historical Rates Chart</h2>
            <div className={classes.Card}>

                {Load ? (<div className={classes.Loading}><Loading></Loading></div>)
                        : (<Line options={options}  height={100}  data={data}/>)}
                {/*<NoDataYet/>*/}

            </div>
        </div>
    </>);
}
export default ChartCurrencies;