class Note {
    constructor(id, title, content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}

let notes = [];
let currentEditId = null;
const form = document.getElementById('note');
const inputTitle = document.getElementById('note-title');
const inputContent = document.getElementById('content');
const noteList = document.getElementById('notes-list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addNotes(inputTitle.value, inputContent.value);
    inputTitle.value = '';
    inputContent.value = '';
});



function addNotes(title, content) {
    if (title.trim() === '' || content.trim() === '') {
        alert("Title and Content cannot be empty!");
        return;
    }

    if (currentEditId !== null) {
        
        notes = notes.map(note => 
            note.id === currentEditId ? { ...note, title, content } : note
        );
        currentEditId = null; 
    } else {
        
        const createNote = new Note(Date.now(), title, content);
        notes.push(createNote);
    }

    updateNote();
}

function updateNote() {
    noteList.innerHTML = '';

    notes.forEach(note => {
        const li = document.createElement('li');
        li.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;

        const createbutton = document.createElement('div');
        createbutton.className = "buttons";

        const editbutton = document.createElement('button');
        editbutton.textContent = 'Edit';
        editbutton.addEventListener('click', () => editNote(note.id));

        const deletebutton = document.createElement('button');
        deletebutton.textContent = 'Delete';
        deletebutton.addEventListener('click', () => deleteNote(note.id));

        createbutton.appendChild(editbutton);
        createbutton.appendChild(deletebutton);
        li.appendChild(createbutton);
        noteList.appendChild(li);
    });
}

function editNote(id) {
    const editNotes = notes.find(note => note.id === id);
    if (editNotes) {
        inputTitle.value = editNotes.title;
        inputContent.value = editNotes.content;
        currentEditId = id;
    }
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    updateNote();
}
