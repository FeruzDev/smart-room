import React, {useEffect, useState} from 'react';
import {API_PATH} from "../tool/const";
import axios from "axios";
import Main from "./Main";

const MainFooter = () => {

    const [lights, setLights] =useState(false)
    const [allLights, setAllLights] =useState(false)
    const [ac, setAc] =useState(false)
    const [refresh, setRefresh] =useState(false)
    const [temps, setTemps] = useState([])
    const [status, setStatus] = useState([])

    const turnOofLights =()=>{
        axios.get(API_PATH + "api.php?mod=updatealllamp")
            .then(res => {setLights(true)
                // window.location.reload()
                setAllLights(true)
                window.location.reload(false);
            })
    }
    const turnOnLigths =()=>{

        axios.get(API_PATH + "api.php?mod=updatealllamp")
            .then(res => {setLights(true)
                // window.location.reload()
                setAllLights(true)
                window.location.reload(false);
            })

    }

    const getAllLamps = () => {
        axios.get(API_PATH + "api.php?mod=getrooms")
            .then(res => {

                console.log(res.data)
            })
    }

    const turnAc =()=>{
        axios.get(API_PATH + "api.php?mod=updateallcond")
            .then(res => {setLights(true)
                // window.location.reload()
                setAllLights(true)
                window.location.reload(false);
            })
    }

    useEffect(()=>{
        getAllLamps()
        axios.get(API_PATH + "api.php?mod=gettemp")
            .then(res => {
                setTemps(res.data)
            })

        axios.get(API_PATH + "api.php?mod=getstatusall")
            .then(res => {
                setStatus(res.data)
            })

            }, [refresh])




    // const turnOnOfContext = React.UserContext(turnOnLigths, turnOofLights)
    return (
        <div className="main-footer">

            <div className="left-part">
                <div className="control">
                    <div>
                        <h3>Turn all lights</h3>
                        <span>On</span>
                    </div>
                    <div>
                        <button onClick={turnOnLigths }>{status?.lamps === 1 ? <img src="/img/on.png"/> : <img src="/img/off.png"/>}</button>
                    </div>
                </div>
                <div className="control">
                    <div>
                        <h3>Turn all A/C</h3>
                        <span>Off</span>
                    </div>
                    <div>
                        <button onClick={turnAc}>{status?.conds === 1 ? <img src="/img/on.png"/> : <img src="/img/off.png"/>}</button>

                    </div>
                </div>
            </div>
            <div className="right-part">
                <div>
                    <h4>Outside temperature</h4>
                    <h2>+{temps.outtemp}° <img src="/img/hotTemp.svg" alt=""/></h2>
                </div>
                <div>
                    <h4>In office temperature</h4>
                    <h2>+{temps.intemp}° <img src="/img/coldTemp.svg" alt=""/></h2>
                </div>
            </div>
        </div>
    );
};

export default MainFooter;