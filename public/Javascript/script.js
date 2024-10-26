document.addEventListener('DOMContentLoaded', loadNotes);
const addNoteBtn = document.getElementById('addNoteBtn');
const editNoteBtn = document.getElementById('editNoteBtn');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
let editNoteId = null;

addNoteBtn.addEventListener('click', addNote);
editNoteBtn.addEventListener('click', updateNote);

async function loadNotes() {
  const response = await fetch('/api/notes');
  const notes = await response.json();
  displayNotes(notes);
}

function displayNotes(notes) {
  const notesContainer = document.getElementById('notesContainer');
  notesContainer.innerHTML = '';
  notes.forEach(note => {
    const noteItem = document.createElement('li');
    noteItem.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="buttons-container">
        <button class="edit-btn" onclick="editNote('${note._id}', '${note.title}', '${note.content}')">Edit</button>
        <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
      </div>
    `;
    notesContainer.appendChild(noteItem);
  });
}

async function addNote() {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (!title || !content) return;

  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  noteTitle.value = '';
  noteContent.value = '';
  loadNotes();
}

function editNote(id, title, content) {
  editNoteId = id;
  noteTitle.value = title;
  noteContent.value = content;
  addNoteBtn.style.display = 'none';
  editNoteBtn.style.display = 'inline-block';
}

async function updateNote() {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (!title || !content) return;

  await fetch(`/api/notes/${editNoteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  editNoteId = null;
  noteTitle.value = '';
  noteContent.value = '';
  addNoteBtn.style.display = 'inline-block';
  editNoteBtn.style.display = 'none';
  loadNotes();
}

async function deleteNote(id) {
  await fetch(`/api/notes/${id}`, { method: 'DELETE' });
  loadNotes();
}
