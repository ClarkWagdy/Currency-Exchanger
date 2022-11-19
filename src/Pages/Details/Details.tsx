import React, {useEffect, useState} from "react";
import Layout from "../../Component/Layout/Layout";
import CurrencyExchanger from "../../Component/CurrencyExchanger/CurrencyExchanger";
import {useParams} from "react-router";
import {Currency} from "../../Settings/Currency";
import ChartCurrencies from "../../Component/ChartCurrencies/ChartCurrencies";

interface props {
}

const Details: React.FC<props> = () => {
    let {CurrencyParams} = useParams();
    const [From, setFrom] = useState<{ value: string, label: string }>(), [To, setTo] = useState<{ value: string, label: string }>();
    useEffect(() => {
        const Currencies: Array<string> | undefined = CurrencyParams?.split('-');
        if(Currencies?.length === 2 && Currency !== undefined) {
            let FromData = Currency.find((ele: { value: string, label: string }) => (ele.label === Currencies[0]));
            let ToData = Currency.find((ele: { value: string, label: string }) => (ele.label === Currencies[1]));
            setFrom(FromData);
            setTo(ToData);
        }
    }, [CurrencyParams, Currency])
    return (<>
        <Layout>
            <CurrencyExchanger Details FromData={From} ToData={To}/>
            <ChartCurrencies FromData={From} ToData={To}/>
        </Layout>
    </>);
}
export default Details;