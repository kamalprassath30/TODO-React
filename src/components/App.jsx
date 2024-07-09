import React, { useState, useEffect } from 'react';
import AddNoteModal from './AddNoteModal';
import EditNoteModal from './EditNoteModal';
import Note from './Note';
import Button from './Button.jsx';

const App = () => {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [id, setId] = useState(1); // ID for new notes
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [showTasks, setshowTasks] = useState(false);
  const [toDisplay, settoDisplay] = useState(notes);

  useEffect(() => {
    // Initialize ID based on existing notes
    if (notes.length > 0) {
      setId(notes[notes.length - 1].id + 1);
    }
    settoDisplay(notes);
  }, [notes]);

  useEffect(() => {
    // Save notes to localStorage whenever notes state changes
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const openAddTaskModal = () => {
    setShowAddModal(true);
  };

  const closeAddTaskModal = () => {
    setShowAddModal(false);
  };

  const handleAddTask = (title, content) => {
    if (!title.trim()) {
      alert('Please add a title for your note.');
      return;
    }
    const newNote = {
      id: id,
      title: title.trim(),
      content: content.trim(),
      completed: false,
    };
    setNotes([...notes, newNote]);
    setId(id + 1);
    settoDisplay([...notes, newNote]);
    setshowTasks(true);
    closeAddTaskModal();
  };

  const openEditModal = (id) => {
    const note = notes.find(note => note.id === id);
    setNoteToEdit(note);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setNoteToEdit(null);
  };

  const handleSaveEdit = (id, title, content) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, title, content } : note
    );
    setNotes(updatedNotes);
    settoDisplay(updatedNotes);
    setshowTasks(true);
    closeEditModal();
  };

  const handleDeleteNote = (id) => {
    const filteredNotes = notes.filter(note => note.id !== id);
    setNotes(filteredNotes)
    settoDisplay(filteredNotes);
    setshowTasks(true);
  };

  const handleToggleComplete = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    );
    setNotes(updatedNotes);
    settoDisplay(updatedNotes);
    setshowTasks(true);
  };

  const incompleteTasks = () => {
    const incomplete = JSON.parse(localStorage.getItem('notes')).filter(note => note.completed !== true);
    settoDisplay(incomplete);
    setshowTasks(true);
  }

  const deleteAll = () => {
    setNotes([]);
    settoDisplay([]);
    setshowTasks(true);
  }

  const searchNotes = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchTerm));
    settoDisplay(filteredNotes);
    setshowTasks(true);
  }

  const showAllTasks = () => {
    settoDisplay(notes);
    setshowTasks(true);
  };

  const displayNotes = () => {
    if (toDisplay.length === 0) {
      return (
        <p>No tasks to display!</p>
      )
    }
    return (
      // <div className="noteContainer">
      //   {toDisplay.map(note => (
      //     <Note key={note.id} note={note} onEdit={openEditModal} onDelete={handleDeleteNote} onToggleComplete={handleToggleComplete} />
      //   ))}
      // </div>
      <ul className="noteContainer">
        {toDisplay.map(note => (
          <Note
            key={note.id}
            note={note}
            onEdit={openEditModal}
            onDelete={handleDeleteNote}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </ul>
    );
  };


  return (
    <div className="body">
      <div className="app">

        <h1>Sticky Notes App</h1>
        {/* <button className="button addTask" onClick={openAddTaskModal}>Add Task</button> */}
        <Button className="addTask" onClick={openAddTaskModal}>Add Task</Button>
        <Button className="showTasks" onClick={showAllTasks}>Show Tasks</Button>
        <Button className="incompleteTasks" onClick={incompleteTasks}>Incomplete Tasks</Button>
        <Button className="deleteTasks" onClick={deleteAll}>Delete All</Button>

        {/* <button className="button showTasks" onClick={showAllTasks}>Show Tasks</button>
        <button className="button incompleteTasks" onClick={incompleteTasks}>Incomplete Tasks</button>
        <button className="button deleteTasks" onClick={deleteAll}>Delete All</button> */}

        {/* <Button variant="contained" color="primary" onClick={openAddTaskModal}>Add Task</Button>
        <Button variant="contained" color="secondary" onClick={deleteAll}>Delete All</Button> */}

        {/* Add Task Modal */}
        {showAddModal && <AddNoteModal onClose={closeAddTaskModal} onSave={handleAddTask} />}

        {/* Edit Task Modal */}
        {showEditModal && <EditNoteModal note={noteToEdit} onClose={closeEditModal} onSave={handleSaveEdit} />}

        <input type="text" className='searchBar' placeholder='  Type here to search🔍' onInput={searchNotes} />
      </div >
      {showTasks && displayNotes()}
    </div >
  );
};

export default App;
