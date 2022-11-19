import React from 'react';
import classes from './Header.module.css';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLastAmount} from "../../Settings/store/LastAmount/LastAmount";

interface props {
}

const Header: React.FC<props> = () => {
    const navigate = useNavigate(), Dispatch = useDispatch();
    const HandleRedirect = (path: string) => {
        Dispatch(setLastAmount(null));
        navigate(`/details/${path}`)
    }
    return (<>
                <div className={classes.Header}>
                    <div>
                        <img title={"Currency Exchanger"} src={require("../../assets/SVG/Logo.svg").default}
                             width={'50px'} onClick={() => navigate(`/`)} alt=""/>
                    </div>

                    <div className={classes.BtnDetails}>
                        <button type={"button"}
                                className={classes.firBtnDetails + `   ${window.location.pathname.includes("EUR-USD") ? classes.active : " "} `}
                                onClick={() => HandleRedirect("EUR-USD")}>EUR-USD Details
                        </button>
                        <button type={"button"}
                                className={classes.secBtnDetails + `   ${window.location.pathname.includes("EUR-GBP") ? classes.active : " "} `}
                                onClick={() => HandleRedirect("EUR-GBP")}>EUR-GBP Details
                        </button>
                    </div>
                </div>
            </>);
}
export default Header;