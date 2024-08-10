import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

function Modal() {
    const context = useContext(NoteContext)
    const {editNote, setShow, noteInEdit, setNoteInEdit } = context

    const onChange = (event) => {
      setNoteInEdit({...noteInEdit, [event.target.name]: event.target.value})
    }
  
    const handleClick = (event) => {
      event.preventDefault()
      setShow(false)
      editNote(noteInEdit.id ,noteInEdit.etitle, noteInEdit.edescription, noteInEdit.tag)
      console.log("Clicked ", noteInEdit);
    }
  return (
    <div className='w-full h-full fixed inset-0 flex items-center justify-center backdrop-brightness-50'>
        <div className='bg-white rounded-md p-5 w-[90%] sm:w-[70%] max-w-[600px]'>
            <h2 className='text-xl font-semibold'>Edit Note</h2>
            <div className='py-4 space-y-3'>
            <div className='space-y-2'>
                <label htmlFor="title" className='text-lg'>Title</label>
                <div className='w-full'>
                <input className='w-full border-[1px] border-slate-400 rounded h-8 px-2' value={noteInEdit.etitle} onChange={onChange} name='etitle' type="text" id='etitle'  minLength={4} required/>
                </div>
            </div>
            <div className='space-y-2'>
                <label htmlFor="description" className='text-lg'>Description</label>
                <div className='w-full'>
                <input className='w-full border-[1px] border-slate-400 rounded h-8 px-2' value={noteInEdit.edescription} onChange={onChange} name='edescription' type="text" id='edescription'  minLength={4} required/>
                </div>
            </div>
            <div className='space-y-2'>
                <label htmlFor="tag" className='text-lg'>Tag</label>
                <div className='w-full'>
                <input className='w-full border-[1px] border-slate-400 rounded h-8 px-2' value={noteInEdit.etag} onChange={onChange} name='etag' type="text" id='etag'/>
                </div>
            </div>
            <button className='bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 font-medium mr-3' onClick={handleClick}>Edit Note</button>
            <button className='bg-slate-600 text-white px-3 py-1 rounded-md hover:bg-slate-500 font-medium' onClick={() => {setShow(false)}}>Close</button>
            </div>
        </div>
    </div>
  )
}

export default Modal