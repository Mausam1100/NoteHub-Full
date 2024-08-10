import React, { useContext, useEffect } from 'react'
import AddNote from './addNote'
import Modal from './Modal'
import NoteContext from '../context/notes/noteContext'

export default function Home(props) {
  const context = useContext(NoteContext)
  const {show } = context
  useEffect(() => {
    props.setProgress(100)
  }, [])
  return (
    <div>
      {show && <Modal />}
      <AddNote setProgress={props.setProgress}/>
    </div>
  )
}
