import React, {useEffect, useState} from "react";
import classes from "./PopularCurrencies.module.css";
import {ReactComponent as Arrow} from '../../assets/SVG/ArrowTo.svg';
import {useSelector} from "react-redux";
import {RootState} from "../../Settings/store/store";
import {CurrencyConverted} from "../../Settings/store/MostConverted/MostConvertedSlice";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import NoDataYet from "../NoDataYet/NoDataYet";

TimeAgo.addDefaultLocale(en)
const PopularCurrencies: React.FC = () => {
    const PopularCurrency: Array<CurrencyConverted> | null = useSelector((state: RootState) => state.CurrencyConverted);
    const [MostCurrencyConverted, setMostCurrencyConverted] = useState<Array<CurrencyConverted>>([]);
    const timeAgo = new TimeAgo('en-US')
    useEffect(() => {
        if(PopularCurrency !== null && [...PopularCurrency].length > 0) {
            setMostCurrencyConverted([...PopularCurrency].slice(0, 9))
        }
    }, [PopularCurrency])
    return (
            <div className={classes.containPoCu}>
                <h2 className={classes.title}>Most popular currencies</h2>
                <div className={classes.Card}>
                    {MostCurrencyConverted.length > 0 ? MostCurrencyConverted.map(ele => {
                        return (
                                <div className={classes.Box} key={ele.Id}>
                                    <div className={classes.CurrenciesData} key={ele.Id}>
                                        <div>
                                            <div><h4>{`${Number(ele.Amount).toFixed(3)} ${ele.From}`}</h4></div>
                                            <div>
                                                <p>{`1${ele.From} = ${(ele.Result / Number(ele.Amount)).toFixed(3)} ${ele.To}`}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div><Arrow/></div>
                                            <div><p> {timeAgo.format(new Date(ele.CreateAt))}</p></div>
                                        </div>
                                        <div>
                                            <div><h4>{`${Number(ele.Result).toFixed(3)} ${ele.To}`}</h4></div>
                                            <div>
                                                <p>{`1${ele.To} = ${(Number(ele.Amount) ** 2 / ele.Result).toFixed(3)} ${ele.From}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        );
                    }) : (<NoDataYet/>)}

                </div>
            </div>
    );
}
export default PopularCurrencies;