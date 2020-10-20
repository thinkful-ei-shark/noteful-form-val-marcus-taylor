import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import StateContext from '../StateContext';
import './App.css';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import ErrorBoundary from '../ErrorBoundary';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        error: null
    };

    deleteNote = noteId => {
        const newNotes = this.state.notes.filter(note => note.id !== noteId)
        this.setState({
            notes: newNotes
        });
    }

    addFolder = (newFolder) => {
        this.setState({
            folders: [...this.state.folders,
            newFolder
        ]
        })
    }

    addNote = (newNote) => {
        this.setState({
            notes: [...this.state.notes,
            newNote
        ]
        })
    }

    componentDidMount() {
        fetch('http://localhost:9090/folders')
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(res => {
            this.setState({
                folders: res,
            })
        })
        .catch(err => this.setState({
            error: err.message
        }))

        fetch('http://localhost:9090/notes')
        .then(res => {
            if(!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(res => {
            this.setState({
                notes: res
            })
        })
        .catch(err => this.setState({
            error: err.message
        }))
    
    }
    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            return (
                                <NoteListMain
                                {...routeProps}
                                />
                            );
                        }}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </>
            );
        }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.deleteNote,
            addFolder: this.addFolder,
            addNote: this.addNote
        };
        return (
            <ErrorBoundary>
            <StateContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </StateContext.Provider>
            </ErrorBoundary>
        );
    }
}

export default App;
