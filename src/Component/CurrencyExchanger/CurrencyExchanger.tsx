import React, {useEffect, useState} from 'react';
import classes from './CurrencyExchanger.module.css';
import Select from 'react-select';
import {ReactComponent as SwapIcon} from '../../assets/SVG/Swap.svg';
import {ReactComponent as Arrow} from '../../assets/SVG/Arrow.svg';
import {Link, useNavigate} from 'react-router-dom';
import {Currency} from "../../Settings/Currency";
import axios from 'axios';
import Loading from "../Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import {CurrencyConverted, setCurrencyConverted} from "../../Settings/store/MostConverted/MostConvertedSlice";
import {RootState} from "../../Settings/store/store";
import {setLastAmount} from "../../Settings/store/LastAmount/LastAmount";

interface props {
    Details?: boolean,
    FromData?: { value: string, label: string },
    ToData?: { value: string, label: string },
}

const CurrencyExchanger: React.FC<props> = (props) => {
    const [Amount, setAmount] = useState<string>(""), [Result, setResult] = useState<number>(0), [From, setFrom] = useState<{ value: string, label: string } | null>(props.FromData ? props.FromData : null), [To, setTo] = useState<{ value: string, label: string } | null>(props.ToData ? props.ToData : null), [AmountError, setAmountError] = useState<string>(""), [LoadingState, setLoadingState] = useState<boolean>(false),
            Dispatch = useDispatch(), navigate = useNavigate(),
            CurrencyConverted: Array<CurrencyConverted> | null = useSelector((state: RootState) => state.CurrencyConverted),
            LastAmount: string | null = useSelector((state: RootState) => state.LastAmount), [flag, setflag] = useState<boolean>(false);
    useEffect(() => {
        if(props.Details && props.FromData && props.ToData) {
            setFrom(props.FromData);
            setTo(props.ToData);
            setAmount(LastAmount ? LastAmount : "1");
            setflag(!flag);
        }
    }, [props.FromData, props.ToData, props.Details]);
    useEffect(() => {
        HandleConvert();
    }, [flag])
    const HandleAmountChange = (e: string) => {
        if(isNaN(Number(e))) {
            setAmountError("Should only number")
        } else if(Number(e) > 0) {
            setAmount(e);
            Dispatch(setLastAmount(e));
            setResult(0)
            setAmountError("")
        } else {
            Dispatch(setLastAmount(null));
            setAmount("");
            setAmountError("")
        }
    }
    const HandleSwap = () => {
        let FromCUR: { value: string, label: string } | null | undefined = From;
        let ToCUR: { value: string, label: string } | null | undefined = To;
        [FromCUR, ToCUR] = [ToCUR, FromCUR];
        setFrom(FromCUR);
        setTo(ToCUR);
        if(Amount !== "" && Result > 0) {
            setResult(Number(Amount) ** 2 / Result)
        }
    }
    const HandleConvert = () => {
        if(From != null && To != null && Amount !== "") {
            setLoadingState(true);
            axios.get(`https://api.exchangerate.host/convert?from=${From.label}&to=${To.label}`).then(res => {
                let result: number = Number(res.data.result * Number(Amount));
                let allCurrencyConverted: Array<CurrencyConverted> = CurrencyConverted !== null ? [...CurrencyConverted] : [];
                let ThisConverted: CurrencyConverted = {
                    Id: allCurrencyConverted.length,
                    Amount: Amount,
                    Result: result,
                    CreateAt: new Date().toString(),
                    Count: 0,
                    From: From.label,
                    To: To.label,
                };
                if(allCurrencyConverted.length === 0) {
                    allCurrencyConverted.push(ThisConverted);
                } else {
                    let data: CurrencyConverted | null | undefined = allCurrencyConverted.find((ele) => (ele.From === ThisConverted.From && ele.To === ThisConverted.To && ele.Amount === ThisConverted.Amount))
                    let dataindex = allCurrencyConverted.findIndex(object => {
                        return (object.Id === (data !== null && data !== undefined ? data.Id : null));
                    });
                    if(data !== null && data !== undefined && new Date(ThisConverted.CreateAt).getTime() - new Date(data.CreateAt).getTime() > 120000 && data.Result === ThisConverted.Result) {
                        let Converted = {...data};
                        Converted.Count = data.Count + 1;
                        Converted.CreateAt = new Date().toString();
                        allCurrencyConverted[dataindex] = Converted;
                    } else if(data === null || data === undefined) {
                        allCurrencyConverted.push(ThisConverted);
                    }
                }
                allCurrencyConverted.sort((ele1, ele2) => (ele1.Count < ele2.Count) ? 1 : ((ele2.Count < ele1.Count) ? -1 : 0));
                Dispatch(setCurrencyConverted(allCurrencyConverted));
                setLoadingState(false);
                setResult(result);
                if(props.Details){
                    navigate(`/details/${From?.label}-${To?.label}`)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
    return (<div className={classes.containCuEx}>
        <div className={classes.TitleHeader}>
            <h2 className={classes.title}>{props.Details ? `${From?.label} - ${From?.value}  ` : "Currency Exchanger"}</h2>
            {props.Details && (<div>
                <button className={classes.HomeBTN} type={"button"} onClick={() => navigate('/')}>Back to Home</button>
            </div>)}
        </div>
        <div className={classes.Card}>
            <div className={classes.DataIn}>
                <div className={classes.Amountdiv}>
                    <label htmlFor={"Amount"}
                           className={classes.label}>Amount {AmountError === "" ? null : (
                            <span className={classes.Error}>*{AmountError}</span>)}</label>
                    <input value={Amount} id={"Amount"} className={classes.AmountIn}
                           onChange={(e) => HandleAmountChange(e.target.value)} placeholder={'Amount'}/>
                </div>
                <div className={classes.FromTo}>
                    <div style={props.Details ? {marginInlineEnd: '10px'} : {}}>
                        <label className={classes.label}>From</label>
                        <Select styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                "&:hover": {
                                    boxShadow: state.isFocused ? '0 0 0 1px rgb(234,191,60)' : 'unset'
                                },
                                "&:active": {
                                    borderColor: 'rgb(234,191,60)', boxShadow: '0 0 0 1px rgb(234,191,60)'
                                },
                                boxShadow: state.isFocused ? '0 0 0 1px rgb(234,191,60)' : 'unset',
                                borderColor: state.isFocused || state.menuIsOpen ? 'rgb(234,191,60)' : 'gray',
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                borderRight: '5px',
                                fontWeight: 'bold',
                            }), singleValue: (baseStyles) => ({
                                ...baseStyles, color: '#231F20'
                            }), menu: (baseStyles) => ({
                                ...baseStyles, maxHeight: "120px", overflow: "hidden"
                            }),
                        }}
                                isDisabled={props.Details}
                                value={From}
                                onChange={(e) => {
                                    setResult(0);
                                    setFrom(e)
                                }}
                                options={Currency} className={classes.selectCU}/>
                    </div>

                    {!props.Details && (<div>
                        <button className={classes.swapbtn} type={"button"} title={"Swap"}
                                onClick={() => HandleSwap()}><SwapIcon/></button>
                    </div>)}
                    <div>
                        <label className={classes.label}>To</label>
                        <Select styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                "&:hover": {
                                    boxShadow: state.isFocused ? '0 0 0 1px rgb(234,191,60)' : 'unset'
                                },
                                "&:active": {
                                    borderColor: 'rgb(234,191,60)', boxShadow: '0 0 0 1px rgb(234,191,60)'
                                },
                                boxShadow: state.isFocused ? '0 0 0 1px rgb(234,191,60)' : 'unset',
                                borderColor: state.isFocused || state.menuIsOpen ? 'rgb(234,191,60)' : 'gray',
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                borderRight: '5px',
                                fontWeight: 'bold',
                            }), singleValue: (baseStyles) => ({
                                ...baseStyles, color: '#231F20'
                            }), menu: (baseStyles) => ({
                                ...baseStyles, maxHeight: "120px", overflow: "hidden"
                            }),
                        }}
                                value={To}
                                onChange={(e) => {
                                    setResult(0);
                                    setTo(e);
                                }}
                                options={Currency} className={classes.selectCU}/>
                    </div>
                </div>

            </div>
            <div className={classes.convert}>
                <button className={classes.convertBTN} type={"button"}
                        disabled={!(From != null && To !== null && Amount !== "")}
                        onClick={() => HandleConvert()}>{LoadingState ? (<Loading/>) : ("Convert")}</button>
            </div>
            <div className={classes.Result}>
                <div className={`${classes.DefValue} +  m-end-10px + ${props.Details ? classes.DefValuediv50 : classes.DefValuediv}`}>
                    {Result > 0 && From != null && To != null && (
                            <p>{`${1}${From.label} = ${(Result / Number(Amount)).toFixed(3)}${To.label}`}</p>)}
                </div>
                <div className={`${classes.DefValuediv} +  m-end-10px  + ${props.Details ? classes.DefValuediv50 : classes.DefValuediv} `}>
                    <label className={classes.label}>Result</label>
                    <div className={classes.DefValue}>
                        {Result > 0 && To != null && (<p>{Result.toFixed(3) + " " + To.label}</p>)}
                    </div>
                </div>
                {!props.Details && (<div className={classes.MoreDetailsdiv}>
                    {From && To && Amount && Result ? (
                            <Link to={`/details/${From.label}-${To.label}`} className={classes.MoreDetails}>More
                                Details <Arrow/></Link>) : (<span className={classes.MoreDetails} style={{
                        opacity: '0.5', transform: "unset", cursor: "default"
                    }}>More Details <Arrow/></span>)}
                </div>)}

            </div>
        </div>
    </div>);
}
export default CurrencyExchanger;