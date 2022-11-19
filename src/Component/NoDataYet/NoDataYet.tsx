import React from "react";
import classes from "./NoDataYet.module.css";
interface props{

}
const NoDataYet:React.FC<props>=()=>{
    return(
            <div className={classes.NoDataCard}>
                <img src={require("../../assets/Image/NoDataYet.webp")} height={"200px"} alt=""/>
<p>No currency exchange yet.</p>
            </div>
    );
}
export default NoDataYet;