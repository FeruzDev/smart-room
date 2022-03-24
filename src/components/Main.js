import React, {useEffect, useState} from 'react';
import MainFooter from "./MainFooter";
import {API_PATH} from "../tool/const";
import axios from "axios";

const Main = () => {
    const [rooms, setRooms] = useState([])
    const [lamps, setLamps] = useState([])
    const [conds, setConds] = useState([])
    const [show, setShow] = useState(false)
    const [event, setEvent] = useState(false)
    const [light, setLight] = useState(false)
    const [cond, setCond] = useState(false)
    const [date, setDate] = useState("")
    const [condState, setCondState] = useState({})
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
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal(condid) {
        setIsOpen(true);
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
        axios.get(API_PATH + "api.php?mod=updatecond&condid=" + condid  + "&key=onoff")
            .then(res => {
                axios.get(API_PATH + "api.php?mod=getcond&condid=" + condid)
                    .then(res => {
                        openModal(res.data.condid)
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
    useEffect(() => {
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
    }, [event ])
    return (
        <div className="main-home">
            <div className="parent-fon">
                <div className="back-fon">
                    <img src="/img/SchemeOffice.png" alt=""/>
                </div>
            </div>
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
            <MainFooter/>
            {
                modalIsOpen ?
                    <div
                        // isOpen={modalIsOpen}
                        // onRequestClose={closeModal}
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
                                                   <div>
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
                                                    <div>
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
                                <div className="temp-control">
                                    <button onClick={() => minus(condState?.condid)}>
                                        <svg width="24" height="24" viewBox="0 0 24 24"   xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 0C5.37239 0 0 5.37239 0 12C0 18.6276 5.37239 24 12 24C18.6276 24 24 18.6276 24 12C24 5.37239 18.6276 0 12 0ZM12 22.8C6.03558 22.8 1.2 17.9648 1.2 12C1.2 6.0352 6.03558 1.2 12 1.2C17.9644 1.2 22.8 6.03558 22.8 12C22.8 17.9644 17.9644 22.8 12 22.8Z" fill="white"/>
                                            <path d="M18 11.4H6.00002C5.66881 11.4 5.40002 11.6688 5.40002 12C5.40002 12.3312 5.66881 12.6 6.00002 12.6H18C18.3312 12.6 18.6 12.3312 18.6 12C18.6 11.6688 18.3312 11.4 18 11.4Z" fill="white"/>
                                        </svg>
                                    </button>
                                    <h1><span>{condState.temp}°</span> <br/> Температура C°</h1>
                                    <button onClick={() => plus(condState?.condid)}>
                                        <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.0667 0C5.45003 0 0.0666504 5.38292 0.0666504 12C0.0666504 18.6171 5.45003 24 12.0667 24C18.6833 24 24.0667 18.6171 24.0667 12C24.0667 5.38292 18.6833 0 12.0667 0ZM12.0667 23.0769C5.95911 23.0769 0.989727 18.1075 0.989727 12C0.989727 5.89246 5.95911 0.923077 12.0667 0.923077C18.1742 0.923077 23.1436 5.89246 23.1436 12C23.1436 18.1075 18.1742 23.0769 12.0667 23.0769Z" fill="white"/>
                                            <path d="M17.8361 11.5386H12.5284V6.46166C12.5284 6.20643 12.3216 6.00012 12.0668 6.00012C11.8121 6.00012 11.6053 6.20643 11.6053 6.46166V11.5386H6.2976C6.04283 11.5386 5.83606 11.7449 5.83606 12.0001C5.83606 12.2554 6.04283 12.4617 6.2976 12.4617H11.6053V18.0001C11.6053 18.2554 11.8121 18.4617 12.0668 18.4617C12.3216 18.4617 12.5284 18.2554 12.5284 18.0001V12.4617H17.8361C18.0908 12.4617 18.2976 12.2554 18.2976 12.0001C18.2976 11.7449 18.0908 11.5386 17.8361 11.5386Z" fill="white"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="control-footer">
                                <div>
                                    <button><img src="/img/cf1.png" alt=""/></button>
                                    <h4>Качания</h4>
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
        </div>
    );
};

export default Main;