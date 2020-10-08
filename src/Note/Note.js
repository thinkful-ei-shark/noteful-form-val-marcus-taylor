import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StateContext from '../StateContext'
import PropTypes from 'prop-types'

export default class Note extends React.Component{
  static contextType = StateContext;
  
 handleDeleteNote = (noteId, callback) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
            'content-type' : 'application/json'
        },
    })
    .then(res => {
        if (!res.ok){
            throw new Error(res.statusText);
        } return res.json()
    })
    .then(res => {
        this.props.history.push('/');
        callback(noteId); 
    })
    .catch(err => console.log(err));
  }

  
  render(){
    const {deleteNote} = this.context;
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${this.props.id}`}>
          {this.props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={() => {
        this.handleDeleteNote(this.props.id, deleteNote)
      }}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(this.props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
}

Note.propTypes = {
  id : PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string
}
