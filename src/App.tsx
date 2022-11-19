import React from 'react';
import {Route, Routes} from "react-router-dom"
import './App.css';
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";

function App() {
    return (
            <Routes>
                <Route path="/" element={<Home/>}/>

                    <Route path='details'>
                        <Route path={":CurrencyParams"} element={<Details/>}/>
                    </Route>
                <Route path="*"  element={<Home />} />
            </Routes>
    );
}

export default App;
