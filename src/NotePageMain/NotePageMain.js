import React from 'react'
import Note from '../Note/Note'
import Loading from '../Loading/Loading'
import './NotePageMain.css'
import StateContext from '../StateContext'
import {findNote} from '../notes-helpers'

export default class NotePageMain extends React.Component {
  static contextType = StateContext;

  render () {
    const {notes} = this.context;
    console.log('Notes from context:', notes);
    
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId);
    console.log('note from findNote:', note);
    
  
  return note ? (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        {...this.props}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  ) : (
  <section className='NotePageMain'>
    <Loading />
  </section>)
        }
}
