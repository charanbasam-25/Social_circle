import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// API calls using `fetch`
const API_URL = "http://localhost:5000/api/note/";

const fetchNotes = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error fetching notes");
  return response.json();
};

const addNote = async (newNote) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
  if (!response.ok) throw new Error("Error adding note");
  return response.json();
};

const updateNote = async (id, updatedNote) => {
  const response = await fetch(`${API_URL}${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });
  if (!response.ok) throw new Error("Error updating note");
  return response.json();
};

const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting note");
  return id; 
};

const NotePad = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState(""); 
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null); 


  const { data: notes, isLoading, error } = useQuery(["notes"], fetchNotes);

  const queryClient = useQueryClient();

  const createNoteMutation = useMutation(addNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]); 
    },
  });

  const updateNoteMutation = useMutation((id, updatedNote) => updateNote(id, updatedNote), {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]); 
    },
  });

  const deleteNoteMutation = useMutation(deleteNote, {
    onSuccess: (id) => {
      queryClient.invalidateQueries(["notes"]); 
    },
  });


  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };


  const handleCreateNote = () => {
    createNoteMutation.mutate({ content: note });
    setNote("");
  };

  
  const handleUpdateNote = () => {
    updateNoteMutation.mutate(selectedNoteId, { content: note });
    setIsEditing(false); 
    setNote(""); 
  };


  const handleDeleteNote = (id) => {
    deleteNoteMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching notes: {error.message}</div>;

  return (
    <>
 
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-50"
      >
        {isOpen ? "Close Note" : "Open Note"}
      </button>


      {isOpen && (
        <div className="fixed bottom-16 right-4 w-64 h-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Note</p>
            <div>

              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdateNote}
                    className="bg-blue-500 text-white px-2 py-1 rounded-sm mr-2"
                    disabled={!note}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCreateNote}
                  className="bg-green-500 text-white px-2 py-1 rounded-sm mr-2"
                >
                  Create
                </button>
              )}
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-2 py-1 rounded-sm mr-2"
              >
                Cancel
              </button>
              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNote("");
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>


          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Write your note here..."
            className="w-full h-full border-0 p-2 resize-none outline-none mt-2"
            disabled={!isEditing} 
          />
        </div>
      )}


      <div className="notes-list mt-6">
        {notes.map((note) => (
          <div key={note._id} className="note-item bg-gray-200 p-4 mb-2 rounded-md">
            <p>{note.content}</p>
            <button
              onClick={() => {
                setIsEditing(true);
                setNote(note.content);
                setSelectedNoteId(note._id);
              }}
              className="bg-blue-500 text-white px-2 py-1 rounded-sm mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteNote(note._id)}
              className="bg-red-500 text-white px-2 py-1 rounded-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotePad;
