// import React from 'react';

// const Note = ({ note, onEdit, onDelete, onToggleComplete }) => {
//     return (
//         <div className="note">
//             <div className={`noteInfo ${note.completed ? 'completed' : ''}`}>
//                 <div className="noteId">Task: {note.id}</div>
//                 <div className="noteTitle">Title: {note.title}</div>
//                 <div className="noteContent">{note.content}</div>
//             </div>
//             <div className="noteButtons">
//                 <input type="checkbox" className="checkBtn" checked={note.completed} onChange={() => onToggleComplete(note.id)} />
//                 <button className="btnEdit" onClick={() => onEdit(note.id)}>🖊️</button>
//                 <button className="btnDelete" onClick={() => onDelete(note.id)}>❌</button>
//             </div>
//         </div>
//     );
// };

// export default Note;

import React from 'react';

const Note = ({ note, onEdit, onDelete, onToggleComplete }) => {
    return (
        <li className={`note ${note.completed ? 'completed' : ''}`}>
            <div className="noteInfo">
                <div className="noteId">Task: {note.id}</div>
                <div className="noteTitle">Title: {note.title}</div>
                <div className="noteContent">{note.content}</div>
            </div>
            <div className="noteButtons">
                <input type="checkbox" className="checkBtn" checked={note.completed} onChange={() => onToggleComplete(note.id)} />
                <button className="btnEdit" onClick={() => onEdit(note.id)}>🖊️</button>
                <button className="btnDelete" onClick={() => onDelete(note.id)}>❌</button>
            </div>
        </li>
    );
};

export default Note;

