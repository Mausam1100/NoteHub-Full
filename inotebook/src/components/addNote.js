import React, { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/notes/noteContext'
import NoteItems from './NoteItems'
import NoteAlert from '../context/notes/NoteAlert'
import { useNavigate } from 'react-router-dom'

export default function AddNote(props) {
  const navigate = useNavigate()

  const context = useContext(NoteAlert)
  const {alertTime} = context

  const noteData = useContext(NoteContext)
  const {note, addNote, getNotes} = noteData

  const [newNote, setNewNote] = useState({"title": "", "description": "", "tag": ""})

  const onChange = (event) => {
    setNewNote({...newNote, [event.target.name]: event.target.value})
  }

  const handleClick = (event) => {
    event.preventDefault()
    if (newNote.title.length>=3 && newNote.description.length>=4) {
      props.setProgress(100)
      addNote(newNote.title, newNote.description, newNote.tag)
      setNewNote({"title": "", "description": "", "tag": ""})
    }
    else {
      alertTime(true, "Fail", "Title And Description Cannot Be Less Then 3 And 4 Respectively", "bg-red-300")
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // props.setProgress(100)
      getNotes()
    }
    else {
      navigate('/login')
    }

    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className='w-[90%] lg:w-[65%] md:w-[80%] mx-auto max-w-[1000px] py-6'>
        <h2 className='text-2xl font-semibold'>Add Notes</h2>
        <div className='py-4 space-y-5'>
          <div className='space-y-2'>
            <label htmlFor="title" className='text-lg'>Title</label>
            <div className='w-full'>
              <input className='w-full border-[1px] border-slate-400 rounded h-10 px-3' value={newNote.title} onChange={onChange} name='title' type="text" id='title' minLength={4} required/>
            </div>
          </div>
          <div className='space-y-2'>
            <label htmlFor="description" className='text-lg'>Description</label>
            <div className='w-full'>
              <input className='w-full border-[1px] border-slate-400 rounded h-10 px-3' value={newNote.description} onChange={onChange} name='description' type="text" id='description' minLength={4} required/>
            </div>
          </div>
          <div className='space-y-2'>
            <label htmlFor="tag" className='text-lg'>Tag</label>
            <div className='w-full'>
              <input className='w-full border-[1px] border-slate-400 rounded h-10 px-3' value={newNote.tag} onChange={onChange} name='tag' type="text" id='tag'/>
            </div>
          </div>
          <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 font-medium' onClick={handleClick}>Add Note</button>
        </div>
        <div className='py-5'>
          <h2 className='text-2xl font-semibold'>Your Notes</h2>
          {note.length === 0 && <div className='my-3'>No Notes To Display</div>}
          <div className='flex flex-wrap gap-6 py-6'>
            {note.map((notess) => {
              return <NoteItems key={notess._id} note={notess}/>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
