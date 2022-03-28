import React, {useEffect, useState} from 'react';

import {API_PATH} from "../tool/const";
import axios from "axios";

const Main = () => {
    const [rooms, setRooms] = useState([])
    const [lamps, setLamps] = useState([])
    const [conds, setConds] = useState([])
    const [event, setEvent] = useState(false)
    const [light, setLight] = useState(false)
    const [cond, setCond] = useState(true)
    const [show, setShow] = useState(false);
    const [date, setDate] = useState("")
    const [condState, setCondState] = useState({})
    const [modalIsOpen, setIsOpen] = useState(false);
    const [lights, setLights] =useState(false)
    const [allLights, setAllLights] =useState(false)
    const [temps, setTemps] = useState([])
    const [status, setStatus] = useState([])
    let inter;
    const month = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек",]
    const getAllLamps = () => {
        axios.get(API_PATH + "api.php?mod=getrooms")
            .then(res => {
                setRooms(res.data)
                console.log(res.data)
            })
    }
    const turnCond = () => {
        setCond(!cond)
        openModal()
    }
    function openModal(condid) {
        stop()
        setIsOpen(true);
        setShow(true);
        axios.get(API_PATH + "api.php?mod=getcond&condid=" + condid)
            .then(res => {
                setCondState(res.data)
            })
    }
    function closeModal() {
        setIsOpen(false);
    }
    const turnLight = (lamp_id) => {
        axios.get(API_PATH + "api.php?mod=updatelamp&lampid=" + lamp_id)
            .then(res => {
                setEvent(!event)
            })
    }
    const changeTemp = (condid) => {
        axios.get(API_PATH + "api.php?mod=updatecond&condid=" + condid  + "&key=coolheat")
            .then(res => {
                axios.get(API_PATH + "api.php?mod=getcond&condid=" + condid)
                    .then(res => {
                        setCondState(res.data)
                        openModal(res.data.condid)
                    })
            })
    }
    const condOnOff = (condid) => {
        openModal(condid)
        setEvent(!event)
        setShow(true)
        axios.get(API_PATH + "api.php?mod=updatecond&condid=" + condid  + "&key=onoff")
            .then(res => {
                axios.get(API_PATH + "api.php?mod=getcond&condid=" + condid)
                    .then(res => {
                        openModal(res.data.condid)
                        setEvent(!event)

                    })
            })
    }
    const changeSpeed = (condid) => {
        axios.get(API_PATH + "api.php?mod=updatecond&condid=" + condid  + "&key=speedfan")
            .then(res => {
                axios.get(API_PATH + "api.php?mod=getcond&condid=" + condid)
                    .then(res => {
                        openModal(res.data.condid)
                    })
            })
    }
    const changeSwing = (condid) => {
        axios.get(API_PATH + "api.php?mod=updatecond&condid=" + condid  + "&key=swingud")
            .then(res => {
                axios.get(API_PATH + "api.php?mod=getcond&condid=" + condid)
                    .then(res => {
                        openModal(res.data.condid)
                    })
            })
    }
    const plus = (condid) => {
        axios.get(API_PATH + "api.php?mod=updatecond&condid=" + condid  + "&key=tempup")
            .then(res => {
                axios.get(API_PATH + "api.php?mod=getcond&condid=" + condid)
                    .then(res => {
                        openModal(res.data.condid)
                    })
            })
    }
    const minus = (condid) => {
        axios.get(API_PATH + "api.php?mod=updatecond&condid=" + condid  + "&key=tempdown")
            .then(res => {
                axios.get(API_PATH + "api.php?mod=getcond&condid=" + condid)
                    .then(res => {
                        openModal(res.data.condid)
                    })
            })
    }

    const getAll = () => {
        getAllLamps()
        axios.get(API_PATH + "api.php?mod=getalllamp")
            .then(res => {
                setLamps(res.data)
                console.log(res.data)
            })
        axios.get(API_PATH + "api.php?mod=getallcond")
            .then(res => {
                setConds(res.data)
                console.log(res.data)
            })
        axios.get(API_PATH + "api.php?mod=getdate")
            .then(res => {
                setDate(res.data)
                console.log(res.data)
            })
        axios.get(API_PATH + "api.php?mod=getstatusall")
            .then(res => {
                setStatus(res.data)
            })
    }
    const getStatus = () => {
        axios.get(API_PATH + "api.php?mod=getstatusall")
            .then(res => {
                setStatus(res.data)
            })
    }
    const turnOnLigths =()=>{
        axios.get(API_PATH + "api.php?mod=updatealllamp")
            .then(res => {setLights(true)
                getAll()
                getStatus()
                setAllLights(true)
            })
    }
    const turnAc =()=>{
        axios.get(API_PATH + "api.php?mod=updateallcond")
            .then(res => {setLights(true)
                // window.location.reload()
                setAllLights(true)
                getAll()
                getStatus()
             })
    }
    useEffect(() => {
        getAll()
        axios.get(API_PATH + "api.php?mod=gettemp")
            .then(res => {
                setTemps(res.data)
            })

    }, [event ])
    const stop = () => {
        clearInterval(inter)
    }
    return (
        <div className="main-home">
            <div className="parent-fon">
                <div className="back-fon">
                    <img src="/img/SchemeOffice.png" alt=""/>
                </div>
            </div>
            <div className="date">

                <h2>
                   {date?.date?.slice(11,13)}:{date?.date?.slice(14,16)}

                </h2>
            </div>
            <span className="date-with-month">
                   {date?.date?.slice(8,10)} {month[parseInt(date?.date?.slice(5,7))-1]} {date?.date?.slice(0,4)}
                </span>
            {
                rooms?.map(item => (
                    <div className="switch" style={{left: item?.pleft + "px", top: item?.ptop + "px"}}>
                        <button
                            onClick={() => turnLight(lamps.filter(item2 => item2.roomid === item.roomid ? item2.roomid : "")[0].roomid)}
                        >
                            {
                                lamps.filter(item2 => item2.roomid === item.roomid ? item2.roomid : "")[0]?.status === 1 ?
                                    <img src="img/Lighton.svg" alt="ON"/>
                                    :
                                    <img src="img/Lightoff.svg" alt="OFF"/>
                            }
                        </button>
                        {
                            conds.filter(item2 => item2.roomdid === item.roomid ? item2.roomdid : "").map(item3 => (
                                <button
                                    onClick={() => openModal(item3.condid)}>
                                    {
                                        item3.status == "0"
                                            ?
                                    <img src="/img/AirCondoff.svg" alt=""/>
                                            :
                                    <img src="/img/air-cond2.gif" alt=""/>}
                                    <span className="temp-room">+{item3?.temp}</span>
                                </button>
                            ))
                        }
                        <p>{item?.name}</p>
                    </div>
                ))
            }
            {
                modalIsOpen ?
                    <div
                        className="my-modal"
                    >
                        <div className="my-modal-content">
                            <button onClick={closeModal} className="close-btn"><img src="/img/closebtn.svg" alt=""/>
                            </button>
                            <div className="control-header">
                                <div className="menus">
                                    {
                                        condState ? condState.scoolheat === "1" ?
                                               <>
                                                   <div className="active">
                                                       <img src="/img/f2a.png" alt=""/>
                                                       <h4>Охлаждение</h4>
                                                   </div>
                                                   <div>
                                                       <img src="/img/f1.png" alt=""/>
                                                       <h4>Обогрев</h4>
                                                   </div>
                                               </>
                                                :
                                                <>
                                                    <div>
                                                        <img src="/img/f2.png" alt=""/>
                                                        <h4>Охлаждение</h4>
                                                    </div>
                                                    <div className="active">
                                                        <img src="/img/f1a.png" alt=""/>
                                                        <h4>Обогрев</h4>
                                                    </div>
                                                </>
                                            :
                                            ""
                                    }
                                </div>
                                <button className="rejim" onClick={() => changeTemp(condState?.condid)}>Режим</button>
                            </div>
                            <div className="control-body">

                                <div className="temp-control">
                                    <button onClick={() => minus(condState?.condid)}>
                                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 0C9.40168 0 0 9.40168 0 21C0 32.5983 9.40168 42 21 42C32.5983 42 42 32.5983 42 21C42 9.40168 32.5983 0 21 0ZM21 39.9C10.5623 39.9 2.1 31.4384 2.1 21C2.1 10.5616 10.5623 2.1 21 2.1C31.4377 2.1 39.9 10.5623 39.9 21C39.9 31.4377 31.4377 39.9 21 39.9Z" fill="white"/>
                                            <path d="M31.5001 19.9501H10.5001C9.92044 19.9501 9.45007 20.4204 9.45007 21.0001C9.45007 21.5797 9.92044 22.0501 10.5001 22.0501H31.5001C32.0797 22.0501 32.5501 21.5797 32.5501 21.0001C32.5501 20.4204 32.0797 19.9501 31.5001 19.9501Z" fill="white"/>
                                        </svg>

                                    </button>
                                    <h1><span>{condState.temp}°</span> <br/> Температура C°</h1>
                                    <button onClick={() => plus(condState?.condid)}>
                                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 0C9.42092 0 0 9.42012 0 21C0 32.5799 9.42092 42 21 42C32.5791 42 42 32.5799 42 21C42 9.42012 32.5791 0 21 0ZM21 40.3846C10.3118 40.3846 1.61538 31.6882 1.61538 21C1.61538 10.3118 10.3118 1.61538 21 1.61538C31.6882 1.61538 40.3846 10.3118 40.3846 21C40.3846 31.6882 31.6882 40.3846 21 40.3846Z" fill="white"/>
                                            <path d="M31.0961 20.1923H21.8077V11.3077C21.8077 10.861 21.4458 10.5 21 10.5C20.5541 10.5 20.1923 10.861 20.1923 11.3077V20.1923H10.9038C10.458 20.1923 10.0961 20.5533 10.0961 21C10.0961 21.4467 10.458 21.8077 10.9038 21.8077H20.1923V31.5C20.1923 31.9467 20.5541 32.3077 21 32.3077C21.4458 32.3077 21.8077 31.9467 21.8077 31.5V21.8077H31.0961C31.542 21.8077 31.9038 21.4467 31.9038 21C31.9038 20.5533 31.542 20.1923 31.0961 20.1923Z" fill="white"/>
                                        </svg>

                                    </button>
                                </div>
                            </div>
                            <div className="control-footer">
                                <div>
                                    <div className="on-btn">
                                        <button className="power-on-off" onClick={() => condOnOff(condState?.condid)}>
                                            {
                                                condState ? condState.sonoff == "1" ?
                                                        <img src="img/Poweron.png" alt=""/>
                                                        :
                                                        <img src="img/Poweroff.png" alt=""/>
                                                    :
                                                    ""
                                            }
                                        </button>
                                        {
                                            condState ? condState.sonoff === "0" ?
                                                    <h4>Вкл</h4>
                                                    :
                                                    <h4>Выкл</h4>
                                                :
                                                ""
                                        }
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => changeSwing(condState?.condid)}>
                                        {
                                            condState ? condState.sswingud === "1" ?
                                                    <img src="/img/cf2a.png" alt=""/>
                                                    :
                                                    <img src="/img/cf2aoff.png" alt=""/>
                                                :
                                                ""
                                        }
                                    </button>
                                    <h4>Направление</h4>
                                </div>
                                <div>
                                    <button onClick={() => changeSpeed(condState?.condid)}>
                                        {
                                            condState ? condState.sspeedfan === "1" ?
                                                    <img src="/img/slow.png" alt=""/>
                                                    :
                                                condState.sspeedfan === "2" ?
                                                    <img src="/img/cf3a.png" alt=""/>
                                                    :
                                                    condState.sspeedfan === "3" ?
                                                        <img src="/img/fast.png" alt=""/>
                                                        :
                                                        condState.sspeedfan === "4" ?

                                                            <img src="/img/auto.png" alt=""/>
                                                            :
                                                            ""
                                                :
                                                ""
                                        }
                                    </button>
                                    <h4>Скорость</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    ""
            }
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
        </div>
    );
};

export default Main;