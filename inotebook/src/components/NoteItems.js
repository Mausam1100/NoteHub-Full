import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import NoteContext from '../context/notes/noteContext'

function NoteItems(props) {
  const context = useContext(NoteContext)
  const { deleteNote, updateNote } = context
  const {note} = props
  return (
    // <div className='w-[calc(32%-4px)]'>
    <div className='w-[calc(100%-4px)] sm:w-[calc(50%-12px)]'>
        <div className='rounded-md p-3 border-[1px] border-gray-400'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-medium'>{note.title}</h2>
            <div className='space-x-3 mr-3'>
              <FontAwesomeIcon className='cursor-pointer' icon={faPenToSquare} onClick={() => {updateNote(note)}} size='lg' />
              <FontAwesomeIcon className='cursor-pointer' icon={faTrashCan} onClick={()=> {deleteNote(note._id)}} size='lg' />
            </div>
          </div>
          <p className='text-slate-600 text-sm pt-1'>{note.description}</p>
        </div>
    </div>
  )
}

export default NoteItems