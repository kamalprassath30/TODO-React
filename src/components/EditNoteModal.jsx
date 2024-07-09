import React, { useState, useEffect } from 'react';

const EditNoteModal = ({ note, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    const handleSave = () => {
        onSave(note.id, title, content);
        setTitle('');
        setContent('');
    };

    return (
        <div className="modal show">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default EditNoteModal;
