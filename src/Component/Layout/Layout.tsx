import React  from 'react';
import Header from "../Header/Header";
import classes from "./Layout.module.css";
interface  props{
    children: React.ReactNode,
}
const  Layout:React.FC<props>=(props)=>{
    return(
            <>
                <Header/>
                <div className={classes.Container}>
                    <div className={classes.content}>

                    {props.children}
                </div>
                </div>

            </>
    );
}
export default  Layout;