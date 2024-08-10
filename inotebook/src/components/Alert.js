import React, { useContext } from 'react'
import NoteAlert from '../context/notes/NoteAlert'

export default function Alert() {
  const context = useContext(NoteAlert)
  const {alert} = context
  return (
    <div className='h-10'>
        {alert.show && <div className={`w-full h-10 flex items-center ${alert.bg}`}>
            <div className='setWidth font-sem text-lg text-black flex items-center'>
                {alert.status}: {alert.msg}
            </div>
        </div>}
    </div>
  )
}
