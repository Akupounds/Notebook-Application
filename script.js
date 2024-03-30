
function NotebookApp() {
  const [notes, setNotes] = useState([
    { id: 1, content: "Sample note 1", font: "Arial", image: null },
    { id: 2, content: "Sample note 2", font: "Times New Roman", image: null }
  ]);
  const [newNote, setNewNote] = useState("");
  const [selectedFont, setSelectedFont] = useState("Arial");

  const handleChangeFont = (noteId, newFont) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId ? { ...note, font: newFont } : note
      )
    );
  };

  const handleAddImage = (noteId, imageFile) => {
    const imageUrl = URL.createObjectURL(imageFile);
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId ? { ...note, image: imageUrl } : note
      )
    );
  };

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      setNotes(prevNotes => [
        ...prevNotes,
        { id: Date.now(), content: newNote, font: selectedFont, image: null }
      ]);
      setNewNote("");
    }
  };

  const handleDeleteNote = (noteId) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  };

  return (
    <div>
      <h1>Notebook</h1>
      <div>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your note..."
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <div>
        <select value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
        </select>
        <span>Selected Font: {selectedFont}</span>
      </div>
      <div>
        {notes.map(note => (
          <div key={note.id}>
            <div style={{ fontFamily: note.font }}>
              {note.content}
            </div>
            {note.image && <img src={note.image} alt="Note" />}
            <button onClick={() => handleChangeFont(note.id, "Arial")}>Change Font to Arial</button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
            <input type="file" accept="image/*" onChange={(e) => handleAddImage(note.id, e.target.files[0])} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotebookApp;
ReactDOM.render(<NotebookApp />, document.getElementById('root'));
