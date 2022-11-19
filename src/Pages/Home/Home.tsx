import React from "react";
import Layout from "../../Component/Layout/Layout";
import CurrencyExchanger from "../../Component/CurrencyExchanger/CurrencyExchanger";
import PopularCurrencies from "../../Component/PopularCurrencies/PopularCurrencies";

interface props {
}

const Home: React.FC<props> = () => {
    return (<Layout>
        <CurrencyExchanger/>
        <PopularCurrencies/>
    </Layout>);
}
export default Home;