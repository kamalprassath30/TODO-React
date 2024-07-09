import React, { useState } from 'react';

const AddNoteModal = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSave = () => {
        onSave(title, content);
        setTitle('');
        setContent('');
    };

    return (
        <div className="modal show">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <input type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Enter content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <button onClick={handleSave}>Add Task</button>
            </div>
        </div>
    );
};

export default AddNoteModal;