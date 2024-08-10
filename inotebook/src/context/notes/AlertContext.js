import React, { useState } from 'react'
import NoteAlert from './NoteAlert'

function AlertContext(props) {
    // const [alert, setAlert] = useState({show: true, status: "Success", msg: "This is success", bg: "bg-green-200"})
    const [alert, setAlert] = useState({show: false, status: "", msg: "", bg: ""})
    
    const alertTime = (show, status, msg, bg) => {
        setAlert({show: show, status: status, msg: msg, bg: bg})
        setTimeout(() => {
            setAlert({show: false, status: "", msg: "", bg: ""})
        }, 2500);
    }

  return (
    <NoteAlert.Provider value={{alert, setAlert, alertTime}}>
        {props.children}
    </NoteAlert.Provider>
  )
}

export default AlertContext